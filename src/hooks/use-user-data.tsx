"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { type SetupFormData, type Transaction, type Goal, RecurringExpense } from '@/lib/setup-schema';
import { subMonths, getYear, getMonth } from 'date-fns';
import { useToast } from './use-toast';


interface UserDataContextType {
  userData: SetupFormData | null;
  loading: boolean;
  formatCurrency: (amount: number) => string;
  updateUserData: (data: Partial<SetupFormData>) => void;
  resetUserData: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goalId: string) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<SetupFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const parseStoredData = (storedData: string | null): SetupFormData | null => {
    if (!storedData) return null;
    try {
      const parsed = JSON.parse(storedData);
       // Dates are stored as strings, so we need to convert them back
      if (parsed.goals) {
        parsed.goals.forEach((g: any) => {
          if (g.targetDate) g.targetDate = new Date(g.targetDate);
        });
      }
      if (parsed.transactions) {
        parsed.transactions.forEach((t: any) => {
          if(t.date) t.date = new Date(t.date);
        });
      }
      return parsed;
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      return null;
    }
  }

  const saveData = useCallback((data: SetupFormData | null) => {
    if (data) {
        localStorage.setItem('pocketplan-userdata', JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem('pocketplan-userdata');
        setUserData(parseStoredData(storedData));
      } catch (error) {
        console.error("Failed to read user data from localStorage", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const formatCurrency = useCallback((amount: number) => {
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userData?.currency || 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(absAmount);
    return amount < 0 ? `-${formatted}` : formatted;
  }, [userData?.currency]);

  // Auto-transfer remaining balance at the end of the month
  useEffect(() => {
    if (loading || !userData) return;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastCheckKey = 'pocketplan-last-auto-transfer-check';
    const lastCheck = localStorage.getItem(lastCheckKey);
    const lastCheckMonth = lastCheck ? parseInt(lastCheck.split('-')[1], 10) : -1;
    const lastCheckYear = lastCheck ? parseInt(lastCheck.split('-')[0], 10) : -1;
    
    // Only run if we are in a new month
    if (currentYear > lastCheckYear || (currentYear === lastCheckYear && currentMonth > lastCheckMonth)) {
      const prevMonthDate = subMonths(now, 1);
      const prevMonth = getMonth(prevMonthDate);
      const prevMonthYear = getYear(prevMonthDate);
      
      const getMonthlyAmount = (expense: RecurringExpense): number => {
        const amount = Number(expense.amount) || 0;
        switch (expense.frequency) {
          case 'Yearly': return amount / 12;
          case 'Quarterly': return amount / 3;
          default: return amount;
        }
      };

      const monthlyIncome = userData.monthlyIncome || 0;
      const oneOffIncome = userData.transactions?.filter(t => {
          const tDate = new Date(t.date);
          return t.type === 'income' && getMonth(tDate) === prevMonth && getYear(tDate) === prevMonthYear;
        }).reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;

      const oneOffSpending = userData.transactions?.filter(t => {
          const tDate = new Date(t.date);
          return t.type === 'expense' && getMonth(tDate) === prevMonth && getYear(tDate) === prevMonthYear;
        }).reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;

      const recurringSpending = userData.recurringExpenses.reduce((sum, exp) => sum + getMonthlyAmount(exp), 0);

      const remainingBalance = (monthlyIncome + oneOffIncome) - (recurringSpending + oneOffSpending);

      const primaryGoal = userData.goals && userData.goals.length > 0 ? userData.goals[0] : null;

      if (remainingBalance > 0 && primaryGoal) {
        setUserData(currentData => {
            if (!currentData) return null;

            const newGoalAmount = (primaryGoal.currentAmount || 0) + remainingBalance;
            const updatedGoal = { ...primaryGoal, currentAmount: newGoalAmount };
            const updatedGoals = currentData.goals.map(g => g.id === primaryGoal.id ? updatedGoal : g);
            
            const transferTransaction: Transaction = {
                id: new Date().toISOString() + Math.random(),
                date: new Date(),
                name: 'Automatic Savings Transfer',
                amount: -remainingBalance,
                type: 'expense',
                category: 'Savings',
            };
            
            const updatedTransactions = [transferTransaction, ...(currentData.transactions || [])];

            const updatedData = { ...currentData, goals: updatedGoals, transactions: updatedTransactions };
            
            saveData(updatedData);
            
            toast({
                title: "Automatic Savings Transfer!",
                description: `${formatCurrency(remainingBalance)} was moved to your "${primaryGoal.name}" goal.`,
            });
            
            return updatedData;
        });
      }
      
      localStorage.setItem(lastCheckKey, `${currentYear}-${currentMonth}`);
    }
  }, [loading, userData, saveData, formatCurrency, toast]);
  
  const updateUserData = useCallback((data: Partial<SetupFormData>) => {
    const updatedData = { ...userData, ...data } as SetupFormData;
    setUserData(updatedData);
    saveData(updatedData);
  }, [userData, saveData]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    setUserData(prevData => {
      if (!prevData) return null;
      const newTransaction: Transaction = {
        ...transaction,
        id: new Date().toISOString() + Math.random(),
        date: new Date(),
      };
      const updatedData = {
        ...prevData,
        transactions: [newTransaction, ...(prevData.transactions || [])],
      };
      saveData(updatedData);
      return updatedData;
    });
  }, [saveData]);
  
  const resetUserData = useCallback(() => {
    localStorage.removeItem('pocketplan-userdata');
    localStorage.removeItem('pocketplan-last-auto-transfer-check');
    setUserData(null);
    if(typeof window !== 'undefined') {
      window.location.href = '/setup';
    }
  }, []);

  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'currentAmount'>) => {
    setUserData(prevData => {
      if (!prevData) return null;
      const newGoal: Goal = {
        ...goal,
        id: new Date().toISOString(),
        currentAmount: 0,
      };
      const updatedData = {
        ...prevData,
        goals: [...(prevData.goals || []), newGoal],
      };
      saveData(updatedData);
      return updatedData;
    });
  }, [saveData]);

  const updateGoal = useCallback((goal: Goal) => {
    setUserData(prevData => {
        if (!prevData) return null;
        const updatedGoals = prevData.goals.map(g => g.id === goal.id ? goal : g);
        const updatedData = { ...prevData, goals: updatedGoals };
        saveData(updatedData);
        return updatedData;
    });
  }, [saveData]);

  const deleteGoal = useCallback((goalId: string) => {
    setUserData(prevData => {
        if (!prevData) return null;
        const updatedGoals = prevData.goals.filter(g => g.id !== goalId);
        const updatedData = { ...prevData, goals: updatedGoals };
        saveData(updatedData);
        return updatedData;
    });
  }, [saveData]);

  return (
    <UserDataContext.Provider value={{ userData, loading, formatCurrency, updateUserData, resetUserData, addTransaction, addGoal, updateGoal, deleteGoal }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}

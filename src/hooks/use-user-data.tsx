"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { type SetupFormData, type Transaction, type Goal } from '@/lib/setup-schema';

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
  
  const updateUserData = useCallback((data: Partial<SetupFormData>) => {
    const updatedData = { ...userData, ...data } as SetupFormData;
    setUserData(updatedData);
    localStorage.setItem('pocketplan-userdata', JSON.stringify(updatedData));
  }, [userData]);

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
      localStorage.setItem('pocketplan-userdata', JSON.stringify(updatedData));
      return updatedData;
    });
  }, []);
  
  const resetUserData = useCallback(() => {
    localStorage.removeItem('pocketplan-userdata');
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
      localStorage.setItem('pocketplan-userdata', JSON.stringify(updatedData));
      return updatedData;
    });
  }, []);

  const updateGoal = useCallback((goal: Goal) => {
    setUserData(prevData => {
        if (!prevData) return null;
        const updatedGoals = prevData.goals.map(g => g.id === goal.id ? goal : g);
        const updatedData = { ...prevData, goals: updatedGoals };
        localStorage.setItem('pocketplan-userdata', JSON.stringify(updatedData));
        return updatedData;
    });
  }, []);

  const deleteGoal = useCallback((goalId: string) => {
    setUserData(prevData => {
        if (!prevData) return null;
        const updatedGoals = prevData.goals.filter(g => g.id !== goalId);
        const updatedData = { ...prevData, goals: updatedGoals };
        localStorage.setItem('pocketplan-userdata', JSON.stringify(updatedData));
        return updatedData;
    });
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

"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { type SetupFormData } from '@/lib/setup-schema';

interface UserDataContextType {
  userData: SetupFormData | null;
  loading: boolean;
  formatCurrency: (amount: number) => string;
  updateUserData: (data: Partial<SetupFormData>) => void;
  resetUserData: () => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<SetupFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem('pocketplan-userdata');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          // Dates are stored as strings, so we need to convert them back
          if (parsedData.goalTargetDate) {
            parsedData.goalTargetDate = new Date(parsedData.goalTargetDate);
          }
          setUserData(parsedData);
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
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
  
  const resetUserData = useCallback(() => {
    localStorage.removeItem('pocketplan-userdata');
    setUserData(null);
    // Optionally redirect to setup page
    if(typeof window !== 'undefined') {
      window.location.href = '/setup';
    }
  }, []);

  const formatCurrency = useCallback((amount: number) => {
    if (!userData?.currency) {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: userData.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  }, [userData?.currency]);

  return (
    <UserDataContext.Provider value={{ userData, loading, formatCurrency, updateUserData, resetUserData }}>
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

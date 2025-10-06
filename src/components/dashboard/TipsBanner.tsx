"use client";

import { Button } from '@/components/ui/button';
import { useUserData } from '@/hooks/use-user-data';
import { RecurringExpense } from '@/lib/setup-schema';
import { useMemo } from 'react';

export function TipsBanner() {
  const { userData, loading, formatCurrency } = useUserData();

  const getMonthlyAmount = (expense: RecurringExpense): number => {
    const amount = Number(expense.amount) || 0;
    switch (expense.frequency) {
      case 'Yearly':
        return amount / 12;
      case 'Quarterly':
        return amount / 3;
      case 'Monthly':
      default:
        return amount;
    }
  };

  const { tip, cta } = useMemo(() => {
    if (loading || !userData) {
      return { tip: "Analyzing your finances for smart tips...", cta: "View Budget" };
    }

    const totalMonthlyRecurring = userData.recurringExpenses.reduce((sum, exp) => sum + getMonthlyAmount(exp), 0);
    const availableBalance = (userData.monthlyIncome || 0) - totalMonthlyRecurring;
    
    if (availableBalance < 0) {
      return { 
        tip: `Your recurring expenses are higher than your income by ${formatCurrency(Math.abs(availableBalance))}.`,
        cta: "Review Expenses"
      };
    }
    
    if (userData.goal && userData.goalTargetAmount) {
       const suggestedSaving = Math.max(0, availableBalance * 0.2); // Suggest saving 20%
       if (suggestedSaving > 0) {
        return {
          tip: `You have ${formatCurrency(availableBalance)} left this month. Try saving ${formatCurrency(suggestedSaving)} for your "${userData.goal}" goal.`,
          cta: "Adjust Savings"
        }
       }
    }

    return {
      tip: "You’ve spent 60% of your budget this month. Plan early to stay under your limit!",
      cta: "View Budget"
    };

  }, [userData, loading, formatCurrency]);

  return (
    <div className="rounded-lg bg-gradient-to-r from-primary/80 to-primary/60 p-4 text-primary-foreground">
      <h3 className="font-bold">💡 Smart Tip</h3>
      <p className="text-sm">
        {tip}
      </p>
      <Button variant="link" className="p-0 text-primary-foreground">
        {cta}
      </Button>
    </div>
  );
}

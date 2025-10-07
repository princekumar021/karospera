"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';
import { RecurringExpense } from '@/lib/setup-schema';

export function BudgetSummary() {
  const { userData, loading, formatCurrency } = useUserData();

  const { income, remaining, progress, spent } = useMemo(() => {
    if (!userData || loading) {
      return { income: 0, remaining: 0, progress: 0, spent: 0 };
    }
    const income = userData.monthlyIncome || 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const getMonthlyAmount = (expense: RecurringExpense): number => {
        const amount = Number(expense.amount) || 0;
        switch (expense.frequency) {
        case 'Yearly': return amount / 12;
        case 'Quarterly': return amount / 3;
        default: return amount;
        }
    };
    
    // In this simplified model, we'll consider monthly recurring expenses as "spent"
    const recurringSpending = userData.recurringExpenses.reduce((sum, exp) => sum + getMonthlyAmount(exp), 0);

    // Calculate total spending from one-off expense transactions for the current month
    const oneOffSpending = userData.transactions
      ?.filter(t => {
        const tDate = new Date(t.date);
        return t.type === 'expense' && tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;

    const spent = oneOffSpending + recurringSpending;
    const remaining = income - spent;
    const progress = income > 0 ? (spent / income) * 100 : 0;
    
    return { income, remaining, progress, spent };
  }, [userData, loading]);

  if (loading) {
    return (
        <Card className="bg-card">
            <CardContent className="pt-6">
                 <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="bg-card">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-center mb-4">
          <div className="flex-1 min-w-[100px]">
            <p className="text-sm text-green-500 truncate">Income</p>
            <p className="font-bold text-lg truncate">{formatCurrency(income)}</p>
          </div>
          <div className="flex-1 min-w-[100px]">
            <p className="text-sm text-red-500 truncate">Spent</p>
            <p className="font-bold text-lg truncate">{formatCurrency(spent)}</p>
          </div>
          <div className="flex-1 min-w-[100px]">
            <p className="text-sm text-blue-500 truncate">Remaining</p>
            <p className="font-bold text-lg truncate">{formatCurrency(remaining)}</p>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2 truncate">
            You've spent {formatCurrency(spent)} of {formatCurrency(income)}
        </p>
      </CardContent>
    </Card>
  );
}

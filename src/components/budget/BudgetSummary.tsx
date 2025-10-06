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

    // Calculate total spending from one-off expense transactions for the current month
    const oneOffSpending = userData.transactions
      ?.filter(t => {
        const tDate = new Date(t.date);
        return t.type === 'expense' && tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;

    // In this simplified model, we'll consider monthly recurring expenses as "spent"
    const getMonthlyAmount = (expense: RecurringExpense): number => {
        const amount = Number(expense.amount) || 0;
        switch (expense.frequency) {
        case 'Yearly': return amount / 12;
        case 'Quarterly': return amount / 3;
        default: return amount;
        }
    };
    const recurringSpending = userData.recurringExpenses.reduce((sum, exp) => sum + getMonthlyAmount(exp), 0);

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
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div>
            <p className="text-sm text-green-500">Income</p>
            <p className="font-bold">{formatCurrency(income)}</p>
          </div>
          <div>
            <p className="text-sm text-red-500">Spent</p>
            <p className="font-bold">{formatCurrency(spent)}</p>
          </div>
          <div>
            <p className="text-sm text-blue-500">Remaining</p>
            <p className="font-bold">{formatCurrency(remaining)}</p>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
            You've spent {formatCurrency(spent)} of {formatCurrency(income)}
        </p>
      </CardContent>
    </Card>
  );
}

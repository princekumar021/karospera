
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';
import { RecurringExpense, Goal } from '@/lib/setup-schema';

export function OverviewCard() {
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
  
  const { availableBalance, goalProgress, goalName } = useMemo(() => {
    if (!userData || loading) {
      return { availableBalance: 0, goalProgress: 0, goalName: 'your goal' };
    }

    const income = userData.monthlyIncome || 0;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const oneOffSpending = userData.transactions
      ?.filter(t => {
        const tDate = new Date(t.date);
        return t.type === 'expense' && tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;
    
    const oneOffIncome = userData.transactions
      ?.filter(t => {
          const tDate = new Date(t.date);
          return t.type === 'income' && tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;


    const totalMonthlyRecurring = userData.recurringExpenses.reduce((sum, exp) => sum + getMonthlyAmount(exp), 0);
    const availableBalance = (income + oneOffIncome) - (totalMonthlyRecurring + oneOffSpending);

    let goalProgress = 0;
    let primaryGoal: Goal | null = userData.goals && userData.goals.length > 0 ? userData.goals[0] : null;

    if (primaryGoal && primaryGoal.targetAmount > 0) {
      goalProgress = (primaryGoal.currentAmount / primaryGoal.targetAmount) * 100;
    }
    
    return {
      availableBalance,
      goalProgress,
      goalName: primaryGoal?.name || 'your goal',
    };
  }, [userData, loading]);


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Available Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <>
              <Skeleton className="h-8 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2" />
            </>
          ) : (
            <>
              <p className="text-2xl font-bold">{formatCurrency(availableBalance)}</p>
              <p className="text-xs text-muted-foreground">Per month after bills</p>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
             <>
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </>
          ) : (
            <>
              <Progress value={goalProgress} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground truncate">
                Saving for {goalName}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```
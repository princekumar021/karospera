"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';
import { RecurringExpense, Goal, Transaction } from '@/lib/setup-schema';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { PiggyBank } from 'lucide-react';

export function OverviewCard() {
  const { userData, loading, formatCurrency, updateGoal, addTransaction } = useUserData();
  const { toast } = useToast();
  
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
  
  const { availableBalance, goalProgress, goalName, primaryGoal } = useMemo(() => {
    if (!userData || loading) {
      return { availableBalance: 0, goalProgress: 0, goalName: 'your goal', primaryGoal: null };
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
      primaryGoal
    };
  }, [userData, loading]);

  const handleMoveToSavings = () => {
    if (!primaryGoal || availableBalance <= 0) {
      toast({
        variant: "destructive",
        title: "Unable to move funds",
        description: availableBalance <= 0 ? "No available balance to move." : "No primary savings goal set."
      });
      return;
    };

    const newCurrentAmount = primaryGoal.currentAmount + availableBalance;
    updateGoal({ ...primaryGoal, currentAmount: newCurrentAmount });

    addTransaction({
      name: `Contribution to ${primaryGoal.name}`,
      amount: -availableBalance,
      type: 'expense',
      category: 'Savings'
    });
    
    addTransaction({
      name: `Balance transfer from Checking`,
      amount: availableBalance,
      type: 'income',
      category: 'Savings'
    });


    toast({
      title: "Balance moved to savings!",
      description: `${formatCurrency(availableBalance)} has been added to your "${primaryGoal.name}" goal.`,
    });
  }


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
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">Per month after bills</p>
                <Button variant="ghost" size="sm" onClick={handleMoveToSavings} disabled={availableBalance <= 0}>
                    <PiggyBank className="h-4 w-4 mr-2" /> Move to Savings
                </Button>
              </div>
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

"use client";

import { Button } from '@/components/ui/button';
import { useUserData } from '@/hooks/use-user-data';
import { RecurringExpense } from '@/lib/setup-schema';
import { useMemo, useState, useEffect } from 'react';
import { getPersonalizedTips } from '@/ai/flows/personalized-financial-tips';
import { Skeleton } from '../ui/skeleton';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';

export function TipsBanner() {
  const { userData, loading, formatCurrency } = useUserData();
  const [tip, setTip] = useState<string>('');
  const [tipLoading, setTipLoading] = useState(true);

  const spendingHabitsSummary = useMemo(() => {
    if (!userData || !userData.transactions || userData.transactions.length === 0) {
      return "No transactions recorded yet.";
    }
    const expenseTransactions = userData.transactions.filter(t => t.type === 'expense');
    const totalSpent = expenseTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const categorySpending = expenseTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];

    return `User has spent a total of ${formatCurrency(totalSpent)}. The highest spending is in the '${topCategory?.[0] || 'N/A'}' category.`;

  }, [userData, formatCurrency]);
  
  const goalsSummary = useMemo(() => {
    if (!userData || !userData.goals || userData.goals.length === 0) {
      return "General savings";
    }
    return userData.goals.map(g => `${g.name} (${formatCurrency(g.targetAmount)})`).join(', ');
  }, [userData, formatCurrency]);

  useEffect(() => {
    if (!loading && userData) {
      setTipLoading(true);
      getPersonalizedTips({
        spendingHabits: spendingHabitsSummary,
        financialGoals: goalsSummary,
        monthlyIncome: userData.monthlyIncome || 0,
      }).then(response => {
        if (response.tips && response.tips.length > 0) {
          setTip(response.tips[0]);
        } else {
          setTip("Keep tracking your expenses to get personalized tips!");
        }
        setTipLoading(false);
      }).catch(() => {
        setTip("Could not load a tip right now. Please try again later.");
        setTipLoading(false);
      });
    }
  }, [userData, loading, spendingHabitsSummary, goalsSummary]);

  return (
    <div className="rounded-lg bg-card border p-4 text-foreground flex items-start gap-4">
      <div className="bg-accent/20 text-accent p-2 rounded-full mt-1">
        <Lightbulb className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-base text-accent">Smart Tip</h3>
        {tipLoading ? (
            <Skeleton className="h-8 w-full mt-1" />
        ) : (
            <p className="text-sm mt-1 text-muted-foreground">{tip}</p>
        )}
        <Button variant="link" asChild className="p-0 text-accent h-auto mt-2 text-sm">
            <Link href="/reports">Get more insights</Link>
        </Button>
      </div>
    </div>
  );
}
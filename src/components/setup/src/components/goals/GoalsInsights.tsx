"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';

export function GoalsInsights() {
  const { userData, loading, formatCurrency } = useUserData();

  const { totalSaved, totalTarget, totalProgress, estimatedCompletion } = useMemo(() => {
    if (!userData || !userData.goals || userData.goals.length === 0) {
        return { totalSaved: 0, totalTarget: 0, totalProgress: 0, estimatedCompletion: 'N/A' };
    }

    const totalSaved = userData.goals.reduce((acc, goal) => acc + goal.currentAmount, 0);
    const totalTarget = userData.goals.reduce((acc, goal) => acc + goal.targetAmount, 0);
    const totalProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

    const monthlyIncome = userData.monthlyIncome || 0;
    const totalExpenses = userData.recurringExpenses.reduce((acc, exp) => {
        const amount = Number(exp.amount) || 0;
        let monthlyAmount = amount;
        if (exp.frequency === 'Yearly') monthlyAmount = amount / 12;
        if (exp.frequency === 'Quarterly') monthlyAmount = amount / 3;
        return acc + monthlyAmount;
    }, 0);
    const availableForSaving = monthlyIncome - totalExpenses;
    
    // Assuming user saves 10% of their available balance towards goals.
    const monthlySavingRate = availableForSaving > 0 ? availableForSaving * 0.1 : 500; // fallback saving rate
    
    if (monthlySavingRate <= 0 || totalTarget <= totalSaved) {
         return { totalSaved, totalTarget, totalProgress, estimatedCompletion: 'Soon!' };
    }

    const remainingToSave = totalTarget - totalSaved;
    const monthsRemaining = remainingToSave / monthlySavingRate;
    const years = Math.floor(monthsRemaining / 12);
    const months = Math.ceil(monthsRemaining % 12);

    let completionString = '';
    if (years > 0) completionString += `${years} year${years > 1 ? 's' : ''} `;
    if (months > 0) completionString += `${months} month${months > 1 ? 's' : ''}`;
    
    return { totalSaved, totalTarget, totalProgress, estimatedCompletion: completionString.trim() || 'Soon!' };

  }, [userData]);
  
  if (loading) {
    return (
        <Card className="bg-card">
            <CardHeader>
                <Skeleton className="h-6 w-3/5" />
            </CardHeader>
            <CardContent className="space-y-3">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-4 w-2/5" />
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Total Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-foreground">{formatCurrency(totalSaved)}</span>
            <span className="text-sm text-muted-foreground"> of {formatCurrency(totalTarget)}</span>
        </div>
        <Progress value={totalProgress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-4">
          At this rate, you could reach all your goals in ~<span className="font-semibold text-foreground">{estimatedCompletion}</span>.
        </p>
      </CardContent>
    </Card>
  );
}

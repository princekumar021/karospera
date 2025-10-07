"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { Goal } from '@/lib/setup-schema';

export function GoalsSection() {
  const { userData, loading, formatCurrency } = useUserData();

  const goals: Goal[] = userData?.goals || [];
  const primaryGoal = goals.length > 0 ? goals[0] : null;

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Your Goals</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
             <div className="space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          </div>
        ) : (
        <ul className="space-y-4">
          {goals.slice(0, 2).map((goal, index) => {
            if (!goal.name) return null;
            const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
            return (
            <li key={index}>
              <div className="mb-1 flex justify-between">
                <p className="font-semibold truncate">{goal.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(goal.targetAmount)}
                </p>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(goal.currentAmount)} saved
              </p>
            </li>
          )})}
          {goals.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No goals set yet. Go to the Goals page to add one!</p>
          )}
        </ul>
        )}
        <Button variant="link" className="mt-4 w-full" asChild>
          <Link href="/goals">Manage Goals</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

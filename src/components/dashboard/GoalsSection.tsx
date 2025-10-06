"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';

export function GoalsSection() {
  const { userData, loading, formatCurrency } = useUserData();

  const primaryGoal = userData ? {
    name: userData.goal,
    // Dummy progress: assume 10% of target saved for primary goal.
    current: (userData.goalTargetAmount || 0) * 0.1,
    target: userData.goalTargetAmount || 0,
  } : null;
  
  // Placeholder for other goals
  const otherGoals = [
    {
      name: 'Emergency Fund',
      current: 25000,
      target: 50000,
    },
  ];

  const goals = primaryGoal ? [primaryGoal, ...otherGoals.filter(g => g.name !== primaryGoal.name)] : otherGoals;


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
            const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
            return (
            <li key={index}>
              <div className="mb-1 flex justify-between">
                <p className="font-semibold truncate">{goal.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(goal.target)}
                </p>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(goal.current)} saved
              </p>
            </li>
          )})}
        </ul>
        )}
        <Button variant="link" className="mt-4 w-full">
          Add New Goal
        </Button>
      </CardContent>
    </Card>
  );
}

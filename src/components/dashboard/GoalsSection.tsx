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
    progress: 25, // Dummy progress
    target: userData.goalTargetAmount || 0,
  } : null;
  
  // Placeholder for other goals
  const otherGoals = [
    {
      name: 'Emergency Fund',
      progress: 50,
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
            </div>
             <div className="space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
        ) : (
        <ul className="space-y-4">
          {goals.slice(0, 2).map((goal, index) => (
            <li key={index}>
              <div className="mb-1 flex justify-between">
                <p className="font-semibold truncate">{goal.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(goal.target)}
                </p>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </li>
          ))}
        </ul>
        )}
        <Button variant="link" className="mt-4 w-full">
          Add New Goal
        </Button>
      </CardContent>
    </Card>
  );
}

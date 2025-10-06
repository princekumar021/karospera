"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';

export function ActiveGoals() {
  const { userData, loading, formatCurrency } = useUserData();

  const primaryGoal = userData ? {
    name: userData.goal,
    current: (userData.goalTargetAmount || 0) * 0.1, // Dummy progress
    target: userData.goalTargetAmount || 0,
  } : null;
  
  // Placeholder for other goals to show more than one
  const otherGoals = [
    {
      name: 'Emergency Fund',
      current: 25000,
      target: 50000,
    },
    {
      name: 'Dream Vacation',
      current: 15000,
      target: 100000,
    },
  ];

  const goals = primaryGoal && primaryGoal.name ? [primaryGoal, ...otherGoals.filter(g => g.name !== primaryGoal.name)] : otherGoals;

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="bg-card">
                 <CardHeader>
                    <Skeleton className="h-6 w-3/5" />
                    <Skeleton className="h-4 w-2/5" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                </CardContent>
            </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {goals.map((goal, index) => {
        if (!goal.name) return null;
        const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
        return (
          <Card key={index} className="bg-card">
            <CardHeader>
              <CardTitle className="font-headline truncate">{goal.name}</CardTitle>
              <CardDescription>Target: {formatCurrency(goal.target)}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(goal.current)} Saved</span>
                 <span>{Math.round(progress)}% {progress > 80 && '💪'}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';

export function GoalsInsights() {
  const { userData, loading, formatCurrency } = useUserData();

  // Dummy data for now
  const totalSaved = 40000;
  const totalTarget = 150000;
  const totalProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
  const estimatedCompletion = "2 years";

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

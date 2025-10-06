"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';

export function SmartInsights() {
    const { loading } = useUserData();

    const insights = [
        { icon: <TrendingUp className="h-5 w-5 text-green-500" />, text: "You spent 15% less on food this month. Keep it up!" },
        { icon: <TrendingDown className="h-5 w-5 text-red-500" />, text: "Your transport costs were higher than usual in July." },
        { icon: <Lightbulb className="h-5 w-5 text-yellow-500" />, text: "You're on track to reach your Emergency Fund goal by December." },
    ]

    if (loading) {
        return (
            <Card className="bg-card">
                <CardHeader>
                    <Skeleton className="h-6 w-2/5" />
                </CardHeader>
                <CardContent className="space-y-4">
                   <Skeleton className="h-10 w-full" />
                   <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        )
    }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
            {insights.map((insight, index) => (
                 <li key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary">
                    {insight.icon}
                    <p className="text-sm text-foreground">{insight.text}</p>
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}

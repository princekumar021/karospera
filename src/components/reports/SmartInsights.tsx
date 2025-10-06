"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, TrendingUp, TrendingDown, Bot } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { getFinancialInsights } from '@/ai/flows/get-financial-insights';
import { Goal, RecurringExpense, Transaction } from '@/lib/setup-schema';

const iconMap = {
    "up": <TrendingUp className="h-5 w-5 text-green-500" />,
    "down": <TrendingDown className="h-5 w-5 text-red-500" />,
    "idea": <Lightbulb className="h-5 w-5 text-yellow-500" />,
    "default": <Bot className="h-5 w-5 text-primary" />
};

const getInsightIcon = (insight: string): React.ReactNode => {
    const lowerInsight = insight.toLowerCase();
    if (lowerInsight.includes('less') || lowerInsight.includes('great job') || lowerInsight.includes('on track') || lowerInsight.includes('fantastic')) {
        return iconMap.up;
    }
    if (lowerInsight.includes('higher') || lowerInsight.includes('more than')) {
        return iconMap.down;
    }
    if (lowerInsight.includes('consider') || lowerInsight.includes('could you save')) {
        return iconMap.idea;
    }
    return iconMap.default;
};


export function SmartInsights() {
    const { userData, loading } = useUserData();
    const [insights, setInsights] = useState<string[]>([]);
    const [insightsLoading, setInsightsLoading] = useState(true);

    const financialData = useMemo(() => {
        if (!userData) return null;
        return {
            monthlyIncome: userData.monthlyIncome || 0,
            recurringExpenses: (userData.recurringExpenses as RecurringExpense[]) || [],
            goals: (userData.goals as Goal[]) || [],
            transactions: (userData.transactions as Transaction[]) || [],
        };
    }, [userData]);

    useEffect(() => {
        if (loading || !financialData) return;

        setInsightsLoading(true);
        getFinancialInsights(financialData)
            .then(response => {
                if (response.insights && response.insights.length > 0) {
                    setInsights(response.insights);
                } else {
                    setInsights(["No insights available at the moment."]);
                }
            })
            .catch(error => {
                console.error("Error fetching AI insights:", error);
                setInsights(["Could not load insights. Please try again later."]);
            })
            .finally(() => {
                setInsightsLoading(false);
            });

    }, [loading, financialData]);


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
        {insightsLoading ? (
             <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
             </div>
        ) : (
            <ul className="space-y-3">
                {insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-4 p-3 rounded-lg border border-border/50 bg-secondary/30">
                        <div className="flex-shrink-0 mt-1">{getInsightIcon(insight)}</div>
                        <p className="text-sm text-foreground">{insight}</p>
                    </li>
                ))}
            </ul>
        )}
      </CardContent>
    </Card>
  );
}

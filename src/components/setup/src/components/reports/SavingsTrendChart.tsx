"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';
import { subMonths, format, getMonth, getYear } from 'date-fns';

export function SavingsTrendChart() {
    const { userData, loading, formatCurrency } = useUserData();

    const chartData = useMemo(() => {
        if (!userData || !userData.goals.length) return [];
        
        const primaryGoal = userData.goals[0];
        const monthsData = [];
        const now = new Date();
        let cumulativeSavings = primaryGoal.currentAmount;

        // Find the earliest transaction date to establish a starting point for savings history
        const firstTransactionDate = userData.transactions && userData.transactions.length > 0
            ? new Date(Math.min(...userData.transactions.map(t => new Date(t.date).getTime())))
            : now;
        
        let startMonth = subMonths(now, 5);
        if (startMonth < firstTransactionDate) startMonth = firstTransactionDate;


        for (let i = 5; i >= 0; i--) {
            const date = subMonths(now, i);
            const month = getMonth(date);
            const year = getYear(date);

            const savingsThisMonth = userData.transactions?.filter(t => {
                const tDate = new Date(t.date);
                return (t.category === 'Savings' || t.name === 'Automatic Savings Transfer') &&
                       t.type === 'expense' && 
                       getMonth(tDate) === month &&
                       getYear(tDate) === year;
            }).reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0;
            
             monthsData.push({
                name: format(date, 'MMM'),
                savings: savingsThisMonth
             });
        }
        
        // This is a simplified view showing savings made each month, not cumulative.
        return monthsData.filter(d => d.savings > 0);

    }, [userData]);

    if (loading) {
     return (
        <Card className="bg-card">
            <CardHeader>
                <Skeleton className="h-6 w-3/5" />
                 <Skeleton className="h-4 w-2/5" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-48 w-full" />
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Monthly Savings Trend</CardTitle>
        <CardDescription>Savings allocated per month.</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
            <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value as number)}/>
                <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value:number) => [formatCurrency(value), "Savings"]}
                />
                <Legend />
                <Line type="monotone" dataKey="savings" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            </div>
        ) : (
             <div className="flex h-60 items-center justify-center">
                <p className="text-center text-muted-foreground">No savings transactions recorded in the last 6 months.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}

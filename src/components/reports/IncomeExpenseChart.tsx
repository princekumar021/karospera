"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';
import { subMonths, format } from 'date-fns';

export function IncomeExpenseChart() {
  const { userData, loading, formatCurrency } = useUserData();

  const chartData = useMemo(() => {
    if (!userData) return [];

    const totalExpenses = userData.recurringExpenses.reduce((acc, exp) => {
        const amount = Number(exp.amount) || 0;
        let monthlyAmount = amount;
        if (exp.frequency === 'Yearly') monthlyAmount = amount / 12;
        if (exp.frequency === 'Quarterly') monthlyAmount = amount / 3;
        return acc + monthlyAmount;
    }, 0);
    
    // Generate data for the last 3 months
    const data = Array.from({ length: 3 }).map((_, i) => {
        const date = subMonths(new Date(), 2 - i);
        // Using dummy expense data for previous months
        const randomFactor = 1 + (Math.random() - 0.5) * 0.4; // between 0.8 and 1.2
        const expenses = i === 2 ? totalExpenses : totalExpenses * randomFactor;
        
        return {
            name: format(date, 'MMM'),
            income: userData.monthlyIncome,
            expenses: expenses,
        };
    });
    return data;

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
        <CardTitle>Monthly Income vs Expenses</CardTitle>
        <CardDescription>Last 3 months overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value as number)}/>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                formatter={(value:number, name: string) => [formatCurrency(value), name.charAt(0).toUpperCase() + name.slice(1)]} />
              <Legend />
              <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

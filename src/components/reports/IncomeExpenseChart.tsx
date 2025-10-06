
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';
import { subMonths, format, getMonth, getYear } from 'date-fns';

export function IncomeExpenseChart() {
  const { userData, loading, formatCurrency } = useUserData();

  const chartData = useMemo(() => {
    if (!userData || !userData.transactions) return [];

    // Generate data for the last 6 months
    const data = Array.from({ length: 6 }).map((_, i) => {
      const date = subMonths(new Date(), 5 - i);
      const month = getMonth(date);
      const year = getYear(date);
      
      const monthlyExpenses = userData.transactions
        .filter(t => {
          const tDate = new Date(t.date);
          return t.type === 'expense' && getMonth(tDate) === month && getYear(tDate) === year;
        })
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const oneOffIncome = userData.transactions
        .filter(t => {
            const tDate = new Date(t.date);
            return t.type === 'income' && getMonth(tDate) === month && getYear(tDate) === year;
        })
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
      const totalIncome = (userData.monthlyIncome || 0) + oneOffIncome;

      return {
        name: format(date, 'MMM'),
        income: totalIncome,
        expenses: monthlyExpenses,
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
        <CardDescription>Last 6 months overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value as number)} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                formatter={(value:number, name: string) => [formatCurrency(value), name.charAt(0).toUpperCase() + name.slice(1)]}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                cursor={{fill: 'hsl(var(--muted))', opacity: 0.5}}
                 />
              <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }}/>
              <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

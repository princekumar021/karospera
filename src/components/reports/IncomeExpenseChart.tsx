"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';

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
    
    // Dummy data for previous months
    const data = [
        { name: 'May', income: userData.monthlyIncome, expenses: totalExpenses * 0.8 },
        { name: 'June', income: userData.monthlyIncome, expenses: totalExpenses * 1.1 },
        { name: 'July', income: userData.monthlyIncome, expenses: totalExpenses },
    ];
    return data;

  }, [userData]);


  if (loading) {
     return (
        <Card className="bg-card">
            <CardHeader>
                <Skeleton className="h-6 w-3/5" />
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
              <Tooltip formatter={(value:number) => [formatCurrency(value), "Amount"]} />
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

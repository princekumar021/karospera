
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';
import { subMonths, format, getMonth, getYear } from 'date-fns';
import { RecurringExpense, Transaction } from '@/lib/setup-schema';

export function IncomeExpenseChart() {
  const { userData, loading, formatCurrency } = useUserData();

  const chartData = useMemo(() => {
    if (!userData) return [];

    const getMonthlyRecurringAmount = (expense: RecurringExpense): number => {
      const amount = Number(expense.amount) || 0;
      switch (expense.frequency) {
        case 'Yearly': return amount / 12;
        case 'Quarterly': return amount / 3;
        default: return amount;
      }
    };
    const totalMonthlyRecurringExpenses = userData.recurringExpenses.reduce((sum, exp) => sum + getMonthlyRecurringAmount(exp), 0);
    const monthlyBaseIncome = userData.monthlyIncome || 0;

    const monthsData = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = subMonths(now, i);
      const month = getMonth(date);
      const year = getYear(date);
      
      const monthlyTransactions: Transaction[] = userData.transactions?.filter(t => {
        const tDate = new Date(t.date);
        return getMonth(tDate) === month && getYear(tDate) === year;
      }) || [];

      const oneOffExpenses = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const oneOffIncome = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const totalIncome = monthlyBaseIncome + oneOffIncome;
      const totalExpenses = totalMonthlyRecurringExpenses + oneOffExpenses;

      // Only add month to chart if there's any financial activity
      if (totalIncome > 0 || totalExpenses > 0) {
        monthsData.push({
          name: format(date, 'MMM'),
          income: totalIncome,
          expenses: totalExpenses,
        });
      }
    }

    return monthsData;

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
        {chartData.length > 0 ? (
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
        ) : (
          <div className="flex h-60 items-center justify-center">
            <p className="text-center text-muted-foreground">No income or expense data to display for the last 6 months.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

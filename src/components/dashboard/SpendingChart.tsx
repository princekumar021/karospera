'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserData } from '@/hooks/use-user-data';
import { useMemo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { getMonth, getYear } from 'date-fns';

const COLORS = ['#0F6EFF', '#FFC857', '#4CAF50', '#FF5E57', '#8B5CF6', '#FF8042'];

export function SpendingChart() {
  const { userData, loading, formatCurrency } = useUserData();

  const chartData = useMemo(() => {
    if (!userData) {
      return [];
    }

    const now = new Date();
    const currentMonth = getMonth(now);
    const currentYear = getYear(now);

    const spendingByCategory: { [key: string]: number } = {};

    // Process one-off transactions
    userData.transactions?.forEach(t => {
      const transactionDate = new Date(t.date);
      if (
        t.type === 'expense' &&
        t.category !== 'Savings' &&
        getMonth(transactionDate) === currentMonth &&
        getYear(transactionDate) === currentYear
      ) {
        const category = t.category || 'Other';
        const amount = Math.abs(t.amount);
        spendingByCategory[category] = (spendingByCategory[category] || 0) + amount;
      }
    });

    // Process recurring expenses as if they happened this month
    userData.recurringExpenses?.forEach(exp => {
      const getMonthlyAmount = (amount: number, frequency: 'Monthly' | 'Quarterly' | 'Yearly') => {
        switch (frequency) {
          case 'Yearly': return amount / 12;
          case 'Quarterly': return amount / 3;
          default: return amount;
        }
      };
      const monthlyAmount = getMonthlyAmount(Number(exp.amount) || 0, exp.frequency);
      const category = exp.name || 'Other';
      spendingByCategory[category] = (spendingByCategory[category] || 0) + monthlyAmount;
    });


    return Object.entries(spendingByCategory).map(([name, value]) => ({
      name,
      value,
    }));

  }, [userData]);

  if (loading) {
    return (
        <Card className="bg-card">
            <CardHeader>
                <Skeleton className="h-6 w-3/5" />
            </CardHeader>
            <CardContent className="flex justify-center items-center h-48">
                <Skeleton className="h-32 w-32 rounded-full" />
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>This Month’s Spending</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                     contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                     formatter={(value:number, name:string) => [formatCurrency(value), name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Tap a category to see details
            </p>
          </>
        ) : (
            <div className="h-48 flex items-center justify-center">
                <p className="text-center text-muted-foreground">No spending recorded this month.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}

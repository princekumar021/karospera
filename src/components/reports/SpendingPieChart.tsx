"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';

const COLORS = ['#0F6EFF', '#FFC857', '#4CAF50', '#FF5E57', '#8B5CF6', '#FF8042'];

export function SpendingPieChart() {
  const { userData, loading } = useUserData();

  if (loading) {
    return (
        <Card className="bg-card">
            <CardHeader>
                <Skeleton className="h-6 w-3/5" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-40 w-full rounded-full" />
            </CardContent>
        </Card>
    )
  }

  const chartData = userData?.recurringExpenses.map(exp => ({
    name: exp.name,
    value: Number(exp.amount)
  })) || [];

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Expense Distribution</CardTitle>
        <CardDescription>Based on your recurring expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value:number) => [userData?.currency ? new Intl.NumberFormat('en-US', { style: 'currency', currency: userData.currency, minimumFractionDigits: 0 }).format(value) : value, "Amount"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

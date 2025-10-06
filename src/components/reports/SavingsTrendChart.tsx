"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';

const data = [
  { name: 'Jan', savings: 4000 },
  { name: 'Feb', savings: 3000 },
  { name: 'Mar', savings: 5000 },
  { name: 'Apr', savings: 4500 },
  { name: 'May', savings: 6000 },
  { name: 'Jun', savings: 5500 },
];

export function SavingsTrendChart() {
    const { loading, formatCurrency } = useUserData();

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
        <CardTitle>Savings Growth</CardTitle>
        <CardDescription>Your savings trend over the past 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value as number)}/>
              <Tooltip formatter={(value:number) => [formatCurrency(value), "Savings"]}/>
              <Legend />
              <Line type="monotone" dataKey="savings" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

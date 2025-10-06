'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Groceries', value: 400 },
  { name: 'Bills', value: 300 },
  { name: 'Shopping', value: 300 },
  { name: 'Transport', value: 200 },
  { name: 'Food', value: 278 },
];

const COLORS = ['#0F6EFF', '#FFC857', '#4CAF50', '#FF5E57', '#8B5CF6'];

export function SpendingChart() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>This Month’s Spending</CardTitle>
      </CardHeader>
      <CardContent>
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Tap a category to see details
        </p>
      </CardContent>
    </Card>
  );
}

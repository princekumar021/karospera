"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Utensils, Car, Home, Film, PiggyBank } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';

// Dummy data for now
const budgetCategories = [
  { name: 'Food', spent: 3000, limit: 5000, icon: <Utensils className="h-6 w-6 text-yellow-500" /> },
  { name: 'Transport', spent: 1500, limit: 2000, icon: <Car className="h-6 w-6 text-blue-500" /> },
  { name: 'Rent', spent: 15000, limit: 15000, icon: <Home className="h-6 w-6 text-green-500" /> },
  { name: 'Entertainment', spent: 800, limit: 1500, icon: <Film className="h-6 w-6 text-purple-500" /> },
  { name: 'Savings', spent: 5000, limit: 10000, icon: <PiggyBank className="h-6 w-6 text-pink-500" /> },
];

export function CategoryList() {
    const { formatCurrency } = useUserData();
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {budgetCategories.map((category) => {
            const progress = category.limit > 0 ? (category.spent / category.limit) * 100 : 0;
            return (
              <li key={category.name}>
                <div className="flex items-center gap-4 mb-2">
                    {category.icon}
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{category.name}</p>
                            <p className="text-sm text-muted-foreground">
                                <span className={progress > 100 ? 'text-red-500' : 'text-foreground'}>{formatCurrency(category.spent)}</span> / {formatCurrency(category.limit)}
                            </p>
                        </div>
                         <Progress value={Math.min(progress, 100)} className="h-2 mt-1" />
                    </div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

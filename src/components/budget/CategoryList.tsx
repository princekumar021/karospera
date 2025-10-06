"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Utensils, Car, Home, Film, PiggyBank, Briefcase } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { useMemo } from 'react';

const iconMap: { [key: string]: React.ReactNode } = {
  food: <Utensils className="h-6 w-6 text-yellow-500" />,
  transport: <Car className="h-6 w-6 text-blue-500" />,
  rent: <Home className="h-6 w-6 text-green-500" />,
  entertainment: <Film className="h-6 w-6 text-purple-500" />,
  savings: <PiggyBank className="h-6 w-6 text-pink-500" />,
  default: <Briefcase className="h-6 w-6 text-gray-500" />,
};

const getIcon = (name: string) => {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes('food') || lowerCaseName.includes('grocer')) return iconMap.food;
    if (lowerCaseName.includes('transport') || lowerCaseName.includes('gas')) return iconMap.transport;
    if (lowerCaseName.includes('rent') || lowerCaseName.includes('mortgage')) return iconMap.rent;
    if (lowerCaseName.includes('entertain') || lowerCaseName.includes('movie')) return iconMap.entertainment;
    if (lowerCaseName.includes('saving')) return iconMap.savings;
    return iconMap.default;
}

export function CategoryList() {
    const { userData, loading, formatCurrency } = useUserData();

    const budgetCategories = useMemo(() => {
        if (!userData) return [];
        // Map recurring expenses to budget categories.
        // In a real app, spent would be tracked separately. For now, let's use a dummy value.
        return userData.recurringExpenses.map(exp => ({
            name: exp.name,
            spent: (Number(exp.amount) || 0) * 0.4, // Dummy spent value
            limit: Number(exp.amount) || 0,
            icon: getIcon(exp.name),
        }));
    }, [userData]);

  if (loading) {
      return (
          <Card className="bg-card">
              <CardHeader>
                  <Skeleton className="h-6 w-2/5" />
              </CardHeader>
              <CardContent className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-2 w-full" />
                          </div>
                      </div>
                  ))}
              </CardContent>
          </Card>
      )
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        {budgetCategories.length > 0 ? (
            <ul className="space-y-4">
            {budgetCategories.map((category) => {
                const progress = category.limit > 0 ? (category.spent / category.limit) * 100 : 0;
                return (
                <li key={category.name}>
                    <div className="flex items-center gap-4 mb-2">
                        {category.icon}
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold truncate">{category.name}</p>
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
        ) : (
            <p className="text-center text-muted-foreground py-4">No budget categories created yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

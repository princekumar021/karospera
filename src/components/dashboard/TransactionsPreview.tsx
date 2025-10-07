"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Wallet, Utensils, Car, Home, Film, Briefcase } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { format } from 'date-fns';

const categoryIcons: { [key: string]: React.ReactNode } = {
  Income: <Wallet className="h-6 w-6 text-green-500" />,
  Rent: <Home className="h-6 w-6 text-blue-500" />,
  Groceries: <Utensils className="h-6 w-6 text-yellow-500" />,
  Food: <Utensils className="h-6 w-6 text-yellow-500" />,
  Transport: <Car className="h-6 w-6 text-purple-500" />,
  Entertainment: <Film className="h-6 w-6 text-pink-500" />,
  Bills: <Briefcase className="h-6 w-6 text-orange-500" />,
  Savings: <Wallet className="h-6 w-6 text-blue-500" />,
  Other: <Briefcase className="h-6 w-6 text-gray-500" />,
};

const getIcon = (category: string) => {
  return categoryIcons[category] || <Briefcase className="h-6 w-6 text-gray-500" />;
}

export function TransactionsPreview() {
  const { userData, loading, formatCurrency } = useUserData();
  const transactions = userData?.transactions || [];

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
               <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/5" />
                    <Skeleton className="h-3 w-2/5" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
            ))}
          </div>
        ) : transactions.length > 0 ? (
          <ul className="space-y-4">
            {transactions.slice(0, 4).map((transaction) => (
              <li key={transaction.id} className="flex items-center gap-4">
                <div className="rounded-full bg-secondary p-2 flex-shrink-0">
                  {getIcon(transaction.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(transaction.date), 'MMMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p
                    className={`font-bold whitespace-nowrap ${
                      transaction.type === 'income'
                        ? 'text-green-500'
                        : ''
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground py-4">No transactions yet. Add one to get started!</p>
        )}
        <Button variant="link" className="mt-4 w-full">
          View All
        </Button>
      </CardContent>
    </Card>
  );
}

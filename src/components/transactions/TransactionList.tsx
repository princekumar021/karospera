"use client";

import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { format } from 'date-fns';
import { Card, CardContent } from '../ui/card';
import { Wallet, Utensils, Car, Home, Film, Briefcase } from 'lucide-react';
import { Fragment } from 'react';
import { Separator } from '../ui/separator';

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

export function TransactionList() {
  const { userData, loading, formatCurrency } = useUserData();
  const transactions = userData?.transactions || [];

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = format(new Date(transaction.date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, typeof transactions>);

  if (loading) {
    return (
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
    );
  }

  return (
    <Card className="bg-card">
      <CardContent className="p-0">
        {Object.entries(groupedTransactions).length > 0 ? (
          <ul className="divide-y divide-border">
            {Object.entries(groupedTransactions).map(([date, transactionsOnDate]) => (
              <Fragment key={date}>
                <li className="px-4 py-2 bg-secondary/50">
                  <p className="font-semibold text-sm text-muted-foreground">{format(new Date(date), 'EEEE, MMMM d')}</p>
                </li>
                {transactionsOnDate.map((transaction, index) => (
                   <li key={transaction.id} className="px-4">
                    <div className="flex items-center gap-4 py-3">
                      <div className="rounded-full bg-secondary p-2 flex-shrink-0">
                        {getIcon(transaction.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{transaction.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.note || transaction.category}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className={`font-bold whitespace-nowrap ${
                            transaction.type === 'income' ? 'text-green-500' : ''
                          }`}
                        >
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </Fragment>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground py-10">No transactions yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

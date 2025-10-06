"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { format } from 'date-fns';

export function UpcomingBills() {
  const { userData, loading, formatCurrency } = useUserData();

  // Get bills sorted by due day
  const bills = userData?.recurringExpenses
    ?.filter(e => e.dueDay)
    .sort((a,b) => (a.dueDay || 32) - (b.dueDay || 32));

  const getDueDate = (day: number) => {
    const now = new Date();
    let dueDate = new Date(now.getFullYear(), now.getMonth(), day);
    // if the day has already passed this month, show next month's due date
    if (dueDate < now) {
      dueDate.setMonth(dueDate.getMonth() + 1);
    }
    return format(dueDate, "MMM do");
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Upcoming Bills</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-3 w-2/5" />
              </div>
              <Skeleton className="h-5 w-12" />
            </div>
             <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-3 w-2/5" />
              </div>
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        ) : bills && bills.length > 0 ? (
          <ul className="space-y-4">
            {bills.slice(0, 2).map((bill, index) => (
              <li key={index} className="flex items-center space-x-4">
                <div className="rounded-full bg-secondary p-2">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold truncate">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {getDueDate(bill.dueDay!)}
                  </p>
                </div>
                <p className="font-bold">{formatCurrency(bill.amount)}</p>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </li>
            ))}
          </ul>
        ) : (
           <p className="text-sm text-muted-foreground text-center py-4">No upcoming bills added yet.</p>
        )}
        <Button variant="link" className="mt-4 w-full">
          Manage Bills
        </Button>
      </CardContent>
    </Card>
  );
}

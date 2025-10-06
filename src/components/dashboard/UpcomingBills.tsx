import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

const bills = [
  {
    name: 'Credit Card',
    due_date: 'July 15',
    amount: '₹5,000',
  },
  {
    name: 'Phone Bill',
    due_date: 'July 20',
    amount: '₹800',
  },
];

export function UpcomingBills() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Upcoming Bills</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {bills.map((bill, index) => (
            <li key={index} className="flex items-center space-x-4">
              <div className="rounded-full bg-secondary p-2">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{bill.name}</p>
                <p className="text-xs text-muted-foreground">
                  Due: {bill.due_date}
                </p>
              </div>
              <p className="font-bold">{bill.amount}</p>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </li>
          ))}
        </ul>
        <Button variant="link" className="mt-4 w-full">
          Manage Bills
        </Button>
      </CardContent>
    </Card>
  );
}

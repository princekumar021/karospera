import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Wallet } from 'lucide-react';

const transactions = [
  {
    icon: <Wallet className="h-6 w-6 text-yellow-500" />,
    category: 'Salary',
    name: 'Monthly Paycheck',
    date: 'July 1, 2024',
    amount: '+ ₹50,000',
    type: 'income',
  },
  {
    icon: <Wallet className="h-6 w-6 text-red-500" />,
    category: 'Rent',
    name: 'Apartment Rent',
    date: 'July 2, 2024',
    amount: '- ₹15,000',
    type: 'expense',
  },
  {
    icon: <Wallet className="h-6 w-6 text-blue-500" />,
    category: 'Groceries',
    name: 'Supermarket Haul',
    date: 'July 3, 2024',
    amount: '- ₹4,500',
    type: 'expense',
  },
  {
    icon: <Wallet className="h-6 w-6 text-green-500" />,
    category: 'Travel',
    name: 'Weekend Getaway',
    date: 'July 5, 2024',
    amount: '- ₹8,000',
    type: 'expense',
  },
];

export function TransactionsPreview() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactions.map((transaction, index) => (
            <li key={index} className="flex items-center space-x-4">
              <div className="rounded-full bg-secondary p-2">
                {transaction.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.date}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    transaction.type === 'income'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </li>
          ))}
        </ul>
        <Button variant="link" className="mt-4 w-full">
          View All
        </Button>
      </CardContent>
    </Card>
  );
}

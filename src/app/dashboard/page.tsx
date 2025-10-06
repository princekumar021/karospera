import { PocketPlanLogo } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  ChartBar,
  ChevronRight,
  Home,
  PlusCircle,
  Settings,
  Target,
  User,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const chartData = [
  { name: 'Groceries', value: 400 },
  { name: 'Bills', value: 300 },
  { name: 'Shopping', value: 300 },
  { name: 'Transport', value: 200 },
  { name: 'Food', value: 278 },
];

const COLORS = ['#0F6EFF', '#FFC857', '#4CAF50', '#FF5E57', '#8B5CF6'];

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

const goals = [
  {
    name: 'Buy new Laptop',
    progress: 75,
    target: '₹1,00,000',
  },
  {
    name: 'Vacation to Goa',
    progress: 40,
    target: '₹50,000',
  },
];

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

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3">
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-bold">Hi, User 👋</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹22,500</p>
              <p className="text-xs text-green-400">+5.2% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={75} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                Saving for New Laptop
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold">Quick Actions</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            <ActionButton icon={<PlusCircle />} label="Add Expense" />
            <ActionButton icon={<Wallet />} label="Add Income" />
            <ActionButton icon={<Target />} label="Set Goal" />
            <ActionButton icon={<ChartBar />} label="View Report" />
          </div>
        </div>

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

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {goals.map((goal, index) => (
                <li key={index}>
                  <div className="mb-1 flex justify-between">
                    <p className="font-semibold">{goal.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {goal.target}
                    </p>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </li>
              ))}
            </ul>
            <Button variant="link" className="mt-4 w-full">
              Add New Goal
            </Button>
          </CardContent>
        </Card>

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

        <div className="rounded-lg bg-gradient-to-r from-primary/80 to-primary/60 p-4 text-primary-foreground">
          <h3 className="font-bold">💡 Smart Tip</h3>
          <p className="text-sm">
            You’ve spent 60% of your budget this month. Plan early to stay under
            your limit!
          </p>
          <Button variant="link" className="p-0 text-primary-foreground">
            View Budget
          </Button>
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
        <div className="mx-auto flex max-w-md justify-around">
          <BottomNavItem icon={<Home />} label="Dashboard" active />
          <BottomNavItem icon={<Wallet />} label="Budgets" />
          <BottomNavItem icon={<Target />} label="Goals" />
          <BottomNavItem icon={<ChartBar />} label="Reports" />
          <BottomNavItem icon={<User />} label="Profile" />
        </div>
      </nav>
    </div>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
        {icon}
      </Button>
      <span className="text-xs">{label}</span>
    </div>
  );
}

function BottomNavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href="#"
      className={`flex flex-col items-center space-y-1 py-2 ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}

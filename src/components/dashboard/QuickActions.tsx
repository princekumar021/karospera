import { Button } from '@/components/ui/button';
import { ChartBar, PlusCircle, Target, Wallet } from 'lucide-react';
import { AddExpenseDialog } from './quick-actions/AddExpenseDialog';
import { AddIncomeDialog } from './quick-actions/AddIncomeDialog';
import { AddGoalDialog } from '@/components/goals';
import Link from 'next/link';

function ActionButton({
  icon,
  label,
  action,
}: {
  icon: React.ReactNode;
  label: string;
  action?: 'addExpense' | 'addIncome' | 'setGoal' | 'viewReport';
}) {
  const renderAction = () => {
    switch(action) {
      case 'addExpense':
        return <AddExpenseDialog />;
      case 'addIncome':
        return <AddIncomeDialog />;
      case 'setGoal':
        return (
          <div className="flex flex-col items-center space-y-1">
            <AddGoalDialog trigger={
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
                {icon}
              </Button>
            } />
            <span className="text-xs">{label}</span>
          </div>
        )
      case 'viewReport':
        return (
          <Link href="/reports" className="flex flex-col items-center space-y-1">
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
              {icon}
            </Button>
            <span className="text-xs">{label}</span>
          </Link>
        )
      default:
        return (
          <div className="flex flex-col items-center space-y-1">
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
              {icon}
            </Button>
            <span className="text-xs">{label}</span>
          </div>
        );
    }
  }

  return renderAction();
}

export function QuickActions() {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold">Quick Actions</h2>
      <div className="flex justify-around space-x-4 overflow-x-auto pb-2">
        <ActionButton icon={<PlusCircle />} label="Add Expense" action="addExpense" />
        <ActionButton icon={<Wallet />} label="Add Income" action="addIncome" />
        <ActionButton icon={<Target />} label="Set Goal" action="setGoal" />
        <ActionButton icon={<ChartBar />} label="View Report" action="viewReport" />
      </div>
    </div>
  );
}

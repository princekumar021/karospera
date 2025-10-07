import { Button } from '@/components/ui/button';
import { ChartBar, Plus, Target, Wallet } from 'lucide-react';
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
        return (
          <AddExpenseDialog trigger={
            <div className="flex flex-col items-center space-y-1 cursor-pointer">
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg bg-secondary border-none">
                {icon}
              </Button>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          } />
        );
      case 'addIncome':
        return (
          <AddIncomeDialog trigger={
            <div className="flex flex-col items-center space-y-1 cursor-pointer">
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg bg-secondary border-none">
                {icon}
              </Button>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          } />
        );
      case 'setGoal':
        return (
          <div className="flex flex-col items-center space-y-1">
            <AddGoalDialog trigger={
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg bg-secondary border-none">
                {icon}
              </Button>
            } />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        )
      case 'viewReport':
        return (
          <Link href="/reports" className="flex flex-col items-center space-y-1">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg bg-secondary border-none">
              {icon}
            </Button>
            <span className="text-xs text-muted-foreground">{label}</span>
          </Link>
        )
      default:
        return (
          <div className="flex flex-col items-center space-y-1">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg bg-secondary border-none">
              {icon}
            </Button>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        );
    }
  }

  return renderAction();
}

export function QuickActions() {
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold">Quick Actions</h2>
      <div className="flex justify-around items-start">
        <ActionButton icon={<Plus className="h-5 w-5"/>} label="Add Expense" action="addExpense" />
        <ActionButton icon={<Wallet className="h-5 w-5"/>} label="Set Income" action="addIncome" />
        <ActionButton icon={<Target className="h-5 w-5"/>} label="Set Goal" action="setGoal" />
        <ActionButton icon={<ChartBar className="h-5 w-5"/>} label="View Report" action="viewReport" />
      </div>
    </div>
  );
}

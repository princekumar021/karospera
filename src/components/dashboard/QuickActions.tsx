import { Button } from '@/components/ui/button';
import { ChartBar, PlusCircle, Target, Wallet } from 'lucide-react';

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

export function QuickActions() {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold">Quick Actions</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        <ActionButton icon={<PlusCircle />} label="Add Expense" />
        <ActionButton icon={<Wallet />} label="Add Income" />
        <ActionButton icon={<Target />} label="Set Goal" />
        <ActionButton icon={<ChartBar />} label="View Report" />
      </div>
    </div>
  );
}

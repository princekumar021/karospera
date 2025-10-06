import { BudgetHeader, BudgetSummary, CategoryList, AddBudgetDialog } from '@/components/budget';
import { BottomNavigation } from '@/components/dashboard';
import { Plus } from 'lucide-react';

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BudgetHeader />
      <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-32">
        <BudgetSummary />
        <CategoryList />
      </main>
      <div className="fixed bottom-24 right-4 z-20">
        <AddBudgetDialog />
      </div>
      <BottomNavigation />
    </div>
  );
}

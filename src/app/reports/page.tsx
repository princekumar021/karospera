
import { BottomNavigation } from '@/components/dashboard';
import { ReportsHeader, SummaryCards, SpendingPieChart, IncomeExpenseChart, SmartInsights, SavingsTrendChart } from '@/components/reports';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReportsHeader />
      <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-24">
        <SummaryCards />
        <SpendingPieChart />
        <IncomeExpenseChart />
        <SavingsTrendChart />
        <SmartInsights />
      </main>
      <BottomNavigation />
    </div>
  );
}

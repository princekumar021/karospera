import {
  DashboardHeader,
  OverviewCard,
  QuickActions,
  SpendingChart,
  TransactionsPreview,
  GoalsSection,
  UpcomingBills,
  TipsBanner,
  BottomNavigation,
} from '@/components/dashboard';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-24">
        <OverviewCard />
        <QuickActions />
        <SpendingChart />
        <TransactionsPreview />
        <GoalsSection />
        <UpcomingBills />
        <TipsBanner />
      </main>
      <BottomNavigation />
    </div>
  );
}

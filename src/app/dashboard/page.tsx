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
      <div className="max-w-md mx-auto bg-card sm:rounded-2xl sm:shadow-lg sm:my-4">
        <DashboardHeader />
        <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-32">
          <OverviewCard />
          <QuickActions />
          <SpendingChart />
          <TransactionsPreview />
          <GoalsSection />
          <UpcomingBills />
          <TipsBanner />
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}

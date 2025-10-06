
import { GoalsHeader, ActiveGoals, GoalsInsights } from '@/components/goals';
import { BottomNavigation } from '@/components/dashboard';

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GoalsHeader />
      <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-24">
        <ActiveGoals />
        <GoalsInsights />
      </main>
      <BottomNavigation />
    </div>
  );
}


import { SettingsHeader, AppearanceSettings, FinancialSettings, NotificationSettings, DataSettings, AppInfo } from '@/components/settings';
import { BottomNavigation } from '@/components/dashboard';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SettingsHeader />
      <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-32">
        <AppearanceSettings />
        <FinancialSettings />
        <NotificationSettings />
        <DataSettings />
        <AppInfo />
      </main>
      <BottomNavigation />
    </div>
  );
}

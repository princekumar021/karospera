
import { ProfileHeader, UserInfo, PersonalDetails, QuickActions, Achievements } from '@/components/profile';
import { BottomNavigation } from '@/components/dashboard';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProfileHeader />
      <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-24">
        <UserInfo />
        <PersonalDetails />
        <QuickActions />
        <Achievements />
      </main>
      <BottomNavigation />
    </div>
  );
}

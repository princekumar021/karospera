import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3">
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <h1 className="text-lg font-bold">Hi, User 👋</h1>
      <Button variant="ghost" size="icon">
        <Settings className="h-6 w-6" />
      </Button>
    </header>
  );
}

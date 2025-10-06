import Link from 'next/link';
import { Home, Wallet, Target, ChartBar, User } from 'lucide-react';

function BottomNavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href="#"
      className={`flex flex-col items-center space-y-1 py-2 ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="mx-auto flex max-w-md justify-around">
        <BottomNavItem icon={<Home />} label="Dashboard" active />
        <BottomNavItem icon={<Wallet />} label="Budgets" />
        <BottomNavItem icon={<Target />} label="Goals" />
        <BottomNavItem icon={<ChartBar />} label="Reports" />
        <BottomNavItem icon={<User />} label="Profile" />
      </div>
    </nav>
  );
}

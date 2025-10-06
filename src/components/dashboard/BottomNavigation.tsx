"use client";

import Link from 'next/link';
import { Home, Wallet, Target, ChartBar, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: <Home />, label: 'Dashboard' },
  { href: '/budget', icon: <Wallet />, label: 'Budgets' },
  { href: '#', icon: <Target />, label: 'Goals' },
  { href: '#', icon: <ChartBar />, label: 'Reports' },
  { href: '#', icon: <User />, label: 'Profile' },
];

function BottomNavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center space-y-1 py-2 text-muted-foreground transition-colors hover:text-primary',
        active && 'text-primary'
      )}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="mx-auto flex max-w-md justify-around">
        {navItems.map((item) => (
          <BottomNavItem 
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname.startsWith(item.href)}
          />
        ))}
      </div>
    </nav>
  );
}

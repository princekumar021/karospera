"use client";

import Link from 'next/link';
import { Home, BarChart, FileText, User, Target, GoalIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FilledHome } from '../icons';

function BottomNavItem({
  href,
  icon,
  activeIcon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center space-y-1 p-2 text-muted-foreground transition-colors hover:text-primary',
        active && 'text-primary'
      )}
    >
      <div className="h-6 w-6">{active ? activeIcon : icon}</div>
      <span className={cn("text-xs", active && "font-semibold")}>{label}</span>
    </Link>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: <Home className="h-6 w-6" />, activeIcon: <FilledHome />, label: 'Home' },
    { href: '/budget', icon: <BarChart className="h-6 w-6" />, activeIcon: <BarChart className="h-6 w-6" />, label: 'Budget' },
    { href: '/goals', icon: <Target className="h-6 w-6" />, activeIcon: <Target className="h-6 w-6" />, label: 'Goals' },
    { href: '/reports', icon: <FileText className="h-6 w-6" />, activeIcon: <FileText className="h-6 w-6" />, label: 'Reports' },
    { href: '/profile', icon: <User className="h-6 w-6" />, activeIcon: <User className="h-6 w-6" />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-around gap-2 rounded-2xl bg-card/80 p-2 shadow-lg backdrop-blur-md border border-border/20 max-w-md mx-auto">
        {navItems.map((item) => (
          <BottomNavItem 
            key={item.label}
            href={item.href}
            icon={item.icon}
            activeIcon={item.activeIcon}
            label={item.label}
            active={pathname.startsWith(item.href)}
          />
        ))}
      </div>
    </nav>
  );
}

"use client";

import Link from 'next/link';
import { Home, DollarSign, BarChart, FileText, Settings, User } from 'lucide-react';
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
  
  // A temporary mapping to handle different pages. This can be improved.
  const simplePath = (path: string) => {
    if (path.startsWith('/budget')) return '/budget';
    if (path.startsWith('/goals')) return '/goals';
    if (path.startsWith('/reports')) return '/reports';
    if (path.startsWith('/profile')) return '/profile';
    if (path.startsWith('/settings')) return '/settings';
    return '/dashboard';
  }
  
  const activePath = simplePath(pathname);

  // Define new nav items based on the image
  const newNavItems = [
    { href: '/dashboard', icon: <Home className="h-6 w-6" />, activeIcon: <FilledHome />, label: 'Dashboard' },
    { href: '/budget', icon: <BarChart className="h-6 w-6" />, activeIcon: <BarChart className="h-6 w-6" />, label: 'Budget' },
    { href: '/reports', icon: <FileText className="h-6 w-6" />, activeIcon: <FileText className="h-6 w-6" />, label: 'Reports' },
    { href: '/profile', icon: <User className="h-6 w-6" />, activeIcon: <User className="h-6 w-6" />, label: 'Profile' },
    { href: '/settings', icon: <Settings className="h-6 w-6" />, activeIcon: <Settings className="h-6 w-6" />, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-around gap-2 rounded-2xl bg-card/80 p-2 shadow-lg backdrop-blur-md border border-border/20 max-w-md mx-auto">
        {newNavItems.map((item) => (
          <BottomNavItem 
            key={item.label}
            href={item.href}
            icon={item.icon}
            activeIcon={item.activeIcon}
            label={item.label}
            active={activePath === item.href}
          />
        ))}
      </div>
    </nav>
  );
}

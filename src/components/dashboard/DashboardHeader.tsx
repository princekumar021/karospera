"use client";

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

export function DashboardHeader() {
  const { userData, loading } = useUserData();
  const userName = userData?.fullName || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between bg-card px-4 pt-3">
      <div className="flex items-center gap-3">
        <Link href="/profile" passHref>
          <Avatar className="h-10 w-10">
            {loading ? <Skeleton className="h-10 w-10 rounded-full" /> : <AvatarFallback>{userInitial}</AvatarFallback>}
          </Avatar>
        </Link>
        {loading ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <h1 className="text-xl font-bold truncate">Hi, {userName.split(' ')[0]} 👋</h1>
        )}
      </div>
      <Link href="/settings" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
          <Settings className="h-6 w-6" />
      </Link>
    </header>
  );
}

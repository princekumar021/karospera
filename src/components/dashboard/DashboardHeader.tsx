"use client";

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

export function DashboardHeader() {
  const { userData, loading } = useUserData();
  const userName = userData?.fullName || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between bg-card px-4 py-3 rounded-t-2xl">
      <div className="flex items-center gap-3">
        <Link href="/profile" passHref>
          <Avatar className="h-10 w-10">
            {loading ? <Skeleton className="h-10 w-10 rounded-full" /> : <AvatarFallback>{userInitial}</AvatarFallback>}
          </Avatar>
        </Link>
        {loading ? (
          <Skeleton className="h-6 w-32" />
        ) : (
          <h1 className="text-lg font-bold truncate">Hi, {userName.split(' ')[0]} 👋</h1>
        )}
      </div>
      <Button variant="ghost" size="icon" asChild>
        <Link href="/settings">
          <Settings className="h-6 w-6" />
        </Link>
      </Button>
    </header>
  );
}

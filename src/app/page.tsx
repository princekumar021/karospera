"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '@/components/ui/skeleton';

export default function GatekeeperPage() {
  const { userData, loading } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (userData) {
        router.replace('/dashboard');
      } else {
        router.replace('/welcome');
      }
    }
  }, [userData, loading, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Skeleton className="h-24 w-24 rounded-full" />
    </div>
  );
}

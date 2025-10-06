"use client";

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

export function UserInfo() {
  const { userData, loading } = useUserData();
  const userName = userData?.fullName || 'User';
  const userInitial = userName.charAt(0).toUpperCase();
  const primaryGoal = userData?.goals && userData.goals.length > 0 ? userData.goals[0] : null;

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24">
        {loading ? <Skeleton className="h-24 w-24 rounded-full" /> : <AvatarFallback className="text-4xl">{userInitial}</AvatarFallback>}
      </Avatar>
      {loading ? (
        <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-48" />
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold truncate">{userName}</h2>
          <p className="text-muted-foreground truncate">Saving for {primaryGoal?.name || 'your future'}</p>
        </div>
      )}
       <Button variant="outline" size="sm">Change Avatar</Button>
    </div>
  );
}

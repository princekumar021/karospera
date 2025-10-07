"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { useRef } from 'react';

export function UserInfo() {
  const { userData, loading, updateAvatar } = useUserData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const userName = userData?.fullName || 'User';
  const userInitial = userName.charAt(0).toUpperCase();
  const primaryGoal = userData?.goals && userData.goals.length > 0 ? userData.goals[0] : null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // You might want to add validation for file type and size here
      if(file.size > 2 * 1024 * 1024) {
        // You could use a toast notification here
        alert("File size should be less than 2MB");
        return;
      }
      updateAvatar(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24">
        {loading ? (
          <Skeleton className="h-24 w-24 rounded-full" />
        ) : (
          <>
            <AvatarImage src={userData?.avatar} alt={userName} />
            <AvatarFallback className="text-4xl">{userInitial}</AvatarFallback>
          </>
        )}
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />
       <Button variant="outline" size="sm" onClick={handleButtonClick}>Change Avatar</Button>
    </div>
  );
}

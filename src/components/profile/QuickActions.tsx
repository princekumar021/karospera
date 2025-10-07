
"use client";

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserData } from '@/hooks/use-user-data';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '../ui/card';
import { ChevronRight } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import { EditProfileSheet } from './EditProfileSheet';

export function QuickActions() {
    const { resetUserData } = useUserData();
    const router = useRouter();
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

    const handleLogout = () => {
        resetUserData();
        router.push('/setup');
    }

  return (
    <>
      <Card className="bg-card">
          <CardContent className="p-0">
              <ul className="space-y-0">
                  <li onClick={() => setIsEditSheetOpen(true)} className="flex justify-between items-center p-4 cursor-pointer hover:bg-secondary/50">
                      <span className="font-medium">Edit Profile</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
                  </li>
                  <Separator />
                  <li className="flex justify-between items-center p-4 cursor-pointer hover:bg-secondary/50">
                      <span className="font-medium">Adjust Financial Data</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
                  </li>
                  <Separator />
                  <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <li className="flex justify-between items-center p-4 cursor-pointer hover:bg-secondary/50 w-full">
                              <span className="font-medium text-destructive">Reset All Data</span>
                              <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
                          </li>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete all your data
                              and remove your information from our servers.
                          </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={resetUserData} className="bg-destructive hover:bg-destructive/90">Continue</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
                  <Separator />
                   <li onClick={handleLogout} className="flex justify-between items-center p-4 cursor-pointer hover:bg-secondary/50">
                      <span className="font-medium text-destructive">Logout</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
                  </li>
              </ul>
          </CardContent>
      </Card>
      <EditProfileSheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen} />
    </>
  );
}

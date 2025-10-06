
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


export function QuickActions() {
    const { resetUserData } = useUserData();
    const router = useRouter();

    const handleLogout = () => {
        resetUserData();
        router.push('/setup');
    }

  return (
    <div className="space-y-2">
        <Button variant="outline" className="w-full">Edit Profile</Button>
        <Button variant="outline" className="w-full">Adjust Financial Data</Button>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">Reset All Data</Button>
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
                <AlertDialogAction onClick={resetUserData}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <Button variant="outline" className="w-full" onClick={handleLogout}>Logout</Button>
    </div>
  );
}

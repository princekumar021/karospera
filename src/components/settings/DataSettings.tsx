
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { ChevronRight } from 'lucide-react';
import { Separator } from '../ui/separator';

export function DataSettings() {
    const { resetUserData, userData } = useUserData();

    const handleBackup = () => {
        if (!userData) return;
        const dataStr = JSON.stringify(userData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'pocketplan_backup.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Data & Privacy</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <button onClick={handleBackup} className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/50">
            <span>Backup Data</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
        </button>
        <Separator />
        <button className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/50" disabled>
            <span className="opacity-50">Restore Backup</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
        </button>
        <Separator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex w-full items-center justify-between p-4 text-left text-destructive hover:bg-secondary/50">
                <span>Reset All Data</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all your data and you will be redirected to the setup page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={resetUserData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { EditProfileSheet } from './EditProfileSheet';
import { useState } from 'react';

export function PersonalDetails() {
  const { userData, loading, formatCurrency } = useUserData();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const primaryGoal = userData?.goals && userData.goals.length > 0 ? userData.goals[0] : null;

  const details = userData ? [
    { label: "Monthly Income", value: formatCurrency(userData.monthlyIncome || 0) },
    { label: "Currency", value: userData.currency || "INR" },
    { label: "Primary Goal", value: primaryGoal?.name || "Not set" },
    { label: "Budgeting Method", value: (userData.budgetMethod || "balanced").replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }
  ] : [];

  if (loading) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <Skeleton className="h-6 w-3/5" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-4 w-1/5" />
              </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <>
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Details</CardTitle>
        <EditProfileSheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <Button variant="ghost" size="icon" onClick={() => setIsEditSheetOpen(true)}>
            <Edit2 className="h-5 w-5 text-muted-foreground" />
          </Button>
        </EditProfileSheet>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {details.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-semibold truncate">{item.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
    </>
  );
}

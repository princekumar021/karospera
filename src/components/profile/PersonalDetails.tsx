
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { Edit2 } from 'lucide-react';
import { Button } from '../ui/button';

export function PersonalDetails() {
  const { userData, loading, formatCurrency } = useUserData();

  const details = [
    { label: "Monthly Income", value: formatCurrency(userData?.monthlyIncome || 0) },
    { label: "Currency", value: userData?.currency || "INR" },
    { label: "Primary Goal", value: userData?.goal || "Not set" },
    { label: "Budgeting Method", value: userData?.budgetMethod || "Balanced" }
  ]

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
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {details.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-muted-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{item.value}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Edit2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

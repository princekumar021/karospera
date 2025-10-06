
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';

export function FinancialSettings() {
  const { userData, loading, updateUserData, formatCurrency } = useUserData();

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-3/5" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Financial</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
            <Label htmlFor="monthly-income" className="flex-1">Monthly Income</Label>
            <Input 
                id="monthly-income" 
                type="number" 
                value={userData?.monthlyIncome || ''} 
                onChange={(e) => updateUserData({ monthlyIncome: Number(e.target.value) })}
                placeholder="e.g., 50000"
                className="w-auto max-w-[150px] text-right border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
            <Label htmlFor="currency" className="flex-1">Currency</Label>
            <Select 
                value={userData?.currency || 'INR'}
                onValueChange={(value) => updateUserData({ currency: value })}
            >
                <SelectTrigger id="currency" className="w-auto border-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="INR">INR (₹)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

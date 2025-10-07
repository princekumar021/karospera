
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useUserData } from '@/hooks/use-user-data';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';

export function NotificationSettings() {
    const { userData, loading, updateUserData } = useUserData();
    
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-2/5" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </CardContent>
            </Card>
        )
    }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <Label htmlFor="budget-alerts" className="flex-1">Budget Limit Alerts</Label>
          <Switch
            id="budget-alerts"
            checked={userData?.budgetAlerts ?? true}
            onCheckedChange={(checked) => updateUserData({ budgetAlerts: checked })}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between p-4">
          <Label htmlFor="goal-reminders" className="flex-1">Goal Completion Reminders</Label>
          <Switch
            id="goal-reminders"
            checked={userData?.goalReminders ?? true}
            onCheckedChange={(checked) => updateUserData({ goalReminders: checked })}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between p-4">
          <Label htmlFor="monthly-summary" className="flex-1">Monthly Summary Updates</Label>
          <Switch
            id="monthly-summary"
            checked={userData?.monthlySummary ?? false}
            onCheckedChange={(checked) => updateUserData({ monthlySummary: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
}

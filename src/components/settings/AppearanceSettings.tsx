
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useUserData } from '@/hooks/use-user-data';
import { Moon, Sun } from 'lucide-react';

export function AppearanceSettings() {
  const { userData, updateUserData } = useUserData();
  const isDarkMode = userData?.theme === 'dark';

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    updateUserData({ theme: newTheme });
    // This part requires logic in the RootLayout to actually change the theme class on the html element
    document.documentElement.classList.toggle('dark', checked);
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Appearance & Theme</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <Label htmlFor="dark-mode-switch">Dark Mode</Label>
          </div>
          <Switch
            id="dark-mode-switch"
            checked={isDarkMode}
            onCheckedChange={handleThemeChange}
          />
        </div>
        {/* Accent color picker can be added here */}
      </CardContent>
    </Card>
  );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useUserData } from '@/hooks/use-user-data';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AppearanceSettings() {
  const { userData, updateUserData, loading } = useUserData();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (!loading && userData) {
        setIsDarkMode(userData.theme === 'dark');
    }
  }, [userData, loading]);
  
  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setIsDarkMode(checked);
    updateUserData({ theme: newTheme });
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
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
            disabled={loading}
          />
        </div>
        {/* Accent color picker can be added here */}
      </CardContent>
    </Card>
  );
}

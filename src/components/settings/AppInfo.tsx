
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export function AppInfo() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>App Info</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex justify-between">
                <span>Version</span>
                <span>1.0.0</span>
            </li>
             <li className="flex justify-between">
                <span>Developer</span>
                <span>PocketPlan Team</span>
            </li>
            <li>
                 <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
            </li>
             <li>
                 <Link href="#" className="text-primary hover:underline">Terms of Use</Link>
            </li>
        </ul>
      </CardContent>
    </Card>
  );
}

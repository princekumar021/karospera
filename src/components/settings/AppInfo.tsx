
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../ui/separator';

export function AppInfo() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>App Info</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
            <span>Version</span>
            <span className="text-muted-foreground">1.0.0</span>
        </div>
        <Separator/>
        <div className="flex items-center justify-between p-4">
            <span>Developer</span>
            <span className="text-muted-foreground">PocketPlan Team</span>
        </div>
        <Separator/>
        <Link href="#" className="flex items-center justify-between p-4 hover:bg-secondary/50">
            <span>Privacy Policy</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
        <Separator/>
        <Link href="#" className="flex items-center justify-between p-4 hover:bg-secondary/50">
            <span>Terms of Use</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </CardContent>
    </Card>
  );
}

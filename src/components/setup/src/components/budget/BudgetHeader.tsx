"use client";

import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { format } from 'date-fns';

export function BudgetHeader() {
  const currentMonth = format(new Date(), 'MMMM yyyy');

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3">
      <div>
        <h1 className="text-xl font-bold">Your Budget</h1>
        <p className="text-sm text-muted-foreground">{currentMonth}</p>
      </div>
      <Button variant="ghost" size="icon">
        <Edit className="h-5 w-5" />
      </Button>
    </header>
  );
}

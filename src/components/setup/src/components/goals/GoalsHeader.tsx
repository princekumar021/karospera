"use client";

import { useState } from 'react';
import { Button } from '../ui/button';
import { AddGoalDialog } from './AddGoalDialog';
import { Plus } from 'lucide-react';

export function GoalsHeader() {
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3">
      <div>
        <h1 className="text-xl font-bold">Your Goals</h1>
        <p className="text-sm text-muted-foreground">Track your dreams and stay motivated</p>
      </div>
      <AddGoalDialog
        open={isAddGoalOpen}
        onOpenChange={setIsAddGoalOpen}
        trigger={
          <Button variant="ghost" size="icon" onClick={() => setIsAddGoalOpen(true)}>
            <Plus className="h-5 w-5" />
          </Button>
        }
      />
    </header>
  );
}

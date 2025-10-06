"use client";

import { AddGoalDialog } from './AddGoalDialog';

export function GoalsHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3">
      <div>
        <h1 className="text-xl font-bold">Your Goals</h1>
        <p className="text-sm text-muted-foreground">Track your dreams and stay motivated</p>
      </div>
      <AddGoalDialog />
    </header>
  );
}

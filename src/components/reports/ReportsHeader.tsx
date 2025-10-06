"use client";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export function ReportsHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3">
      <div>
        <h1 className="text-xl font-bold">Reports & Insights</h1>
        <p className="text-sm text-muted-foreground">Understand where your money goes</p>
      </div>
      <Button variant="ghost" size="icon">
        <Filter className="h-5 w-5" />
      </Button>
    </header>
  );
}

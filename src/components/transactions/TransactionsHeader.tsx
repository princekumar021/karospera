"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function TransactionsHeader() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
            <h1 className="text-xl font-bold">All Transactions</h1>
            <p className="text-sm text-muted-foreground">Your complete history</p>
        </div>
        <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
        </Button>
    </header>
  );
}

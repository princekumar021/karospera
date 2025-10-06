"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AddIncomeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center space-y-1">
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
                <Wallet />
            </Button>
            <span className="text-xs">Add Income</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-source" className="text-right">
              Source
            </Label>
            <Input id="income-source" placeholder="e.g., Freelance Project" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-amount" className="text-right">
              Amount
            </Label>
            <Input id="income-amount" type="number" placeholder="e.g., 10000" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={() => setOpen(false)}>Add Income</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

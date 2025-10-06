"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { useToast } from '@/hooks/use-toast';

type IncomeForm = {
  source: string;
  amount: number;
}

export function AddIncomeDialog() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IncomeForm>();
  const { addTransaction, formatCurrency } = useUserData();
  const { toast } = useToast();

  const onSubmit = (data: IncomeForm) => {
    addTransaction({
      name: data.source,
      amount: Math.abs(data.amount),
      type: 'income',
      category: 'Income',
    });
    toast({
      title: "Income Added",
      description: `${data.source} for ${formatCurrency(data.amount)} has been recorded.`,
    });
    reset();
    setOpen(false);
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Income</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="income-source" className="text-right">
                Source
              </Label>
              <div className="col-span-3">
                <Input id="income-source" placeholder="e.g., Freelance Project" {...register("source", { required: "Source is required" })} />
                {errors.source && <p className="text-xs text-red-500 mt-1">{errors.source.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="income-amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3">
                <Input id="income-amount" type="number" placeholder="e.g., 10000" {...register("amount", { required: "Amount is required", valueAsNumber: true })}/>
                {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Income</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
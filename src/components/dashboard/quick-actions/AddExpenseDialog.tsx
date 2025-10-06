"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { PlusCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserData } from '@/hooks/use-user-data';
import { useToast } from '@/hooks/use-toast';

type ExpenseForm = {
  name: string;
  amount: number;
  category: string;
}

export function AddExpenseDialog() {
  const [open, setOpen] = useState(false);
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseForm>();
  const { addTransaction, formatCurrency } = useUserData();
  const { toast } = useToast();

  const onSubmit = (data: ExpenseForm) => {
    addTransaction({
      name: data.name,
      amount: -Math.abs(data.amount),
      type: 'expense',
      category: data.category,
    });
    toast({
      title: "Expense Added",
      description: `${data.name} for ${formatCurrency(data.amount)} has been recorded.`,
    });
    reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center space-y-1 cursor-pointer">
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
                <PlusCircle />
            </Button>
            <span className="text-xs">Add Expense</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expense-name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input id="expense-name" placeholder="e.g., Coffee" {...register("name", { required: "Name is required" })} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expense-amount" className="text-right">
                Amount
              </Label>
               <div className="col-span-3">
                <Input id="expense-amount" type="number" placeholder="e.g., 250" {...register("amount", { required: "Amount is required", valueAsNumber: true })} />
                {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
               <div className="col-span-3">
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Bills">Bills</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                />
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            <Button type="submit">Add Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

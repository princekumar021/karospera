"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, ChevronRight, ScanLine } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserData } from '@/hooks/use-user-data';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';

const expenseFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.coerce.number().min(0.01, "Amount must be positive"),
  category: z.string({ required_error: "Category is required" }),
  note: z.string().optional(),
});

type ExpenseForm = z.infer<typeof expenseFormSchema>;

export function AddExpenseDialog() {
  const [open, setOpen] = useState(false);
  const { userData, addTransaction, formatCurrency } = useUserData();
  const { toast } = useToast();

  const form = useForm<ExpenseForm>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: "New Expense", // Name is less prominent, so we can default it.
      amount: '' as any,
      note: "",
    }
  });

  const onSubmit = (data: ExpenseForm) => {
    addTransaction({
      name: data.category, // Use category as name for simplicity, as in new design
      amount: -Math.abs(data.amount),
      type: 'expense',
      category: data.category,
      date: new Date(),
      note: data.note,
    });
    toast({
      title: "Expense Added",
      description: `${data.category} for ${formatCurrency(data.amount)} has been recorded.`,
    });
    form.reset();
    setOpen(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset({ name: "New Expense", amount: '' as any, note: "" });
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <div className="flex flex-col items-center space-y-1 cursor-pointer">
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
                <PlusCircle />
            </Button>
            <span className="text-xs">Add Expense</span>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-6">
        <SheetHeader>
          <SheetTitle className="sr-only">Add Expense</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-2">
               <span className="text-4xl font-semibold text-muted-foreground">{userData?.currency === 'INR' ? '₹' : '$'}</span>
               <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                         <Input type="number" placeholder="0" className="h-auto border-0 text-4xl font-semibold p-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                      </FormControl>
                      <FormMessage className="mt-1" />
                    </FormItem>
                  )}
                />
              <Button type="submit" size="lg">Add</Button>
            </div>

            <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 text-base">
                             <div className="flex justify-between items-center w-full">
                                <span>Category</span>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <SelectValue placeholder="Shopping" />
                                    <ChevronRight className="h-5 w-5" />
                                </div>
                             </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Shopping">Shopping</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Bills">Bills</SelectItem>
                          <SelectItem value="Savings">Savings</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel className="sr-only">Note</FormLabel>
                       <FormControl>
                          <div className="flex items-center h-14 px-3 py-2 text-base rounded-md border border-input">
                             <span className="flex-1">Note</span>
                             <Input placeholder="Optional" className="border-0 text-right w-1/2 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                          </div>
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant="outline" className="w-full h-14 text-base justify-between">
                    <span>Scan Receipt</span>
                    <ScanLine className="h-6 w-6 text-muted-foreground" />
                </Button>
            </div>

            <SheetFooter className="mt-6">
              <SheetClose asChild>
                <Button variant="ghost" className="w-full">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

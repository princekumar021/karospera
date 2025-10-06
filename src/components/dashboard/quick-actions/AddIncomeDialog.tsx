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
import { Wallet } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const incomeFormSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be positive"),
  source: z.string().min(1, "Source is required"),
});

type IncomeForm = z.infer<typeof incomeFormSchema>;


export function AddIncomeDialog() {
  const [open, setOpen] = useState(false);
  const { userData, addTransaction, formatCurrency } = useUserData();
  const { toast } = useToast();

  const form = useForm<IncomeForm>({
    resolver: zodResolver(incomeFormSchema),
    defaultValues: {
      amount: '' as any,
      source: '',
    }
  });
  
  const onSubmit = (data: IncomeForm) => {
    addTransaction({
      name: data.source,
      amount: Math.abs(data.amount),
      type: 'income',
      category: 'Income',
      date: new Date(),
    });
    toast({
      title: "Income Added",
      description: `${data.source} for ${formatCurrency(data.amount)} has been recorded.`,
    });
    form.reset();
    setOpen(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset({ source: "", amount: '' as any });
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <div className="flex flex-col items-center space-y-1 cursor-pointer">
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
                <Wallet />
            </Button>
            <span className="text-xs">Add Income</span>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-6" hideClose>
        <SheetHeader>
          <SheetTitle className="sr-only">Add Income</SheetTitle>
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

            <div className="space-y-2 rounded-lg border bg-background">
                <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <div className="flex items-center h-14 px-3 py-2 text-base rounded-none">
                            <span className="flex-1">Source</span>
                            <Input placeholder="e.g. Salary" className="border-0 text-right w-1/2 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage className="mx-3" />
                    </FormItem>
                )}
                />
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

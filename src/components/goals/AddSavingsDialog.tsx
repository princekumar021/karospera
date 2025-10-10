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
import { useUserData } from '@/hooks/use-user-data';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const savingsFormSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be positive"),
  goalId: z.string({ required_error: "Please select a goal."}),
});

type SavingsForm = z.infer<typeof savingsFormSchema>;


export function AddSavingsDialog({ children, open, onOpenChange }: { children?: React.ReactNode, open: boolean, onOpenChange: (open: boolean) => void }) {
  const { userData, addSavingsToGoal, formatCurrency } = useUserData();
  const { toast } = useToast();
  const goals = userData?.goals || [];

  const form = useForm<SavingsForm>({
    resolver: zodResolver(savingsFormSchema),
    defaultValues: {
      amount: '' as any,
      goalId: goals.length > 0 ? goals[0].id : '',
    }
  });
  
  const onSubmit = (data: SavingsForm) => {
    addSavingsToGoal(data.goalId, data.amount);
    const goal = goals.find(g => g.id === data.goalId);
    toast({
      title: "Savings Added",
      description: `${formatCurrency(data.amount)} has been added to your "${goal?.name}" goal.`,
    });
    form.reset();
    onOpenChange(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      form.reset({ 
        amount: '' as any,
        goalId: goals.length > 0 ? goals[0].id : ''
      });
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-6" hideClose>
        <SheetHeader>
          <SheetTitle className="text-center">Add to Savings</SheetTitle>
        </SheetHeader>
        
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
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

            <div className="rounded-lg border bg-background">
                <FormField
                control={form.control}
                name="goalId"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center p-3 h-14">
                            <Label className="flex-1">For Goal</Label>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger className="w-auto border-0 focus:ring-0 focus:ring-offset-0 justify-end gap-2 h-auto p-0">
                                    <SelectValue placeholder="Select a goal" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {goals.map((goal) => (
                                    <SelectItem key={goal.id} value={goal.id}>
                                    {goal.name}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <FormMessage className="px-3 pb-2" />
                    </FormItem>
                )}
                />
            </div>

            <SheetFooter className="mt-6 flex-col gap-2">
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

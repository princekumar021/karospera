
"use client";

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Goal, goalSchema } from "@/lib/setup-schema";
import { useUserData } from '@/hooks/use-user-data';
import { useToast } from '@/hooks/use-toast';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { Separator } from '../ui/separator';
import { z } from 'zod';


const formSchema = goalSchema.omit({ id: true, currentAmount: true }).extend({
  newSavings: z.coerce.number().optional()
});
type GoalFormValues = Zod.infer<typeof formSchema>;

export function AddGoalDialog({ trigger, goalToEdit, open, onOpenChange }: { trigger?: React.ReactNode, goalToEdit?: Goal, open?: boolean, onOpenChange?: (open: boolean) => void }) {
  const { userData, addGoal, updateGoal, formatCurrency } = useUserData();
  const { toast } = useToast();
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: goalToEdit ? {
      name: goalToEdit.name,
      targetAmount: goalToEdit.targetAmount,
      targetDate: goalToEdit.targetDate,
      category: goalToEdit.category
    } : {
      name: '',
      targetAmount: undefined,
      category: 'savings',
    }
  });
  
  const selectedCategory = form.watch('category') || 'savings';
  const selectedDate = form.watch('targetDate');

  useEffect(() => {
    if (open && goalToEdit) {
      form.reset({
        name: goalToEdit.name,
        targetAmount: goalToEdit.targetAmount,
        targetDate: goalToEdit.targetDate ? new Date(goalToEdit.targetDate) : undefined,
        category: goalToEdit.category,
        newSavings: undefined,
      })
    } else if (!open) {
      form.reset({
        name: '',
        targetAmount: undefined,
        targetDate: undefined,
        category: 'savings',
        newSavings: undefined,
      })
    }
  }, [goalToEdit, form, open]);

  const onSubmit = (data: GoalFormValues) => {
    if (goalToEdit) {
      updateGoal({ ...goalToEdit, ...data }, data.newSavings);
      toast({ title: 'Goal Updated!', description: `Your goal "${data.name}" has been updated.` });
    } else {
      addGoal(data);
      toast({ title: 'Goal Added!', description: `New goal "${data.name}" created.` });
    }
    onOpenChange?.(false);
    form.reset();
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }

  const categoryOptions = [
    { value: "savings", label: "Savings" },
    { value: "investment", label: "Investment" },
    { value: "lifestyle", label: "Lifestyle" },
  ];
  
  const selectedCategoryLabel = categoryOptions.find(c => c.value === selectedCategory)?.label || 'Savings';

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-6" hideClose>
        <SheetHeader>
          <SheetTitle className="text-center">{goalToEdit ? 'Edit Goal' : 'Add New Goal'}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
             <div className="flex items-center gap-2">
              <span className="text-4xl font-semibold text-muted-foreground">{userData?.currency === 'INR' ? '₹' : '$'}</span>
              <FormField
                  control={form.control}
                  name="targetAmount"
                  render={({ field }) => (
                      <FormItem className="flex-1">
                      <FormControl>
                          <Input type="number" placeholder="0" className="h-auto border-0 text-4xl font-semibold p-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                      </FormControl>
                      <FormMessage className="mt-1" />
                      </FormItem>
                  )}
                  />
              <Button type="submit" size="lg">{goalToEdit ? 'Save' : 'Add'}</Button>
            </div>

            <div className="rounded-lg border bg-background">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <div className="flex items-center h-14 px-3 py-2 text-base rounded-none border-b">
                            <Label className="flex-1">Name</Label>
                            <Input placeholder="e.g. New Laptop" className="border-0 text-right w-1/2 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage className="mx-3" />
                    </FormItem>
                )}
                />
                
                {goalToEdit && (
                  <>
                  <Separator />
                  <FormField
                    control={form.control}
                    name="newSavings"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="flex items-center h-14 px-3 py-2 text-base rounded-none border-b">
                                <Label className="flex-1">Add to Savings</Label>
                                <Input type="number" placeholder="0" className="border-0 text-right w-1/2 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                            </div>
                        </FormControl>
                        <FormMessage className="mx-3" />
                        </FormItem>
                    )}
                    />
                  </>
                )}

                <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
                    <CollapsibleTrigger className="w-full border-b">
                      <div className="flex items-center h-14 px-3 py-2 text-base w-full">
                          <Label className="flex-1 text-left">Category</Label>
                          <div className="flex items-center gap-2 text-muted-foreground">
                              <span>{selectedCategoryLabel}</span>
                              <ChevronRight className="h-5 w-5 ml-4 transition-transform data-[state=open]:rotate-90" />
                          </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                        <div className="p-2 space-y-1">
                          {categoryOptions.map(cat => (
                              <Button
                                  key={cat.value}
                                  variant="ghost"
                                  className="w-full justify-start gap-2"
                                  onClick={() => {
                                      form.setValue('category', cat.value);
                                      setCategoryOpen(false);
                                  }}
                              >
                                  {cat.label}
                              </Button>
                          ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                
                <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                  <PopoverTrigger asChild>
                     <div className="flex items-center h-14 px-3 py-2 text-base w-full cursor-pointer">
                        <Label className="flex-1 text-left">Target Date</Label>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span>{selectedDate ? format(selectedDate, "PPP") : "Optional"}</span>
                            <ChevronRight className="h-5 w-5 ml-4" />
                        </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.getValues('targetDate')}
                      onSelect={(date) => {
                          form.setValue('targetDate', date);
                          setDatePopoverOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>

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

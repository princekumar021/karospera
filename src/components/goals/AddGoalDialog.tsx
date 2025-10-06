"use client";

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Goal, goalSchema } from "@/lib/setup-schema";
import { useUserData } from '@/hooks/use-user-data';
import { useToast } from '@/hooks/use-toast';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Plus, CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const formSchema = goalSchema.omit({ id: true, currentAmount: true });
type GoalFormValues = Zod.infer<typeof formSchema>;

export function AddGoalDialog({ trigger, goalToEdit }: { trigger?: React.ReactNode, goalToEdit?: Goal }) {
  const [open, setOpen] = useState(false);
  const { addGoal, updateGoal } = useUserData();
  const { toast } = useToast();

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

  useEffect(() => {
    if (goalToEdit) {
      form.reset({
        name: goalToEdit.name,
        targetAmount: goalToEdit.targetAmount,
        targetDate: goalToEdit.targetDate,
        category: goalToEdit.category
      })
    } else {
      form.reset({
        name: '',
        targetAmount: undefined,
        targetDate: undefined,
        category: 'savings',
      })
    }
  }, [goalToEdit, form]);

  const onSubmit = (data: GoalFormValues) => {
    if (goalToEdit) {
      updateGoal({ ...goalToEdit, ...data });
      toast({ title: 'Goal Updated!', description: `Your goal "${data.name}" has been updated.` });
    } else {
      addGoal(data);
      toast({ title: 'Goal Added!', description: `New goal "${data.name}" created.` });
    }
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
              <Plus className="h-6 w-6" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{goalToEdit ? 'Edit Goal' : 'Add New Goal'}</DialogTitle>
            </DialogHeader>

            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input placeholder="e.g. New Laptop" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="targetAmount" render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount</FormLabel>
                <FormControl><Input type="number" placeholder="e.g. 80000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="targetDate" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Target Date (optional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            
            <DialogFooter>
              <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
              <Button type="submit">{goalToEdit ? 'Save Changes' : 'Save Goal'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
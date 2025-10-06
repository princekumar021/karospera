
"use client";

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const currencyOptions = ["INR", "USD", "EUR", "GBP", "JPY"];

const budgetMethods = [
  { key: "balanced", label: "Balanced (auto suggestions)" },
  { key: "50_30_20", label: "50/30/20" },
  { key: "envelope", label: "Envelope (manual categories)" },
  { key: "zero_based", label: "Zero-based" },
];

export function EditProfileSheet({ children, open, onOpenChange }: { children?: React.ReactNode, open: boolean, onOpenChange: (open: boolean) => void }) {
  const { userData, updateUserData } = useUserData();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      monthlyIncome: userData?.monthlyIncome || 0,
      currency: userData?.currency || 'INR',
      budgetMethod: userData?.budgetMethod || 'balanced',
      fullName: userData?.fullName || '',
    }
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        monthlyIncome: userData.monthlyIncome,
        currency: userData.currency,
        budgetMethod: userData.budgetMethod,
        fullName: userData.fullName,
      });
    }
  }, [userData, form, open]);


  const onSubmit = (data: any) => {
    updateUserData({
      ...data,
      monthlyIncome: Number(data.monthlyIncome)
    });
    toast({ title: 'Profile Updated!', description: `Your details has been updated.` });
    onOpenChange(false);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-6" hideClose>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="space-y-4 rounded-lg border bg-background p-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Name</Label>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="monthlyIncome"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Monthly Income</Label>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                        <FormItem>
                          <Label>Currency</Label>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {currencyOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="budgetMethod"
                    render={({ field }) => (
                    <FormItem className="space-y-3">
                        <Label>Budgeting method</Label>
                        <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                        >
                            {budgetMethods.map(method => (
                            <FormItem key={method.key} className="flex items-center space-x-3 space-y-0 rounded-md border p-3">
                                <FormControl>
                                <RadioGroupItem value={method.key} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                {method.label}
                                </FormLabel>
                            </FormItem>
                            ))}
                        </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            
            <SheetFooter className="mt-6 flex-col gap-2">
                <Button type="submit" size="lg">Save Changes</Button>
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

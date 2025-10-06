
"use client";

import * as React from "react";
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
import { Separator } from '../ui/separator';
import { ScrollArea } from "../ui/scroll-area";

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
    if (userData && open) {
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
      <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-6 flex flex-col max-h-[90dvh]" hideClose>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 overflow-y-auto -mx-4 px-4">
            <div className="space-y-6 mt-4">
              <div className="rounded-lg border bg-background">
                  <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                          <FormItem className="flex items-center p-3">
                              <Label className="w-1/3">Name</Label>
                              <FormControl>
                                  <Input className="border-0 text-right focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                              </FormControl>
                          </FormItem>
                      )}
                  />
                  <Separator />
                  <FormField
                      control={form.control}
                      name="monthlyIncome"
                      render={({ field }) => (
                          <FormItem className="flex items-center p-3">
                              <Label className="w-1/3">Monthly Income</Label>
                              <FormControl>
                                  <Input type="number" className="border-0 text-right focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                              </FormControl>
                          </FormItem>
                      )}
                  />
                  <Separator />
                  <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                          <FormItem className="flex items-center p-3">
                            <Label className="w-1/3">Currency</Label>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-0 justify-end focus-visible:ring-0 focus-visible:ring-offset-0">
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
                          </FormItem>
                      )}
                  />
              </div>

              <div className="rounded-lg border bg-background p-4">
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
                              className="space-y-0"
                          >
                              {budgetMethods.map((method, index) => (
                                <React.Fragment key={method.key}>
                                  <FormItem className="flex items-center space-x-3 py-3">
                                      <FormControl>
                                        <RadioGroupItem value={method.key} id={`r-${method.key}`} />
                                      </FormControl>
                                      <Label htmlFor={`r-${method.key}`} className="font-normal flex-1">
                                        {method.label}
                                      </Label>
                                  </FormItem>
                                  {index < budgetMethods.length - 1 && <Separator />}
                                </React.Fragment>
                              ))}
                          </RadioGroup>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
              </div>
            </div>
            <SheetFooter className="mt-6 flex-col gap-2 sticky bottom-0 bg-background pt-4">
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

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
import { PlusCircle, ChevronRight, ScanLine, Utensils, ShoppingCart, Car, Film, Receipt, PiggyBank, MoreHorizontal } from 'lucide-react';
import { useUserData } from '@/hooks/use-user-data';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ReceiptScanner } from './ReceiptScanner';


const expenseFormSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be positive"),
  category: z.string({ required_error: "Category is required" }),
  note: z.string().optional(),
});

type ExpenseForm = z.infer<typeof expenseFormSchema>;

const categories = [
    { value: 'Food', label: 'Food', icon: <Utensils className="h-5 w-5" /> },
    { value: 'Shopping', label: 'Shopping', icon: <ShoppingCart className="h-5 w-5" /> },
    { value: 'Transport', label: 'Transport', icon: <Car className="h-5 w-5" /> },
    { value: 'Entertainment', label: 'Entertainment', icon: <Film className="h-5 w-5" /> },
    { value: 'Bills', label: 'Bills', icon: <Receipt className="h-5 w-5" /> },
    { value: 'Savings', label: 'Savings', icon: <PiggyBank className="h-5 w-5" /> },
    { value: 'Other', label: 'Other', icon: <MoreHorizontal className="h-5 w-5" /> },
];


export function AddExpenseDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const { userData, addTransaction, formatCurrency } = useUserData();
  const { toast } = useToast();

  const form = useForm<ExpenseForm>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      amount: '' as any,
      category: 'Shopping',
      note: "",
    }
  });
  
  const selectedCategory = categories.find(c => c.value === form.watch('category')) || categories[1];

  const onSubmit = (data: ExpenseForm) => {
    addTransaction({
      name: data.category,
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
      form.reset({ category: "Shopping", amount: '' as any, note: "" });
      setShowScanner(false);
    }
  }

  const handleScanSuccess = (scannedData: { amount?: number, note?: string }) => {
    if (scannedData.amount) {
      form.setValue('amount', scannedData.amount, { shouldValidate: true });
    }
    if (scannedData.note) {
      form.setValue('note', scannedData.note, { shouldValidate: true });
    }
    setShowScanner(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-6" hideClose>
        <SheetHeader>
          <SheetTitle className="sr-only">Add Expense</SheetTitle>
        </SheetHeader>
        
        {showScanner ? (
          <ReceiptScanner onScanSuccess={handleScanSuccess} />
        ) : (
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
                  <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
                      <CollapsibleTrigger className="w-full">
                          <div className="flex items-center h-14 px-3 py-2 text-base border-b rounded-none w-full">
                              <span className="flex-1 text-left">Category</span>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                  {selectedCategory.icon}
                                  <span>{selectedCategory.label}</span>
                                  <ChevronRight className="h-5 w-5" />
                              </div>
                          </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                          <div className="p-2 space-y-1">
                          {categories.map(cat => (
                              <Button
                                  key={cat.value}
                                  variant="ghost"
                                  className="w-full justify-start gap-2"
                                  onClick={() => {
                                      form.setValue('category', cat.value);
                                      setCategoryOpen(false);
                                  }}
                              >
                                  {cat.icon}
                                  {cat.label}
                              </Button>
                          ))}
                          </div>
                      </CollapsibleContent>
                  </Collapsible>

                  <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                      <FormItem>
                      <FormControl>
                          <div className="flex items-center h-14 px-3 py-2 text-base rounded-none">
                              <span className="flex-1">Note</span>
                              <Input placeholder="Optional" className="border-0 text-right w-1/2 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                          </div>
                      </FormControl>
                      <FormMessage />
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
        )}
      </SheetContent>
    </Sheet>
  );
}

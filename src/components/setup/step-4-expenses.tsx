
"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { Label } from "../ui/label";
import { useUserData } from "@/hooks/use-user-data";

interface Step4Props {
  nextStep: () => void;
  prevStep: () => void;
}

const frequencyOptions = ["Monthly", "Quarterly", "Yearly"];


function ExpenseItem({ index, remove }: { index: number, remove: (index: number) => void }) {
  const { control } = useFormContext();
  const { userData } = useUserData();
  
  const currency = userData?.currency || "USD";
  const currencySymbols: { [key: string]: string } = { "INR": "₹", "USD": "$", "EUR": "€", "GBP": "£", "JPY": "¥" };
  const symbol = currencySymbols[currency] || '$';

  const { error: nameError } = useFormField({ name: `recurringExpenses.${index}.name`});
  const { error: amountError } = useFormField({ name: `recurringExpenses.${index}.amount`});
  const { error: frequencyError } = useFormField({ name: `recurringExpenses.${index}.frequency`});

  return (
    <div className={cn("relative rounded-lg border bg-card text-card-foreground", (nameError || amountError || frequencyError) && "animate-shake border-destructive")}>
       <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
        onClick={() => remove(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <div className="p-4 space-y-2">
        <FormField
          control={control}
          name={`recurringExpenses.${index}.name`}
          render={({ field }) => (
            <FormItem>
                <FormControl>
                  <Input placeholder="e.g., Rent, Netflix..." {...field} className="border-0 text-base font-semibold p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"/>
                </FormControl>
              <FormMessage className="pt-1" />
            </FormItem>
          )}
        />
        <Separator />
         <FormField
            control={control}
            name={`recurringExpenses.${index}.amount`}
            render={({ field }) => (
            <FormItem className="flex items-center">
                <Label className="flex-1">Amount</Label>
                <FormControl>
                    <div className="relative flex items-center">
                        <span className="absolute left-3 text-muted-foreground">{symbol}</span>
                        <Input type="number" placeholder="0" {...field} value={field.value ?? ''} className="pl-7 bg-transparent border-0 text-right focus-visible:ring-0 focus-visible:ring-offset-0"/>
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <Separator />
        <FormField
            control={control}
            name={`recurringExpenses.${index}.frequency`}
            render={({ field }) => (
            <FormItem className="flex items-center">
                <Label className="flex-1">Frequency</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className="w-auto bg-transparent border-0 focus:ring-0 focus:ring-offset-0 justify-end gap-1">
                          <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {frequencyOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
        />
       </div>
    </div>
  )
}

export default function Step4Expenses({ nextStep, prevStep }: Step4Props) {
  const { control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recurringExpenses",
  });
  
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fields.length > 2) { // or some other condition to avoid scrolling on initial render
      const viewport = scrollViewportRef.current;
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [fields.length]);

  return (
    <StepWrapper
      title="Recurring expenses"
      description="Add bills or subscriptions you pay regularly."
      footer={
        <div className="flex w-full gap-4">
          <Button onClick={prevStep} variant="secondary" className="w-1/3 font-semibold" size="lg">
            Back
          </Button>
          <Button onClick={nextStep} className="w-2/3 font-semibold" size="lg">
            Next
          </Button>
        </div>
      }
    >
      <p className="text-sm text-muted-foreground px-1">Start with top 3: rent, utilities, phone/subscriptions</p>
      <ScrollArea className="h-[240px] -mx-4 px-4">
        <div className="space-y-4 pr-1" ref={scrollViewportRef}>
        {fields.map((item, index) => (
          <ExpenseItem key={item.id} index={index} remove={remove} />
        ))}
        </div>
      </ScrollArea>
       <Button
          type="button"
          variant="outline"
          className="w-full font-semibold"
          onClick={() => append({ name: '', amount: undefined, frequency: 'Monthly' })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
    </StepWrapper>
  );
}

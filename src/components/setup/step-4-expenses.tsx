
"use client";

import { useFormContext, useFieldArray, useFormState } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage, useFormField } from "@/components/ui/form";
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
  const { control, getValues } = useFormContext();
  const { userData } = useUserData();
  
  const currency = userData?.currency || "USD";
  const currencySymbols: { [key: string]: string } = { "INR": "₹", "USD": "$", "EUR": "€", "GBP": "£", "JPY": "¥" };
  const symbol = currencySymbols[currency] || '$';

  const { errors } = useFormState({ control });
  const fieldErrors = errors.recurringExpenses?.[index];

  const handleBlur = () => {
    const nameValue = getValues(`recurringExpenses.${index}.name`);
    const amountValue = getValues(`recurringExpenses.${index}.amount`);
    if (!nameValue && !amountValue) {
      remove(index);
    }
  };

  return (
    <div 
      onBlur={handleBlur} 
      className={cn(
        "relative rounded-lg border bg-card text-card-foreground", 
        (fieldErrors?.name || fieldErrors?.amount) && "animate-shake border-destructive"
      )}
    >
      <div className="space-y-0">
        <FormField
          control={control}
          name={`recurringExpenses.${index}.name`}
          render={({ field }) => (
            <FormItem className="flex items-center p-3 h-11">
              <Label className="flex-1">Name</Label>
                <FormControl>
                  <Input placeholder="e.g., Rent, Netflix..." {...field} className="border-0 text-right h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"/>
                </FormControl>
            </FormItem>
          )}
        />
        <Separator />
         <FormField
            control={control}
            name={`recurringExpenses.${index}.amount`}
            render={({ field }) => (
            <FormItem className="flex items-center p-3 h-11">
                <Label className="flex-1">Amount</Label>
                <FormControl>
                    <div className="relative flex items-center">
                        <span className="absolute left-3 text-muted-foreground">{symbol}</span>
                        <Input type="number" placeholder="0" {...field} value={field.value ?? ''} className="pl-7 bg-transparent border-0 text-right h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"/>
                    </div>
                </FormControl>
            </FormItem>
            )}
        />
        <Separator />
        <FormField
            control={control}
            name={`recurringExpenses.${index}.frequency`}
            render={({ field }) => (
            <FormItem className="flex items-center p-3 h-11">
                <Label className="flex-1">Frequency</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className="w-auto bg-transparent border-0 focus:ring-0 focus:ring-offset-0 justify-end gap-1 h-auto p-0">
                          <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {frequencyOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    </SelectContent>
                </Select>
            </FormItem>
            )}
        />
       </div>
    </div>
  )
}

export default function Step4Expenses({ nextStep, prevStep }: Step4Props) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recurringExpenses",
  });
  
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fields.length > 2) { 
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

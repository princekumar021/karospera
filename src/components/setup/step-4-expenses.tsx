
import { useFormContext, useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";

interface Step4Props {
  nextStep: () => void;
  prevStep: () => void;
}

const frequencyOptions = ["Monthly", "Quarterly", "Yearly"];

export default function Step4Expenses({ nextStep, prevStep }: Step4Props) {
  const { control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recurringExpenses",
  });

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
        <div className="space-y-4 pr-1">
        {fields.map((item, index) => (
          <div key={item.id} className="rounded-lg border p-3 bg-card space-y-2">
            <FormField
              control={control}
              name={`recurringExpenses.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel className="w-1/3">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rent" {...field} className="border-0 text-right focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"/>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={control}
              name={`recurringExpenses.${index}.amount`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel className="w-1/3">Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 12000" {...field} value={field.value ?? ''} className="border-0 text-right focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"/>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={control}
              name={`recurringExpenses.${index}.frequency`}
              render={({ field }) => (
                <FormItem>
                    <div className="flex items-center">
                      <FormLabel className="w-1/3">Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-0 justify-end focus:ring-0 focus:ring-offset-0 w-2/3 bg-transparent">
                            <SelectValue placeholder="Frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {frequencyOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end -mb-4 -mr-2">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => remove(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        </div>
      </ScrollArea>
       <Button
          type="button"
          variant="outline"
          className="w-full font-semibold"
          onClick={() => append({ name: '', amount: 0, frequency: 'Monthly' })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
    </StepWrapper>
  );
}

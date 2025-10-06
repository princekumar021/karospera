import { useFormContext, useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      description="Add bills or subscriptions you pay every month."
      footer={
        <div className="flex w-full gap-4">
          <Button onClick={prevStep} variant="secondary" className="w-1/3 font-semibold">
            Back
          </Button>
          <Button onClick={nextStep} className="w-2/3 font-semibold">
            Next
          </Button>
        </div>
      }
    >
      <p className="text-sm text-muted-foreground">Start with top 3: rent, utilities, phone/subscriptions</p>
      <ScrollArea className="h-[240px] pr-4">
        <div className="space-y-4">
        {fields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 items-start rounded-lg border p-3 bg-card">
            <div className="col-span-12">
              <FormField
                control={control}
                name={`recurringExpenses.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rent" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={control}
                name={`recurringExpenses.${index}.amount`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 12000" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={control}
                name={`recurringExpenses.${index}.frequency`}
                render={({ field }) => (
                  <FormItem>
                     <FormLabel className="sr-only">Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
             <div className="col-span-12 flex justify-end">
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

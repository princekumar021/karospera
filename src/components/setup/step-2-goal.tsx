
"use client"
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
}

const goalOptions = ["Emergency fund", "Buy a phone", "Vacation", "Pay off debt", "Save for college"];

function GoalForm() {
  const { control, setValue, getValues, watch, trigger } = useFormContext();
  const [isCustom, setIsCustom] = useState(getValues("goals.0.name") && !goalOptions.includes(getValues("goals.0.name")));
  
  const currentGoalName = watch("goals.0.name");

  const { error: nameError } = useFormField({ name: 'goals.0.name' });
  const { error: amountError } = useFormField({ name: 'goals.0.targetAmount' });
  const { error: dateError } = useFormField({ name: 'goals.0.targetDate' });

  const handleGoalChange = (value: string) => {
    if (value === "Custom...") {
      setIsCustom(true);
      setValue("goals.0.name", "", { shouldValidate: false });
    } else {
      setIsCustom(false);
      setValue("goals.0.name", value, { shouldValidate: true });
    }
  };

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground", (amountError || dateError) && "animate-shake border-destructive")}>
        {isCustom ? (
           <div className={cn("bg-card text-card-foreground", nameError && "animate-shake")}>
             <div className={cn("floating-label-input relative p-3 border-b", nameError ? "border-destructive" : "border-input")}>
              <FormField
                control={control}
                name="goals.0.name"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder=" " {...field} className="h-10 border-0 bg-transparent p-0 text-base peer" />
                        </FormControl>
                        <Label className="mt-1">Goal</Label>
                    </FormItem>
                )}
              />
              </div>
              <FormField
                control={control}
                name="goals.0.name"
                render={() => <FormMessage className="px-3 pt-1 pb-2"/>}
              />
          </div>
        ) : (
          <FormField
            control={control}
            name="goals.0.name"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center p-3 border-b">
                  <FormLabel className="w-1/3">Goal</FormLabel>
                  <Select onValueChange={handleGoalChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-0 justify-end focus:ring-0 focus:ring-offset-0 w-2/3 bg-transparent">
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {goalOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                      <SelectItem value="Custom...">Custom...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <FormMessage className="px-3" />
              </FormItem>
            )}
          />
        )}
        <Separator />
        <FormField
          control={control}
          name="goals.0.targetAmount"
          render={({ field }) => (
            <>
              <FormItem>
                <div className="flex items-center p-3">
                  <FormLabel className="w-1/3">Target</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Optional Amount"
                      {...field}
                      className="border-0 text-right focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                      value={field.value ?? ""}
                      onChange={e => {
                        const value = e.target.value;
                        field.onChange(value === '' ? undefined : parseFloat(value));
                      }}
                    />
                  </FormControl>
                </div>
              </FormItem>
              <FormMessage className="px-3 pb-2" />
            </>
          )}
        />
        <Separator />
         <FormField
          control={control}
          name="goals.0.targetDate"
          render={({ field }) => (
            <>
              <FormItem>
                <div className="flex items-center p-3">
                  <FormLabel className="w-1/3">Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "w-2/3 justify-end text-right font-normal p-0 h-auto hover:bg-transparent",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Optional Date</span>
                          )}
                          <ChevronRight className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormItem>
              <FormMessage className="px-3 pb-2" />
            </>
          )}
        />
      </div>
  )
}

export default function Step2Goal({ nextStep, prevStep }: Step2Props) {
  
  return (
    <StepWrapper
      title="Your main goal"
      description="Pick or write a financial goal to focus on."
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
      <GoalForm />
    </StepWrapper>
  );
}

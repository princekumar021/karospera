"use client"
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
}

const goalOptions = ["Emergency fund", "Buy a phone", "Vacation", "Pay off debt", "Save for college", "Custom..."];

export default function Step2Goal({ nextStep, prevStep }: Step2Props) {
  const { control, setValue, getValues } = useFormContext();
  const [isCustom, setIsCustom] = useState(getValues("goals.0.name") && !goalOptions.includes(getValues("goals.0.name")));
  const [goalName, setGoalName] = useState(getValues("goals.0.name") || "");

  const handleGoalChange = (value: string) => {
    if (value === "Custom...") {
      setIsCustom(true);
      setGoalName("");
      setValue("goals.0.name", "", { shouldValidate: true });
    } else {
      setIsCustom(false);
      setGoalName(value);
      setValue("goals.0.name", value, { shouldValidate: true });
    }
  };

  return (
    <StepWrapper
      title="Your main goal"
      description="Pick or write a financial goal to focus on."
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
      <FormField
        control={control}
        name="goals.0.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Goal</FormLabel>
            {isCustom ? (
               <FormControl>
                <Input placeholder="Type your own goal" {...field} />
              </FormControl>
            ) : (
              <Select onValueChange={handleGoalChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {goalOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="goals.0.targetAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target amount (optional)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 50000"
                {...field}
                value={field.value ?? ""}
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : parseFloat(value));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="goals.0.targetDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Target date (optional)</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </StepWrapper>
  );
}

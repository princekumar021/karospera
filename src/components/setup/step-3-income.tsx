import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
}

const currencyOptions = ["INR", "USD", "EUR", "GBP", "JPY"];
const payCycleOptions = ["Monthly", "Bi-weekly", "Weekly", "Custom"];

export default function Step3Income({ nextStep, prevStep }: Step3Props) {
  const { control } = useFormContext();

  return (
    <StepWrapper
      title="Income & currency"
      description="So we can suggest budgets that actually work."
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
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Currency</FormLabel>
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
        control={control}
        name="monthlyIncome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly take-home income</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 45000" {...field} value={field.value ?? ''}
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
        name="payCycle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pay cycle</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select pay cycle" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {payCycleOptions.map((option) => (
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
    </StepWrapper>
  );
}

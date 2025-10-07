
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";

interface Step5Props {
  nextStep: () => void;
  prevStep: () => void;
}

const budgetMethods = [
  { key: "balanced", label: "Balanced (auto suggestions)" },
  { key: "50_30_20", label: "50/30/20" },
  { key: "envelope", label: "Envelope (manual categories)" },
  { key: "zero_based", label: "Zero-based" },
];

export default function Step5Preferences({ nextStep, prevStep }: Step5Props) {
  const { control } = useFormContext();

  return (
    <StepWrapper
      title="Budget style & preferences"
      description="Choose how you'd like budgets suggested."
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
      <FormField
        control={control}
        name="budgetMethod"
        render={({ field }) => (
          <FormItem className="space-y-3 rounded-xl border bg-card p-4">
            <FormLabel className="text-lg">Budgeting method</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-0"
              >
                {budgetMethods.map((method, index) => (
                   <React.Fragment key={method.key}>
                      <FormItem className="flex items-center space-x-3 py-4">
                          <FormControl>
                            <RadioGroupItem value={method.key} id={`r-${method.key}`} />
                          </FormControl>
                          <Label htmlFor={`r-${method.key}`} className="font-normal flex-1 text-base">
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

      <div className="rounded-xl border bg-card">
        <FormField
          control={control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 h-20">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Reminders & notifications</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={control}
          name="biometrics"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 h-20">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enable biometric unlock</FormLabel>
                 <FormDescription className="text-sm">
                  Optional
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={control}
          name="bankSyncOptIn"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 h-20">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enable bank sync</FormLabel>
                 <FormDescription className="text-sm">
                  Optional & secure.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </StepWrapper>
  );
}

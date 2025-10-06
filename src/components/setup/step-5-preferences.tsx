import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
        name="budgetMethod"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Budgeting method</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {budgetMethods.map(method => (
                  <FormItem key={method.key} className="flex items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <RadioGroupItem value={method.key} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {method.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormField
          control={control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Reminders & notifications</FormLabel>
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
        <FormField
          control={control}
          name="biometrics"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Enable biometric unlock (optional)</FormLabel>
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
        <FormField
          control={control}
          name="bankSyncOptIn"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Enable bank sync (optional)</FormLabel>
                 <FormDescription className="text-xs">
                  No credentials stored; uses a secure third-party.
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

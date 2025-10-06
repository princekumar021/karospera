import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface Step1Props {
  nextStep: () => void;
}

export default function Step1Name({ nextStep }: Step1Props) {
  const { control } = useFormContext();

  return (
    <StepWrapper
      title="Your name"
      description="What should we call you in the app?"
      footer={
        <Button onClick={nextStep} className="w-full font-semibold">
          Next
        </Button>
      }
    >
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Priya" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Alert className="bg-card border-border/70">
        <Info className="h-4 w-4" />
        <AlertTitle className="font-semibold">Private & Secure</AlertTitle>
        <AlertDescription className="text-xs">
          We don't require an email to sign up. Your financial data is stored securely on your device and is never shared without your permission.
        </AlertDescription>
      </Alert>
    </StepWrapper>
  );
}

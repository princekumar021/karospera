import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Separator } from "../ui/separator";

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
        <Button onClick={nextStep} className="w-full font-semibold" size="lg">
          Next
        </Button>
      }
    >
      <div className="rounded-lg border bg-card">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex items-center p-3">
              <FormLabel className="w-1/4">Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Priya" {...field} className="border-0 text-right focus-visible:ring-0 focus-visible:ring-offset-0"/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage className="px-3 pb-2" />
      </div>

      <Alert className="bg-card border-border/70 text-card-foreground">
        <Info className="h-4 w-4 !text-card-foreground" />
        <AlertTitle className="font-semibold">Private & Secure</AlertTitle>
        <AlertDescription className="text-xs">
          Your financial data is stored securely on your device.
        </AlertDescription>
      </Alert>
    </StepWrapper>
  );
}

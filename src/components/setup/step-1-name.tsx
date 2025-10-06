
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
      <div className="rounded-lg border bg-card text-card-foreground">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex items-center px-4 py-2">
              <FormLabel className="flex-1">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className="border-0 text-right bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"/>
              </FormControl>
              <FormMessage className="pl-2" />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-start gap-3 text-card-foreground p-1">
        <Info className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground">Private & Secure</h3>
          <p className="text-xs text-muted-foreground">
            Your financial data is stored securely on your device.
          </p>
        </div>
      </div>
    </StepWrapper>
  );
}

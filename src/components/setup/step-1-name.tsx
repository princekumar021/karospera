
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step1Props {
  nextStep: () => void;
}

function NameInput() {
  const { control } = useFormContext();
  const { error } = useFormField();
  
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground", error && "animate-shake border-destructive")}>
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div className="floating-label-input px-4 py-1">
                <FormControl>
                  <Input placeholder=" " {...field} className="h-10 border-0 bg-transparent p-0 text-lg" />
                </FormControl>
                <FormLabel>Name</FormLabel>
              </div>
              <FormMessage className="px-4 pb-2" />
            </FormItem>
          )}
        />
      </div>
  )
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
      <FormField
        control={control}
        name="fullName"
        render={() => <NameInput />}
      />

       <div className="flex items-start gap-3 p-1">
        <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
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

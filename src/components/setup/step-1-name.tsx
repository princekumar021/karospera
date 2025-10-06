
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

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
            <FormItem>
              <div className="floating-label-input relative flex items-center px-4 py-3">
                <FormControl>
                  <Input placeholder=" " {...field} className="h-10 border-0 bg-transparent p-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"/>
                </FormControl>
                 <FormLabel
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 origin-[0] transform transition-all duration-300 ease-in-out",
                    field.value ? "-top-2 scale-75 text-primary" : "text-muted-foreground"
                  )}
                >
                  Your name
                </FormLabel>
              </div>
              <FormMessage className="px-4 pb-2" />
            </FormItem>
          )}
        />
      </div>

       <div className="flex items-start gap-3 text-card-foreground p-1">
        <Info className="h-5 w-5 text-muted-foreground flex-shrink-0" />
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


"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

interface Step1Props {
  nextStep: () => void;
}

function NameInput() {
  const { control } = useFormContext();
  const { error } = useFormField();
  
  return (
    <div className={cn("floating-label-input", error && "animate-shake")}>
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder=" " {...field} />
              </FormControl>
              <Label>Name</Label>
              <FormMessage />
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

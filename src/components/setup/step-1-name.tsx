
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
    <div className={cn("rounded-xl bg-card text-card-foreground border", error && "animate-shake border-destructive")}>
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <div className="floating-label-input">
              <FormControl>
                <Input placeholder=" " {...field} className="h-16 border-0 bg-transparent text-xl px-4 peer" />
              </FormControl>
              <Label>Name</Label>
            </div>
            <FormMessage className={cn("px-4 pb-3 text-sm", !error && "hidden")}/>
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
        <div className="w-full space-y-4">
          <Button onClick={nextStep} className="w-full font-semibold" size="lg">
            Next
          </Button>
          <div className="flex items-start justify-center gap-3 p-1">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-sm">Private & Secure</h3>
              <p className="text-xs text-muted-foreground">
                Your financial data is stored securely on your device.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <FormField
        control={control}
        name="fullName"
        render={() => <NameInput />}
      />
    </StepWrapper>
  );
}

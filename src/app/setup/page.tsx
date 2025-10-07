
"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setupSchema, type SetupFormData } from "@/lib/setup-schema";
import { useRouter } from 'next/navigation';

import { AppLogo } from "@/components/icons";
import { Stepper } from "@/components/setup/stepper";
import Step1Name from "@/components/setup/step-1-name";
import Step2Goal from "@/components/setup/step-2-goal";
import Step3Income from "@/components/setup/step-3-income";
import Step4Expenses from "@/components/setup/step-4-expenses";
import Step5Preferences from "@/components/setup/step-5-preferences";
import Step6Preview from "@/components/setup/step-6-preview";
import { Progress } from "@/components/ui/progress";

const totalSteps = 6;

const stepFields: (keyof SetupFormData | `goals.${number}.${"name" | "targetAmount" | "targetDate"}`)[] = [
  ["fullName"], // Step 1
  ["goals.0.name", "goals.0.targetAmount", "goals.0.targetDate"], // Step 2
  ["currency", "monthlyIncome", "payCycle"], // Step 3
  ["recurringExpenses"], // Step 4
  ["budgetMethod", "notifications", "biometrics", "bankSyncOptIn"], // Step 5
  [], // Step 6 is preview, no fields
];

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const methods = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      fullName: "",
      goals: [{ id: "initial", name: "", currentAmount: 0, targetAmount: 0 }],
      currency: "INR",
      recurringExpenses: [],
      budgetMethod: "balanced",
      notifications: true,
      biometrics: false,
      bankSyncOptIn: false,
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    // Clear previous errors before validating the new step
    methods.clearErrors();
    const fieldsToValidate = stepFields[currentStep - 1];
    const isValid = await methods.trigger(fieldsToValidate as any);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step < currentStep) {
      setCurrentStep(step);
    }
  };
  
  const onSubmit = (data: SetupFormData) => {
    console.log("Setup complete:", data);
    try {
       // Filter out empty initial goal if it hasn't been filled
      const finalData = {
        ...data,
        goals: data.goals.filter(g => g.name && g.targetAmount > 0)
      }
      localStorage.setItem('pocketplan-userdata', JSON.stringify(finalData));
      router.push('/dashboard');
    } catch (error) {
      console.error("Could not save user data to localStorage", error);
      // maybe show a toast to the user
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Name nextStep={nextStep} />;
      case 2:
        return <Step2Goal nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3Income nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4Expenses nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Step5Preferences nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <Step6Preview goToStep={goToStep} />;
      default:
        return <Step1Name nextStep={nextStep} />;
    }
  };

  const microcopy = [
    "You can change this later in Settings.",
    "Goal helps prioritize budgets and suggestions. You can have multiple goals later.",
    "This is used only to suggest budgets — you can change it anytime.",
    "You can import bank transactions later instead of manual entry.",
    "Pick one — we'll use it to create starter budgets you can edit.",
    "Everything is editable later in Settings → Profile & Goals.",
  ];

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center bg-background p-4 md:p-8 min-h-dvh">
        <div className="flex flex-col w-full max-w-md">
          <div className="mt-8 md:mt-20">
            <div className="mb-8 flex flex-col items-center gap-4">
              <AppLogo className="h-10 w-10" />
              <Progress value={(currentStep / totalSteps) * 100} className="h-2 w-full" />
            </div>

            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <div
                key={currentStep}
                className="animate-in fade-in-0 slide-in-from-right-5 duration-500"
              >
                {renderStep()}
              </div>
            </form>
          </div>
          <p className="mt-4 h-16 flex-shrink-0 pt-4 text-center text-sm text-muted-foreground">
              {microcopy[currentStep - 1]}
          </p>
        </div>
      </div>
    </FormProvider>
  );
}

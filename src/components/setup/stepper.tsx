import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${currentStep} of ${totalSteps}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div
            key={step}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all
              ${
                isActive
                  ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30"
                  : isCompleted
                  ? "bg-accent/80 text-accent-foreground"
                  : "bg-secondary text-secondary-foreground"
              }
            `}
          >
            {isCompleted ? (
              <Check className="h-5 w-5" />
            ) : (
              step
            )}
          </div>
        );
      })}
    </div>
  );
}

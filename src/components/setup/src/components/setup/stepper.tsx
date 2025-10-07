import { Check } from "lucide-react";
import { Progress } from "../ui/progress";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  const progressValue = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full px-4">
        <Progress value={progressValue} className="h-2"/>
    </div>
  );
}

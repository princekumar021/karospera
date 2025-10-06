import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface StepWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function StepWrapper({ title, description, children, footer }: StepWrapperProps) {
  return (
    <div className="bg-transparent">
      <div className="text-center mb-6">
        <h1 className="font-headline text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-4">
        {children}
      </div>
      <div className="mt-6">
        {footer}
      </div>
    </div>
  );
}

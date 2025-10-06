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
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
      <CardFooter>
        {footer}
      </CardFooter>
    </Card>
  );
}

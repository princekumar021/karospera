
"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { type SetupFormData, type RecurringExpense, type Goal } from "@/lib/setup-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Banknote, CalendarClock, Edit, User } from "lucide-react";
import { useRouter } from 'next/navigation';

interface Step6Props {
  goToStep: (step: number) => void;
}

export default function Step6Preview({ goToStep }: Step6Props) {
  const { getValues } = useFormContext<SetupFormData>();
  const router = useRouter();
  const values = getValues();
  const { fullName, monthlyIncome, goals, recurringExpenses, currency } = values;
  const primaryGoal = goals && goals.length > 0 ? goals[0] : null;

  const getMonthlyAmount = (expense: RecurringExpense): number => {
    const amount = Number(expense.amount) || 0;
    switch (expense.frequency) {
      case 'Yearly':
        return amount / 12;
      case 'Quarterly':
        return amount / 3;
      case 'Monthly':
      default:
        return amount;
    }
  };

  const totalMonthlyRecurring = recurringExpenses.reduce((sum, exp) => sum + getMonthlyAmount(exp), 0);
  const remainingThisMonth = (monthlyIncome || 0) - totalMonthlyRecurring;
  
  const getMonthsToGoal = () => {
    if (!primaryGoal || !primaryGoal.targetDate || !primaryGoal.targetAmount || primaryGoal.targetAmount <= 0) return null;
    const now = new Date();
    // Ensure we don't have months in the past.
    if (primaryGoal.targetDate < now) return 1;
    let months = (primaryGoal.targetDate.getFullYear() - now.getFullYear()) * 12;
    months -= now.getMonth();
    months += primaryGoal.targetDate.getMonth();
    return months <= 0 ? 1 : months;
  };

  const monthsToGoal = getMonthsToGoal();
  // Suggest saving 10% of remaining income towards the goal if no date is set.
  const suggestedMonthlySavings = remainingThisMonth > 0 ? remainingThisMonth * 0.1 : 0;
  
  const monthlySavingsNeeded = monthsToGoal && primaryGoal?.targetAmount ? primaryGoal.targetAmount / monthsToGoal : suggestedMonthlySavings;
  
  const savingsForGoal = Math.min(monthlySavingsNeeded, remainingThisMonth > 0 ? remainingThisMonth : 0);

  const goalProgress = (primaryGoal?.targetAmount && primaryGoal.targetAmount > 0) ? (savingsForGoal / primaryGoal.targetAmount) * 100 : 0;
  
  const nextBill = [...recurringExpenses]
    .filter(e => e.dueDay)
    .sort((a,b) => (a.dueDay || 32) - (b.dueDay || 32))
    .find(e => (e.dueDay || 0) >= new Date().getDate()) || recurringExpenses.find(e => e.dueDay);

  const formatCurrencyLocal = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  }

  return (
    <StepWrapper
      title="You're all set!"
      description="Here's a preview of your dashboard."
      footer={
        <div className="flex w-full flex-col gap-2">
           <Button type="submit" className="w-full font-semibold" size="lg">
            Start using karospera
          </Button>
          <Button onClick={() => goToStep(1)} variant="ghost" className="w-full font-semibold">
            <Edit className="mr-2 h-4 w-4" />
            Edit inputs
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Card className="bg-card shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-full">
              <User className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold truncate">Hello, {fullName || 'User'}!</CardTitle>
              <p className="text-sm text-muted-foreground">Ready to take control?</p>
            </div>
          </CardHeader>
          <CardContent>
             <p className="text-3xl font-bold tracking-tight truncate">{formatCurrencyLocal(remainingThisMonth)}</p>
             <p className="text-xs text-muted-foreground">Available to spend this month</p>
          </CardContent>
        </Card>

        {primaryGoal && primaryGoal.name && (
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold truncate">{primaryGoal?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate font-medium">{formatCurrencyLocal(savingsForGoal > 0 ? savingsForGoal : 0)}</span>
                <span className="text-muted-foreground truncate">{formatCurrencyLocal(primaryGoal?.targetAmount || 0)}</span>
              </div>
              <Progress value={goalProgress} />
              <p className="text-xs text-muted-foreground mt-1">Suggested monthly saving</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">{formatCurrencyLocal(totalMonthlyRecurring)}</div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Bill Due</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold truncate">{nextBill ? `${formatCurrencyLocal(nextBill.amount)}` : 'N/A'}</div>
            </CardContent>
          </Card>
        </div>

      </div>
    </StepWrapper>
  );
}

"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { type SetupFormData, type RecurringExpense } from "@/lib/setup-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Banknote, CalendarClock, Edit } from "lucide-react";
import { useRouter } from 'next/navigation';

interface Step6Props {
  goToStep: (step: number) => void;
}

export default function Step6Preview({ goToStep }: Step6Props) {
  const { getValues } = useFormContext<SetupFormData>();
  const router = useRouter();
  const values = getValues();
  const { fullName, monthlyIncome, goal, goalTargetAmount, goalTargetDate, recurringExpenses, currency } = values;

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
    if (!goalTargetDate || !goalTargetAmount || goalTargetAmount <= 0) return null;
    const now = new Date();
    // Ensure we don't have months in the past.
    if (goalTargetDate < now) return 1;
    let months = (goalTargetDate.getFullYear() - now.getFullYear()) * 12;
    months -= now.getMonth();
    months += goalTargetDate.getMonth();
    return months <= 0 ? 1 : months;
  };

  const monthsToGoal = getMonthsToGoal();
  // Suggest saving 10% of remaining income towards the goal if no date is set.
  const suggestedMonthlySavings = remainingThisMonth > 0 ? remainingThisMonth * 0.1 : 0;
  
  const monthlySavingsNeeded = monthsToGoal && goalTargetAmount ? goalTargetAmount / monthsToGoal : suggestedMonthlySavings;
  
  const savingsForGoal = Math.min(monthlySavingsNeeded, remainingThisMonth > 0 ? remainingThisMonth : 0);

  const goalProgress = (goalTargetAmount && goalTargetAmount > 0) ? (savingsForGoal / goalTargetAmount) * 100 : 0;
  
  const nextBill = [...recurringExpenses]
    .filter(e => e.dueDay)
    .sort((a,b) => (a.dueDay || 32) - (b.dueDay || 32))
    .find(e => (e.dueDay || 0) >= new Date().getDate()) || recurringExpenses.find(e => e.dueDay);

  const formatCurrencyLocal = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  }

  return (
    <StepWrapper
      title="Preview & finish"
      description="Quick preview of your dashboard with sample data."
      footer={
        <div className="flex w-full flex-col gap-2">
           <Button type="submit" className="w-full font-semibold">
            Start using PocketPlan
          </Button>
          <Button onClick={() => goToStep(1)} variant="outline" className="w-full font-semibold">
            <Edit className="mr-2 h-4 w-4" />
            Edit inputs
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground truncate">Hello, {fullName || 'User'}!</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-2xl font-bold truncate">{formatCurrencyLocal(remainingThisMonth)}</p>
             <p className="text-xs text-muted-foreground">Remaining this month</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
             <CardTitle className="text-base font-semibold truncate">{goal || 'Your Goal'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-1">
              <span className="truncate">{formatCurrencyLocal(savingsForGoal > 0 ? savingsForGoal : 0)}</span>
              <span className="text-muted-foreground truncate">{formatCurrencyLocal(goalTargetAmount || 0)}</span>
            </div>
            <Progress value={goalProgress} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
              <Banknote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">{formatCurrencyLocal(totalMonthlyRecurring)}</div>
               <p className="text-xs text-muted-foreground truncate">from recurring expenses</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Next Bill</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold truncate">{nextBill ? `${formatCurrencyLocal(nextBill.amount)}` : 'N/A'}</div>
              <p className="text-xs text-muted-foreground truncate">{nextBill ? nextBill.name : 'No bills added'}</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </StepWrapper>
  );
}

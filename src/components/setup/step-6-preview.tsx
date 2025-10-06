import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import StepWrapper from "./step-wrapper";
import { type SetupFormData } from "@/lib/setup-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Banknote, CalendarClock, Edit } from "lucide-react";

interface Step6Props {
  goToStep: (step: number) => void;
}

export default function Step6Preview({ goToStep }: Step6Props) {
  const { getValues, handleSubmit } = useFormContext<SetupFormData>();
  const values = getValues();
  const { fullName, monthlyIncome, goal, goalTargetAmount, recurringExpenses, currency } = values;

  const totalRecurring = recurringExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
  const remainingThisMonth = (monthlyIncome || 0) - totalRecurring;
  
  // Assuming 'monthlyIncome' is what's available to save towards the goal.
  // A more complex calculation might be needed depending on the app's logic,
  // but for a preview, available income is a reasonable proxy for savings potential.
  const savingsForGoal = remainingThisMonth > 0 ? remainingThisMonth : 0;
  const goalProgress = goalTargetAmount ? (savingsForGoal / goalTargetAmount) * 100 : 0;

  const nextBill = recurringExpenses.length > 0 ? recurringExpenses[0] : null;

  const onFinish = (data: SetupFormData) => {
    console.log("Setup complete:", data);
    alert("Setup complete! Check the console for your data.");
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  }

  return (
    <StepWrapper
      title="Preview & finish"
      description="Quick preview of your dashboard with sample data."
      footer={
        <div className="flex w-full flex-col gap-2">
           <Button type="submit" onClick={handleSubmit(onFinish)} className="w-full font-semibold">
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Hello, {fullName || 'User'}!</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-2xl font-bold">{formatCurrency(remainingThisMonth)}</p>
             <p className="text-xs text-muted-foreground">Remaining this month</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
             <CardTitle className="text-base font-semibold">{goal || 'Your Goal'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-1">
              <span>{formatCurrency(savingsForGoal)}</span>
              <span className="text-muted-foreground">{formatCurrency(goalTargetAmount || 0)}</span>
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
              <div className="text-2xl font-bold">{formatCurrency(totalRecurring)}</div>
               <p className="text-xs text-muted-foreground">from recurring expenses</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Next Bill</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">{nextBill ? `${formatCurrency(nextBill.amount)}` : 'N/A'}</div>
              <p className="text-xs text-muted-foreground truncate">{nextBill ? nextBill.name : 'No bills added'}</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </StepWrapper>
  );
}

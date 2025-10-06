import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const goals = [
  {
    name: 'Buy new Laptop',
    progress: 75,
    target: '₹1,00,000',
  },
  {
    name: 'Vacation to Goa',
    progress: 40,
    target: '₹50,000',
  },
];

export function GoalsSection() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Your Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {goals.map((goal, index) => (
            <li key={index}>
              <div className="mb-1 flex justify-between">
                <p className="font-semibold">{goal.name}</p>
                <p className="text-sm text-muted-foreground">
                  {goal.target}
                </p>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </li>
          ))}
        </ul>
        <Button variant="link" className="mt-4 w-full">
          Add New Goal
        </Button>
      </CardContent>
    </Card>
  );
}

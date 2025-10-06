import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function OverviewCard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Available Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹22,500</p>
          <p className="text-xs text-green-400">+5.2% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={75} className="h-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            Saving for New Laptop
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

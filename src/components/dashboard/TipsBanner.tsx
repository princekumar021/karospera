import { Button } from '@/components/ui/button';

export function TipsBanner() {
  return (
    <div className="rounded-lg bg-gradient-to-r from-primary/80 to-primary/60 p-4 text-primary-foreground">
      <h3 className="font-bold">💡 Smart Tip</h3>
      <p className="text-sm">
        You’ve spent 60% of your budget this month. Plan early to stay under
        your limit!
      </p>
      <Button variant="link" className="p-0 text-primary-foreground">
        View Budget
      </Button>
    </div>
  );
}

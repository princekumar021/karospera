
import { BottomNavigation } from '@/components/dashboard';
import { TransactionsHeader, TransactionList } from '@/components/transactions';

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TransactionsHeader />
      <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-32">
        <TransactionList />
      </main>
      <BottomNavigation />
    </div>
  );
}

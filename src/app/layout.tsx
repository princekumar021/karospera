import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { UserDataProvider } from '@/hooks/use-user-data';
import { ThemeApplicator } from '@/components/ThemeApplicator';

export const metadata: Metadata = {
  title: 'PocketPlan: Control your money',
  description: 'One dashboard for budgets, goals and everyday spending. Simple, fast, private.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <UserDataProvider>
          <ThemeApplicator />
          {children}
        </UserDataProvider>
        <Toaster />
      </body>
    </html>
  );
}

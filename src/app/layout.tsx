import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { UserDataProvider } from '@/hooks/use-user-data';
import { ThemeApplicator } from '@/components/ThemeApplicator';
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

export const metadata: Metadata = {
  title: 'karospera: Control your money',
  description: 'One dashboard for budgets, goals and everyday spending. Simple, fast, private.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚪</text></svg>" />
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

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, PieChart, ShieldCheck, MoveRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PocketPlanLogo } from "@/components/icons";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-illustration-transparent');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PocketPlanLogo className="h-8 w-8" />
          <span className="text-xl font-semibold font-headline">PocketPlan</span>
        </div>
      </header>
      
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight leading-tight max-w-3xl mx-auto">
            Clarity for your cashflow.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            The simple, private way to manage your budgets, track goals, and understand your spending. No email required to start.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="font-semibold text-lg py-6 px-8 group">
              <Link href="/setup">
                Get Started for Free
                <MoveRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
        
        <section className="container mx-auto px-4">
            <div className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[500px]">
                {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    priority
                    className="object-contain"
                    data-ai-hint={heroImage.imageHint}
                />
                )}
            </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-32">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <PieChart className="h-10 w-10 mb-4 mx-auto text-primary" />
              <h3 className="font-headline text-xl font-semibold">Smart Budgets</h3>
              <p className="text-muted-foreground mt-2">Get automatic budget suggestions based on your income and goals.</p>
            </div>
            <div>
              <Target className="h-10 w-10 mb-4 mx-auto text-primary" />
              <h3 className="font-headline text-xl font-semibold">Goal Tracking</h3>
              <p className="text-muted-foreground mt-2">Set, track, and achieve your financial goals, big or small.</p>
            </div>
            <div>
              <ShieldCheck className="h-10 w-10 mb-4 mx-auto text-primary" />
              <h3 className="font-headline text-xl font-semibold">Private by Default</h3>
              <p className="text-muted-foreground mt-2">Your data stays on your device. No accounts, no clouds, no tracking.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p className="text-sm">&copy; {new Date().getFullYear()} PocketPlan. All rights reserved.</p>
      </footer>
    </div>
  );
}

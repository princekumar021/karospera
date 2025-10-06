import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, PieChart, ShieldCheck } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PocketPlanLogo } from "@/components/icons";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-illustration');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 pt-6 flex items-center gap-2">
        <PocketPlanLogo className="h-8 w-8" />
        <span className="text-xl font-semibold font-headline">PocketPlan</span>
      </header>
      
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight leading-tight max-w-2xl mx-auto">
            Take control of your money — simple, fast, private.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            One dashboard for budgets, goals and everyday spending. No email required.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-semibold text-lg py-6 px-8">
              <Link href="/setup">Get Started</Link>
            </Button>
            <Button variant="secondary" size="lg" className="font-semibold text-lg py-6 px-8" disabled>
              Try Demo
            </Button>
          </div>
          <div className="mt-12 relative w-full max-w-xs mx-auto h-[400px] md:h-[500px] md:max-w-sm">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                priority
                className="object-cover rounded-2xl shadow-2xl shadow-primary/10"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-background bg-foreground/80 px-2 py-1 rounded-md">
              Sync later — manual inputs work perfectly.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Target className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="font-headline">Set goals & track progress</CardTitle>
                <CardDescription>Save for things that matter.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <PieChart className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="font-headline">Auto budgets</CardTitle>
                <CardDescription>Smart suggestions based on your income.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <ShieldCheck className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="font-headline">Private by default</CardTitle>
                <CardDescription>Your data stays with you unless you opt-in.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
      
      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <div className="flex justify-center gap-6 text-sm">
          <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Learn More</Link>
        </div>
      </footer>
    </div>
  );
}

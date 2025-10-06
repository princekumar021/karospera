
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, PieChart, ShieldCheck, Target } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AppLogo } from "@/components/icons";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-portrait');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <div className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-card text-card-foreground rounded-3xl p-6 md:p-10 shadow-sm">
          
          <header className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <AppLogo className="h-7 w-7" />
              <span className="text-lg font-semibold font-headline">karospera</span>
            </div>
            <Button variant="ghost" className="rounded-full font-semibold">
              Get Started
            </Button>
          </header>

          <main>
            <section className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                  Clarity for your cashflow.
                </h1>
                <p className="text-muted-foreground text-lg">
                  The simple, private way to manage your budgets, track goals, and understand your spending.
                </p>
                <Button asChild size="lg" className="rounded-full font-semibold text-base py-6 px-7 group mt-4">
                  <Link href="/setup">
                    Get Started for Free
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-80 md:h-96 w-full flex items-center justify-center">
                
                  <Image
                    src="/hero-image.png"
                    alt="Brain made of money"
                    fill
                    priority
                    className="object-cover rounded-2xl"
                  />
                
              </div>
            </section>

            <section className="my-16 md:my-24">
                <h2 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-8">Key Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <PieChart className="h-7 w-7 text-primary/80"/>
                        <p className="font-semibold text-sm">Smart Budgets</p>
                    </div>
                     <div className="flex flex-col items-center gap-2">
                        <Target className="h-7 w-7 text-primary/80"/>
                        <p className="font-semibold text-sm">Goal Tracking</p>
                    </div>
                     <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="h-7 w-7 text-primary/80"/>
                        <p className="font-semibold text-sm">Private by Default</p>
                    </div>
                     <div className="flex flex-col items-center gap-2">
                        <CheckCircle className="h-7 w-7 text-primary/80"/>
                        <p className="font-semibold text-sm">No Accounts Needed</p>
                    </div>
                </div>
            </section>
            
            <section className="grid md:grid-cols-2 gap-10 items-center my-16 md:my-24">
                <div className="space-y-4 order-2 md:order-1">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Crafting Meaningful Financial Experiences</h2>
                    <p className="text-muted-foreground">With a keen eye for aesthetics and a deep understanding of user behavior, we design tools that not only look great but also resonate with your financial journey. Our focus is on seamless usability, empowering you with clarity and control.</p>
                </div>
                 <div className="relative h-72 w-full order-1 md:order-2">
                    <Image
                        src="/second-image.png"
                        alt="Healthcare financial burden"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>
            </section>
          </main>
          
          <footer className="text-center text-muted-foreground/60 text-xs mt-12">
            <p>&copy; {new Date().getFullYear()} karospera. All rights reserved.</p>
          </footer>

        </div>
      </div>
    </div>
  );
}

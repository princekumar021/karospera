
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Target, TrendingUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const achievements = [
  { icon: <Award className="h-6 w-6 text-yellow-500" />, text: "Saved ₹10,000 this month!" },
  { icon: <Target className="h-6 w-6 text-blue-500" />, text: "Goal 1 halfway there 🎯" },
  { icon: <TrendingUp className="h-6 w-6 text-green-500" />, text: "3 months of consistent tracking!" },
  { icon: <Award className="h-6 w-6 text-purple-500" />, text: "Budget champion!" },
];

export function Achievements() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
         <Carousel opts={{
            align: "start",
            loop: true,
         }}>
            <CarouselContent>
                {achievements.map((item, index) => (
                    <CarouselItem key={index} className="basis-1/2">
                         <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary h-32 text-center">
                            {item.icon}
                            <p className="text-sm mt-2 text-foreground">{item.text}</p>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
         </Carousel>
      </CardContent>
    </Card>
  );
}

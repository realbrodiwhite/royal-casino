
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative", className)}
    >
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
          
          <div className="relative mb-2 sm:mb-3 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 border-2 border-primary rounded-full bg-background/50 shadow-lg">
              <Crown className="h-8 w-8 sm:h-10 text-primary" aria-hidden="true" />
            </div>
          </div>

          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-headline text-primary"
          >
            Welcome to <span className="text-foreground">Royal Casino</span>
          </h1>

          <p
            className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-xs sm:max-w-sm md:max-w-md mx-auto"
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3"
          >
            <Link href="/signup" passHref>
              <Button size="sm" variant="default" className="w-full sm:w-auto font-semibold px-5 py-2 text-sm sm:text-base">
                Join Now & Claim Bonus
              </Button>
            </Link>
            <Link href="/lobby" passHref>
              <Button size="sm" variant="outline" className="w-full sm:w-auto font-semibold px-5 py-2 text-sm sm:text-base">
                Explore Games
              </Button>
            </Link>
          </div>

          <div
            className="mt-3 sm:mt-4 p-1 sm:p-1.5 bg-primary/10 border-2 border-dashed border-primary rounded-lg shadow-lg"
          >
            <p className="text-[0.65rem] sm:text-xs font-semibold text-primary">
              ✨ New Player Offer! Sign up for <span className="text-foreground font-bold">10,000 FREE Credits</span> to start! ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

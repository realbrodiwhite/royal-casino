
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown, Coins } from 'lucide-react'; // Added Coins
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative", className)}
    >
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
          
          <div className="relative mb-2 sm:mb-3 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 border-2 border-primary rounded-full bg-background/50 shadow-lg">
              <Crown className="h-8 w-8 sm:h-10 text-primary" aria-hidden="true" />
            </div>
          </div>

          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-primary"
          >
            Welcome to <span className="text-foreground">Royal Casino</span>
          </h1>

          <p
            className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-[280px] sm:max-w-sm mx-auto"
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-2"
          >
            <Link href="/signup" passHref>
              <Button size="sm" variant="default" className="w-full sm:w-auto font-semibold px-4 py-1.5 text-xs sm:text-sm">
                Join Now & Claim Bonus
              </Button>
            </Link>
            <Link href="/lobby" passHref>
              <Button size="sm" variant="outline" className="w-full sm:w-auto font-semibold px-4 py-1.5 text-xs sm:text-sm">
                Explore Games
              </Button>
            </Link>
          </div>

          <div
            className="mt-2 sm:mt-3 p-1 sm:p-1.5 bg-primary/10 border-2 border-dashed border-primary rounded-lg shadow-lg flex items-center space-x-1 sm:space-x-1.5"
          >
            <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-primary-foreground shadow-sm">
              <Coins className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </div>
            <p className="text-[0.6rem] sm:text-xs font-semibold text-primary">
              New Player Offer! Sign up for <span className="text-foreground font-bold">10,000 FREE Credits</span> to start!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

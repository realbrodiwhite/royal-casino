
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "container mx-auto px-4 text-center",
        "flex flex-col items-center justify-center", // Ensures content within this section is centered
        className // This will receive landing-scroll-section
      )}
    >
      {/* Content Group - This div will be centered by the parent section */}
      <div className="flex flex-col items-center justify-center">
        
        <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
          {/* Smaller decorative crowns (optional, can be added back if desired) */}
          {/* <Crown className="absolute top-0 left-0 h-12 w-12 text-primary/30 transform -translate-x-16 -translate-y-8 rotate-[-15deg]" /> */}
          
          {/* Main Crown with Circle */}
          <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 border-4 border-primary rounded-full bg-background/50 shadow-lg">
            <Crown className="h-12 w-12 sm:h-16 sm:w-16 text-primary" aria-hidden="true" />
          </div>
          
          {/* <Crown className="absolute bottom-0 right-0 h-12 w-12 text-primary/30 transform translate-x-16 translate-y-8 rotate-[15deg]" /> */}
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary mb-4 sm:mb-6"
        >
          Welcome to <span className="text-foreground">Royal Casino</span>
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto"
        >
          Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link href="/signup" passHref>
            <Button size="lg" variant="default" className="w-full sm:w-auto font-semibold px-8 py-3 text-lg">
              Join Now & Claim Bonus
            </Button>
          </Link>
          <Link href="/lobby" passHref>
            <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold px-8 py-3 text-lg">
              Explore Games
            </Button>
          </Link>
        </div>

        <div
          className="mt-10 sm:mt-12 p-3 sm:p-4 bg-primary/10 border-2 border-dashed border-primary rounded-lg shadow-lg"
        >
          <p className="text-md sm:text-lg font-semibold text-primary">
            ✨ New Player Offer! Sign up for <span className="text-foreground font-bold">10,000 FREE Credits</span> to start! ✨
          </p>
        </div>
      </div>
    </section>
  );
}

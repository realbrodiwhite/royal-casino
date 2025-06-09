
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
        "relative", // Ensure it doesn't introduce conflicting flex behaviors here
        className // This applies 'landing-scroll-section' which has flex and centering
      )}
    >
      {/* The container handles internal padding and max-width */}
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        {/* Animated Crown Icons */}
        <div
          className={cn(
            "relative mb-6 sm:mb-8",
            "opacity-0 animate-in fade-in zoom-in-75 duration-1000 delay-300" // Combined animation for the group
          )}
        >
          <Crown
            className="absolute -top-12 -left-24 h-20 w-20 sm:h-28 sm:w-28 text-primary/30"
            aria-hidden="true"
          />
          <Crown
            className="relative h-24 w-24 sm:h-32 sm:w-32 text-primary"
            aria-hidden="true"
          />
          <Crown
            className="absolute -bottom-12 -right-24 h-20 w-20 sm:h-28 sm:w-28 text-primary/30"
            aria-hidden="true"
          />
        </div>

        {/* Main Headline */}
        <h1
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary mb-4 sm:mb-6",
            "opacity-0 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500"
          )}
        >
          Welcome to <span className="text-foreground">Royal Casino</span>
        </h1>

        {/* Sub-headline */}
        <p
          className={cn(
            "text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto",
            "opacity-0 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-700"
          )}
        >
          Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
        </p>

        {/* Call to Action Buttons */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6",
            "opacity-0 animate-in fade-in zoom-in-95 duration-700 delay-900"
          )}
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

        {/* New Player Offer Box */}
        <div
          className={cn(
            "mt-10 sm:mt-12 p-3 sm:p-4 bg-primary/10 border-2 border-dashed border-primary rounded-lg shadow-lg",
            "opacity-0 animate-in fade-in duration-1000 delay-1200 animate-glow"
          )}
        >
          <p className="text-md sm:text-lg font-semibold text-primary">
            ✨ New Player Offer! Sign up for <span className="text-foreground font-bold">10,000 FREE Credits</span> to start! ✨
          </p>
        </div>
      </div>
    </section>
  );
}


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
        "relative", // Keep relative for any absolute positioned children if needed later
        className // This will receive landing-scroll-section
      )}
    >
      {/* Container to manage content width and centering */}
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
        {/* Inner wrapper for all visual elements, controlling their direct spacing */}
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
          
          {/* Crown Icon with Circle */}
          <div className="relative mb-3 sm:mb-4 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 md:w-24 border-2 sm:border-3 border-primary rounded-full bg-background/50 shadow-lg">
              <Crown className="h-8 w-8 sm:h-10 md:h-12 text-primary" aria-hidden="true" />
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-primary"
          >
            Welcome to <span className="text-foreground">Royal Casino</span>
          </h1>

          {/* Sub-headline/Description */}
          <p
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-sm sm:max-w-md md:max-w-lg mx-auto"
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          {/* Call to Action Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4"
          >
            <Link href="/signup" passHref>
              <Button size="default" variant="default" className="w-full sm:w-auto font-semibold px-6 py-2.5 text-base sm:text-lg">
                Join Now & Claim Bonus
              </Button>
            </Link>
            <Link href="/lobby" passHref>
              <Button size="default" variant="outline" className="w-full sm:w-auto font-semibold px-6 py-2.5 text-base sm:text-lg">
                Explore Games
              </Button>
            </Link>
          </div>

          {/* New Player Offer Box */}
          <div
            className="mt-4 sm:mt-6 p-1.5 sm:p-2 bg-primary/10 border-2 border-dashed border-primary rounded-lg shadow-lg"
          >
            <p className="text-xs sm:text-sm font-semibold text-primary">
              ✨ New Player Offer! Sign up for <span className="text-foreground font-bold">10,000 FREE Credits</span> to start! ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

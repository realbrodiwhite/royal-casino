
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section className={cn(
      "text-center bg-gradient-to-b from-background via-purple-800/30 to-background",
      className 
    )}>
      {/* The landing-scroll-section (passed via className) will make this section full height and flex-center its direct child (this div.container) */}
      <div className="container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center w-full">

        <div className="relative mb-10 sm:mb-12 md:mb-14 h-[145.6px] sm:h-[166.4px] md:h-[187.2px]">
          {/* Left Small Crown */}
          <div
            className={cn(
              "absolute top-1/2 left-[calc(50%-78.4px)] sm:left-[calc(50%-89.6px)] md:left-[calc(50%-100.8px)] z-0 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36",
              "opacity-0 animate-in fade-in zoom-in-95 duration-700 delay-500"
            )}
          >
            <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-full h-full">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
          </div>
          {/* Right Small Crown */}
          <div
            className={cn(
              "absolute top-1/2 left-[calc(50%+78.4px)] sm:left-[calc(50%+89.6px)] md:left-[calc(50%+100.8px)] z-0 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36",
              "opacity-0 animate-in fade-in zoom-in-95 duration-700 delay-500"
            )}
          >
            <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-full h-full">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
          </div>
          {/* Center Main Crown */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 w-[145.6px] h-[145.6px] sm:w-[166.4px] sm:h-[166.4px] md:w-[187.2px] md:h-[187.2px]",
              "opacity-0 animate-in fade-in zoom-in-95 duration-700 delay-300"
            )}
          >
            <div className="border-4 border-primary rounded-full bg-background flex items-center justify-center w-full h-full">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
          </div>
        </div>

        <h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-primary mb-6 sm:mb-8 md:mb-10",
            "opacity-0 animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-700"
          )}
        >
          Step into a Realm of Royal Entertainment!
        </h1>

        <p
          className={cn(
            "text-xl sm:text-2xl md:text-3xl text-foreground mb-8 sm:mb-10 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-2",
            "opacity-0 animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-900"
          )}
        >
          Experience the pinnacle of social casino gaming, where every play is a new adventure. Connect, compete, and celebrate your wins!
        </p>

        <div className={cn("opacity-0 animate-in fade-in duration-700 delay-1100")}>
          <div className="mb-10 sm:mb-12 p-5 sm:p-7 bg-primary/10 border border-primary rounded-lg inline-block animate-glow">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary flex items-center justify-center">
              <Coins aria-hidden="true" className="h-7 w-7 sm:h-9 md:h-11 mr-2 sm:mr-3 text-primary" /> New Player Offer!
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground mt-2 sm:mt-3">
              Get a generous starting Credit bonus when you sign up!
            </p>
          </div>
        </div>
        
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10",
            "opacity-0 animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-1300"
          )}
        >
          <Link href="/signup" passHref>
            <Button size="lg" variant="default" className="font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-lg sm:text-xl w-full sm:w-auto">
              Sign Up & Claim Offer
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="outline" size="lg" className="font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-lg sm:text-xl w-full sm:w-auto">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

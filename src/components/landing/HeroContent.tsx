
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
      <div className="container mx-auto px-4"> 
        <div className={cn(
          "flex flex-col items-center text-center", 
          "space-y-4 sm:space-y-3" // Adjusted vertical spacing
        )}>
          
          <div className={cn(
              "relative flex items-center justify-center border border-primary rounded-full bg-background/50 shadow-lg",
              "w-20 h-20 sm:w-12 sm:h-12" // Portrait: w/h-20, Landscape: w/h-12
          )}>
            <Crown className={cn(
              "text-primary",
              "h-10 w-10 sm:h-6 sm:h-6" // Portrait: h/w-10, Landscape: h/w-6
            )} aria-hidden="true" />
          </div>

          <h1
            className={cn(
                "font-bold font-headline text-primary text-center",
                "text-5xl leading-tight sm:text-3xl", // Portrait: 5xl, Landscape: 3xl
                "sm:flex sm:flex-wrap sm:justify-center sm:items-baseline sm:gap-x-2" 
            )}
          >
            <span className="block sm:inline">Welcome to</span>
            <span className="block sm:inline text-foreground">Royal Casino</span>
          </h1>

          <p
            className={cn(
                "text-muted-foreground mx-auto",
                "text-xl max-w-md sm:text-base sm:max-w-xl md:max-w-2xl" // Portrait: xl, Landscape: base, wider max-width for landscape
            )}
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-4",
                "mt-4 sm:mt-3" // Adjusted top margin for button
            )}
          >
            <Link href="/lobby" passHref>
              <Button 
                size="lg" 
                variant="default"
                className={cn(
                  "w-full sm:w-auto font-semibold",
                  "text-xl sm:text-base" // Portrait: xl button text, Landscape: base
                )}
              >
                Explore Games
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

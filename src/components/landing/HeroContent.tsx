
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative landing-scroll-section flex flex-col items-center justify-center", className)}
    >
      <div className={cn(
        "container mx-auto px-4"
      )}>
        <div className={cn(
          "flex flex-col items-center text-center",
          "space-y-6 sm:space-y-4 md:space-y-8" // Increased vertical spacing
        )}>

          <div className={cn(
              "relative flex items-center justify-center border border-primary rounded-full bg-background/50 shadow-lg",
              "w-24 h-24 sm:w-16 sm:h-16" // Portrait: w/h-24, Landscape: w/h-16
          )}>
            <Crown className={cn(
              "text-primary",
              "h-12 w-12 sm:h-8 sm:h-8" // Portrait: h/w-12, Landscape: h/w-8
            )} aria-hidden="true" />
          </div>

          <h1
            className={cn(
                "font-bold font-headline text-primary text-center",
                "text-8xl leading-tight", // Default for Portrait (was text-5xl)
                "sm:text-6xl sm:block" // Landscape: (was text-3xl)
            )}
          >
            <span className="block sm:inline">Welcome to</span>
            <span className="block sm:inline text-foreground sm:ml-2">Royal Casino</span>
          </h1>

          <p
            className={cn(
                "text-muted-foreground mx-auto leading-normal", // Added leading-normal
                "text-4xl max-w-md", // Default for Portrait (was text-xl)
                "sm:text-2xl sm:max-w-xl md:max-w-2xl" // Landscape (was text-base)
            )}
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-4",
                "mt-8 sm:mt-5 md:mt-6" // Adjusted top margin for button
            )}
          >
            <Link href="/lobby" passHref>
              <Button
                size="lg"
                variant="default"
                className={cn(
                  "w-full sm:w-auto font-semibold",
                  "text-2xl sm:text-lg py-3 sm:py-2" // Portrait: (was text-xl), Landscape: (was text-base)
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

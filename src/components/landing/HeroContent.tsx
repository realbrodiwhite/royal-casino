
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative", className)} // className is 'landing-scroll-section'
    >
      {/* The parent section (landing-scroll-section) already provides:
          display: flex; flex-direction: column; justify-content: center;
          This will center the div.container vertically if it's not h-full.
      */}
      <div className="container mx-auto px-4"> {/* Removed h-full and flex centering from here */}
        <div className={cn(
          "flex flex-col items-center text-center", // items-center for crown/button, text-center for text
          "space-y-3 sm:space-y-1" // Reduced vertical spacing between elements
        )}>
          
          <div className={cn(
              "relative flex items-center justify-center border-primary rounded-full bg-background/50 shadow-lg border",
              "w-12 h-12 sm:w-10 sm:h-10" // Portrait: larger, Landscape (sm+): smaller
          )}>
            <Crown className={cn(
              "text-primary",
              "h-6 w-6 sm:h-5 sm:h-5" // Portrait: larger, Landscape (sm+): smaller
            )} aria-hidden="true" />
          </div>

          <h1
            className={cn(
                "font-bold font-headline text-primary text-center",
                "text-2xl leading-tight sm:text-xl", // Portrait: larger, Landscape (sm+): smaller
                "sm:flex sm:flex-wrap sm:justify-center sm:items-baseline sm:gap-x-2" // For single line on sm+
            )}
          >
            <span className="block sm:inline">Welcome to</span>
            <span className="block sm:inline text-foreground">Royal Casino</span>
          </h1>

          <p
            className={cn(
                "text-muted-foreground mx-auto",
                "text-sm max-w-[18rem] sm:text-xs sm:max-w-sm md:max-w-md" // Portrait: larger text, smaller max-w. Landscape (sm+): smaller text, wider max-w
            )}
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-2",
                "mt-4 sm:mt-2" // Reduced top margin
            )}
          >
            <Link href="/lobby" passHref>
              <Button 
                size="sm" // Portrait: md, Landscape (sm+): sm
                variant="outline" 
                className={cn(
                  "w-full sm:w-auto font-semibold",
                  "px-4 py-2 text-sm sm:px-3 sm:py-1 sm:text-xs" 
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

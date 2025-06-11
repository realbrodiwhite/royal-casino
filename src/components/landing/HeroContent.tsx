
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
      <div className="container mx-auto px-4"> 
        <div className={cn(
          "flex flex-col items-center text-center", 
          "space-y-3 sm:space-y-1" 
        )}>
          
          <div className={cn(
              "relative flex items-center justify-center border-primary rounded-full bg-background/50 shadow-lg border",
              "w-12 h-12 sm:w-10 sm:h-10" 
          )}>
            <Crown className={cn(
              "text-primary",
              "h-6 w-6 sm:h-5 sm:h-5" 
            )} aria-hidden="true" />
          </div>

          <h1
            className={cn(
                "font-bold font-headline text-primary text-center",
                "text-2xl leading-tight sm:text-xl", 
                "sm:flex sm:flex-wrap sm:justify-center sm:items-baseline sm:gap-x-2" 
            )}
          >
            <span className="block sm:inline">Welcome to</span>
            <span className="block sm:inline text-foreground">Royal Casino</span>
          </h1>

          <p
            className={cn(
                "text-muted-foreground mx-auto",
                "text-sm max-w-[18rem] sm:text-xs sm:max-w-sm md:max-w-md" 
            )}
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-2",
                "mt-3 sm:mt-2" 
            )}
          >
            <Link href="/lobby" passHref>
              <Button 
                size="sm" 
                variant="default" // Changed from "outline" to "default"
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

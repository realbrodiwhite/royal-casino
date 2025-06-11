
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
        <div className={cn(
          "flex flex-col items-center justify-center text-center",
          "space-y-4 sm:space-y-2" 
        )}>
          
          <div className={cn(
              "relative flex items-center justify-center border-primary rounded-full bg-background/50 shadow-lg border",
              "w-16 h-16 sm:w-12 sm:h-12" // Default (portrait) larger, sm (landscape) smaller
          )}>
            <Crown className={cn(
              "text-primary",
              "h-8 w-8 sm:h-6 sm:h-6" // Default (portrait) larger, sm (landscape) smaller
            )} aria-hidden="true" />
          </div>

          <h1
            className={cn(
                "font-bold font-headline text-primary text-center",
                "text-3xl leading-tight sm:text-2xl" // Default (portrait) larger, sm (landscape) smaller
            )}
          >
            <span className="block sm:inline">Welcome to </span>
            <span className="block sm:inline text-foreground">Royal Casino</span>
          </h1>

          <p
            className={cn(
                "text-muted-foreground mx-auto",
                "text-base max-w-xs sm:text-sm sm:max-w-md md:max-w-lg" // Default (portrait) larger text, sm (landscape) smaller text & wider max-width
            )}
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-2",
                "mt-6 sm:mt-3" // Default (portrait) more margin, sm (landscape) less margin
            )}
          >
            <Link href="/lobby" passHref>
              <Button 
                size="md" // Default (portrait) larger button
                variant="outline" 
                className={cn(
                  "w-full sm:w-auto font-semibold",
                  "sm:size-sm sm:px-3 sm:py-1 sm:text-xs" // sm (landscape) smaller button size and text
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

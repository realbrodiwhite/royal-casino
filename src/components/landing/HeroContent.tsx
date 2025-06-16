
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
          "space-y-6 sm:space-y-4 md:space-y-6" 
        )}>

          <div className={cn(
              "relative flex items-center justify-center border border-primary rounded-full bg-background/50 shadow-lg",
              "w-24 h-24 sm:w-16 sm:h-16" 
          )}>
            <Crown className={cn(
              "text-primary",
              "h-12 w-12 sm:h-8 sm:h-8" 
            )} aria-hidden="true" />
          </div>

          <h1
            className={cn(
                "font-bold font-headline text-primary text-center",
                "text-7xl leading-tight", 
                "sm:text-5xl sm:block" 
            )}
          >
            <span className="block sm:inline">Welcome to</span>
            <span className="block sm:inline text-foreground sm:ml-2">Royal Casino</span>
          </h1>

          <p
            className={cn(
                "text-muted-foreground mx-auto leading-normal", 
                "text-4xl max-w-md", 
                "sm:text-2xl sm:max-w-xl md:max-w-2xl" 
            )}
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-4",
                "mt-8 sm:mt-5 md:mt-6" 
            )}
          >
            <Link href="/lobby" passHref>
              <Button
                size="lg"
                variant="default"
                className={cn(
                  "w-full sm:w-auto font-semibold",
                  "text-2xl sm:text-lg py-3 sm:py-2" 
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

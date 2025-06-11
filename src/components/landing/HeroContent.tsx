
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative", className)}
    >
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className={cn(
          "flex flex-col items-center justify-center text-center",
          "space-y-1 sm:space-y-1.5 md:space-y-2" 
        )}>
          
          <div className={cn(
              "relative flex items-center justify-center border-primary rounded-full bg-background/50 shadow-lg",
              "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border" 
          )}>
            <Crown className={cn(
              "text-primary",
              "h-6 w-6 sm:h-7 sm:h-7 md:h-8 md:h-8"
            )} aria-hidden="true" />
          </div>

          <h1
            className={cn(
                "font-bold font-headline text-primary text-center",
                "text-base leading-tight sm:text-lg md:text-xl lg:text-2xl"
            )}
          >
            <span className="block sm:inline">Welcome to </span>
            <span className="block sm:inline text-foreground">Royal Casino</span>
          </h1>

          <p
            className={cn(
                "text-muted-foreground max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto",
                "text-xs sm:text-xs md:text-sm"
            )}
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-2",
                "mt-1 sm:mt-1.5 md:mt-2"
            )}
          >
            <Link href="/lobby" passHref>
              <Button 
                size="sm" 
                variant="outline" 
                className={cn(
                  "w-full sm:w-auto font-semibold",
                  "px-3 py-1 text-[10px] sm:text-xs md:text-sm"
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


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
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
          
          <div className={cn(
              "relative flex items-center justify-center border-primary rounded-full bg-background/50 shadow-lg",
              "w-16 h-16 sm:w-20 sm:h-20 border" 
          )}>
            <Crown className="h-8 w-8 sm:h-10 sm:h-10 text-primary" aria-hidden="true" />
          </div>

          <h1
            className={cn(
                "font-bold font-headline text-primary text-center",
                "text-lg leading-tight sm:text-xl md:text-2xl lg:text-3xl sm:leading-normal"
            )}
          >
            <span className="block sm:inline">Welcome to </span>
            <span className="block sm:inline text-foreground">Royal Casino</span>
          </h1>

          <p
            className={cn(
                "text-muted-foreground max-w-[280px] sm:max-w-sm mx-auto",
                "text-xs sm:text-sm md:text-base" 
            )}
          >
            Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
          </p>

          <div
            className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3",
                "mt-1 sm:mt-2" 
            )}
          >
            {/* "Join Now & Claim Bonus" button moved to NewPlayerOfferBanner */}
            <Link href="/lobby" passHref>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full sm:w-auto font-semibold px-4 py-1.5 text-xs sm:text-sm"
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


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
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
          
          <div className="relative mb-2 sm:mb-3 flex items-center justify-center">
            <div className={cn(
                "relative flex items-center justify-center border-primary rounded-full bg-background/50 shadow-lg",
                "w-16 h-16 sm:w-20 sm:h-20 border" 
            )}>
              <Crown className="h-8 w-8 sm:h-10 text-primary" aria-hidden="true" />
            </div>
          </div>

          <h1
            className={cn(
                "font-bold font-headline text-primary",
                "text-xl sm:text-2xl md:text-3xl" 
            )}
          >
            Welcome to <span className="text-foreground">Royal Casino</span>
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
            <Link href="/signup" passHref>
              <Button 
                size="sm" 
                variant="default" 
                className="w-full sm:w-auto font-semibold px-4 py-1.5 text-xs sm:text-sm"
              >
                Join Now & Claim Bonus
              </Button>
            </Link>
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
          {/* "New Player Offer" div removed from here */}
        </div>
      </div>
    </section>
  );
}

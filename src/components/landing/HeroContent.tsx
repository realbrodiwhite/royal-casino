
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "container mx-auto px-4 text-center", // Basic container and text alignment
        className // This will apply 'landing-scroll-section' from page.tsx
                  // 'landing-scroll-section' handles: full height, flex, flex-col, justify-center
      )}
    >
      {/* Content Group directly inside the flex container created by landing-scroll-section */}
      <div className="relative mb-6 sm:mb-8">
        <Crown
          className="absolute -top-12 -left-24 h-20 w-20 sm:h-28 sm:w-28 text-primary/30"
          aria-hidden="true"
        />
        <Crown
          className="relative h-24 w-24 sm:h-32 sm:w-32 text-primary"
          aria-hidden="true"
        />
        <Crown
          className="absolute -bottom-12 -right-24 h-20 w-20 sm:h-28 sm:w-28 text-primary/30"
          aria-hidden="true"
        />
      </div>

      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary mb-4 sm:mb-6"
      >
        Welcome to <span className="text-foreground">Royal Casino</span>
      </h1>

      <p
        className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto"
      >
        Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
      </p>

      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
      >
        <Link href="/signup" passHref>
          <Button size="lg" variant="default" className="w-full sm:w-auto font-semibold px-8 py-3 text-lg">
            Join Now & Claim Bonus
          </Button>
        </Link>
        <Link href="/lobby" passHref>
          <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold px-8 py-3 text-lg">
            Explore Games
          </Button>
        </Link>
      </div>

      <div
        className="mt-10 sm:mt-12 p-3 sm:p-4 bg-primary/10 border-2 border-dashed border-primary rounded-lg shadow-lg"
      >
        <p className="text-md sm:text-lg font-semibold text-primary">
          ✨ New Player Offer! Sign up for <span className="text-foreground font-bold">10,000 FREE Credits</span> to start! ✨
        </p>
      </div>
    </section>
  );
}

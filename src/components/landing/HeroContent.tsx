
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown, Coins } from 'lucide-react';

export default function HeroContent() {
  return (
    <section className="text-center bg-gradient-to-b from-background via-purple-800/30 to-background pt-[88px] sm:pt-[92px] min-h-[calc(100vh-88px)] sm:min-h-[calc(100vh-92px)] flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="relative mb-16 sm:mb-20 md:mb-24 h-32 sm:h-36 md:h-40">
          {/* Left Side Coin (Behind) */}
          <div className="absolute top-1/2 left-1/2 z-0 transform -translate-y-1/2 translate-x-[-81.92px] sm:translate-x-[-92.16px] md:translate-x-[-102.4px]">
            <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-[102.4px] h-[102.4px] sm:w-[115.2px] sm:h-[115.2px] md:w-32 md:h-32">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
          </div>
          {/* Right Side Coin (Behind) */}
          <div className="absolute top-1/2 left-1/2 z-0 transform -translate-y-1/2 translate-x-[81.92px] sm:translate-x-[92.16px] md:translate-x-[102.4px]">
            <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-[102.4px] h-[102.4px] sm:w-[115.2px] sm:h-[115.2px] md:w-32 md:h-32">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
          </div>
          {/* Central Coin (Front) */}
          <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 border-4 border-primary rounded-full bg-background flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40">
            <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-primary mb-3 sm:mb-4">
          Step into a Realm of Royal Entertainment!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground mb-6 sm:mb-8 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-2">
          Experience the pinnacle of social casino gaming, where every play is a new adventure. Connect, compete, and celebrate your wins!
        </p>
        <div className="mb-8 sm:mb-10 p-4 sm:p-6 bg-primary/10 border border-primary rounded-lg inline-block animate-glow">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-headline text-primary flex items-center justify-center">
            <Coins aria-hidden="true" className="h-6 w-6 sm:h-8 md:h-10 mr-2 sm:mr-3 text-primary" /> New Player Offer!
          </h2>
          <p className="text-md sm:text-lg md:text-xl text-foreground mt-1 sm:mt-2">
            $5 Free Play or Credit Match Up To $20 on Newly Verified Accounts, plus 10 FREE Premium Coins!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <Link href="/signup" passHref>
            <Button size="lg" variant="default" className="font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-md sm:text-lg w-full sm:w-auto">
              Sign Up & Claim Offer
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="outline" size="lg" className="font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-md sm:text-lg w-full sm:w-auto">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

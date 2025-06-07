
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown, Coins } from 'lucide-react';

export default function HeroContent() {
  return (
    <section className="text-center bg-gradient-to-b from-background via-purple-800/30 to-background min-h-[calc(100vh-88px)] sm:min-h-[calc(100vh-92px)] flex flex-col justify-center">
      <div className="container mx-auto px-4">

        {/* Triple Coin Logo Container - Adjusted for new sizes and centering */}
        <div className="relative mb-10 sm:mb-12 md:mb-14 h-36 sm:h-40 md:h-44"> {/* LOGO CONTAINER HEIGHT - Base height updated */}
          {/* Left Back Coin - Positioned relative to center */}
          <div className="absolute top-1/2 left-[calc(50%-78.4px)] sm:left-[calc(50%-89.6px)] md:left-[calc(50%-100.8px)] z-0 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
            <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-full h-full">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
          </div>
          {/* Right Back Coin - Positioned relative to center */}
          <div className="absolute top-1/2 left-[calc(50%+78.4px)] sm:left-[calc(50%+89.6px)] md:left-[calc(50%+100.8px)] z-0 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
            <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-full h-full">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
          </div>
          {/* Central Front Coin - Centered */}
          <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44"> {/* CENTRAL COIN SIZE - Base size updated */}
            <div className="border-4 border-primary rounded-full bg-background flex items-center justify-center w-full h-full">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
          </div>
        </div>

        {/* Main Title - Increased size & margin */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-primary mb-6 sm:mb-8 md:mb-10">
          Step into a Realm of Royal Entertainment!
        </h1>

        {/* Subtitle/Description - Increased size & margin */}
        <p className="text-xl sm:text-2xl md:text-3xl text-foreground mb-8 sm:mb-10 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-2">
          Experience the pinnacle of social casino gaming, where every play is a new adventure. Connect, compete, and celebrate your wins!
        </p>

        {/* New Player Offer Banner - Increased text size, padding & margin */}
        <div className="mb-10 sm:mb-12 p-5 sm:p-7 bg-primary/10 border border-primary rounded-lg inline-block animate-glow">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary flex items-center justify-center">
            <Coins aria-hidden="true" className="h-7 w-7 sm:h-9 md:h-11 mr-2 sm:mr-3 text-primary" /> New Player Offer!
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground mt-2 sm:mt-3">
            $5 Free Play or Credit Match Up To $20 on Newly Verified Accounts, plus 10 FREE Premium Coins!
          </p>
        </div>

        {/* CTA Buttons - Increased text size & container margin */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          <Link href="/signup" passHref>
            <Button size="lg" variant="default" className="font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-lg sm:text-xl w-full sm:w-auto">
              Sign Up & Claim Offer
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="outline" size="lg" className="font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-lg sm:text-xl w-full sm:w-auto">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

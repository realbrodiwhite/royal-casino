
"use client"; // Keep as client component if it has client-side interactions or needs framer-motion in future

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Crown, Coins } from 'lucide-react';

export default function HeroContent() {
  return (
    <section className="pb-8 sm:pb-10 md:pb-12 text-center bg-gradient-to-b from-background via-purple-800/30 to-background pt-[88px] sm:pt-[92px]">
      <div className="container mx-auto px-4">
        {/* Triple King's Coin Logo */}
        <div className="relative flex justify-center items-center mb-4 sm:mb-6 h-28 sm:h-36 md:h-40">
          {/* Left Side Coin (Behind) */}
          <div className="absolute top-1/2 left-1/2 z-0 transform -translate-y-1/2 scale-90 translate-x-[-134px] sm:translate-x-[-173px] md:translate-x-[-192px]">
            <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
          </div>
          {/* Central Coin (Front) */}
          <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 border-4 border-primary rounded-full bg-background flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40">
            <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
          </div>
          {/* Right Side Coin (Behind) */}
          <div className="absolute top-1/2 left-1/2 z-0 transform -translate-y-1/2 scale-90 translate-x-[34px] sm:translate-x-[43px] md:translate-x-[48px]">
            <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40">
              <Crown aria-hidden="true" className="h-[calc(50%)] w-[calc(50%)] text-primary" />
            </div>
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
          <p className="text-md sm:text-lg md:text-xl text-foreground mt-1 sm:mt-2">Double Your First Credit Purchase <span className="font-bold text-primary">Up To $20 Equivalent in Credits!</span></p>
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

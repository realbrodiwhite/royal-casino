
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { Crown } from 'lucide-react'; // Temporarily remove Lucide icon
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "container mx-auto px-4 text-center",
        className 
      )}
      style={{ border: '5px solid limegreen', minHeight: '80vh', backgroundColor: 'rgba(50,0,50,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000, color: 'white' }}
    >
      {/* Content Group */}
      <div style={{ border: '3px solid cyan', padding: '20px', backgroundColor: 'rgba(0,50,50,0.5)' }}>
        
        <div className="relative mb-6 sm:mb-8" style={{ border: '2px solid yellow', padding: '10px' }}>
          {/* Placeholder for Crowns */}
          <div style={{ position: 'absolute', top: '-50px', left: '-100px', fontSize: '40px', color: 'rgba(255,255,0,0.3)' }}>CROWN1</div>
          <div style={{ fontSize: '60px', color: 'yellow', margin: '20px 0' }}>BIG CROWN</div>
          <div style={{ position: 'absolute', bottom: '-50px', right: '-100px', fontSize: '40px', color: 'rgba(255,255,0,0.3)' }}>CROWN2</div>
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary mb-4 sm:mb-6"
          style={{ color: 'white', backgroundColor: 'rgba(100,0,0,0.5)', padding: '10px' }}
        >
          HERO TEST: Welcome to <span className="text-foreground" style={{color: 'lightblue'}}>Royal Casino</span>
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto"
          style={{ color: 'lightgray', backgroundColor: 'rgba(0,100,0,0.5)', padding: '10px' }}
        >
          HERO TEST: Your premier destination for social casino gaming. Experience the thrill, connect with friends, and reign supreme!
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          style={{ border: '2px solid orange', padding: '10px' }}
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
          style={{ backgroundColor: 'rgba(0,0,100,0.5)', borderColor: 'magenta', padding: '10px' }}
        >
          <p className="text-md sm:text-lg font-semibold text-primary" style={{color: 'pink'}}>
            ✨ HERO TEST: New Player Offer! Sign up for <span className="text-foreground font-bold" style={{color: 'lightgreen'}}>10,000 FREE Credits</span> to start! ✨
          </p>
        </div>
      </div>
    </section>
  );
}

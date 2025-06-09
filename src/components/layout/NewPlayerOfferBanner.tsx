
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const LOCAL_STORAGE_KEY = 'hasDismissedNewPlayerOffer_v1';

export default function NewPlayerOfferBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log('[NewPlayerOfferBanner] localStorage dismissed value:', dismissed);
      if (dismissed !== 'true') {
        setIsVisible(true);
        console.log('[NewPlayerOfferBanner] Setting isVisible to true');
      } else {
        console.log('[NewPlayerOfferBanner] Banner already dismissed according to localStorage.');
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      console.log('[NewPlayerOfferBanner] Banner dismissed, localStorage set.');
    }
  };

  // Temporary diagnostic div - THIS SHOULD ALWAYS RENDER IF THE COMPONENT IS MOUNTED
  const diagnosticDiv = (
    <div style={{ background: 'red', color: 'white', padding: '10px', fontSize: '16px', textAlign: 'center', position: 'fixed', top: '60px', left: 0, width: '100%', zIndex: 9999 }}>
      NEW PLAYER BANNER COMPONENT IS ATTEMPTING TO RENDER. isMounted: {isMounted.toString()}, isVisible: {isVisible.toString()}. Check console.
    </div>
  );

  if (!isMounted || !isVisible) {
    // Still render diagnostic div if not visible but mounted, to help debug
    return isMounted ? diagnosticDiv : null; 
  }

  return (
    <>
      {diagnosticDiv} {/* Keep diagnostic div visible even when banner is supposed to show */}
      <div
        className={cn(
          "bg-primary/10 text-primary-foreground py-2 px-4 border-b-2 border-primary/20 shadow-md",
          "relative flex items-center justify-center text-center w-full z-20 mt-[calc(32px+48px)] sm:mt-[calc(36px+48px)]" // Adjusted to account for ExpBar and Navbar
        )}
      >
        <div
          className={cn(
            "flex items-center space-x-1.5 sm:space-x-2"
          )}
        >
          <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-primary-foreground shadow-sm shrink-0">
            <Coins className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-primary flex-grow text-center">
            New Player Offer! <Link href="/signup" className="underline hover:text-primary/80 transition-colors">Sign up</Link> for <span className="text-foreground font-bold">10,000 FREE Credits</span> to start!
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8 text-primary hover:bg-primary/20 hover:text-primary"
          aria-label="Dismiss new player offer"
        >
          <X className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        </Button>
      </div>
    </>
  );
}

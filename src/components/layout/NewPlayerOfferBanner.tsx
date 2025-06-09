
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
      if (dismissed !== 'true') {
        setIsVisible(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    }
  };

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-primary/10 text-primary-foreground py-4 px-4 border-b-2 border-primary/20 shadow-md", // Changed py-2 to py-4
        "relative w-full z-20 my-4" // Added my-4, removed mt-[10vh]
      )}
    >
      <div className={cn(
        "container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3"
      )}>
        <div className="flex items-center gap-1.5 sm:gap-2">
           <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-primary-foreground shadow-sm shrink-0">
            <Coins className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-primary text-center sm:text-left">
            New Player Offer! Get <span className="text-foreground font-bold">10,000 FREE Credits</span> to start!
          </p>
        </div>
        
        <Link href="/signup" passHref>
          <Button
            size="sm"
            variant="default" 
            className="font-semibold px-4 py-1.5 text-xs sm:text-sm shrink-0 w-full sm:w-auto"
          >
            Join Now & Claim Bonus
          </Button>
        </Link>
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
  );
}

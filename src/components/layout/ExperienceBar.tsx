
"use client";

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Star, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useXp } from '@/contexts/XpContext';

const ExperienceBar: React.FC = () => {
  const { level, xpTowardsNextLevel, xpNeededForNextLevel, availableXp } = useXp();

  const progressPercentage = xpNeededForNextLevel > 0 ? (xpTowardsNextLevel / xpNeededForNextLevel) * 100 : 0;

  return (
    <div className={cn(
        "fixed top-0 left-0 right-0 z-40 p-2 bg-background/90 backdrop-blur-md shadow-md border-b border-border flex items-center",
        "h-6 sm:h-7" // Reduced height
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <span className="font-semibold text-primary">Lvl {level}</span>
        </div>
        <div className="flex-grow max-w-xs sm:max-w-sm md:max-w-md">
          <Progress value={progressPercentage} className="h-2 sm:h-2.5" /> {/* Adjusted progress bar height slightly */}
        </div>
        <div className="text-muted-foreground whitespace-nowrap hidden_ xs:block">
          {xpTowardsNextLevel.toLocaleString()} / {xpNeededForNextLevel.toLocaleString()} XP
        </div>
         <div className="flex items-center gap-1 sm:gap-2" title={`Available Credits for upgrades: ${availableXp.toLocaleString()}`}>
          <Coins className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
          <span className="font-semibold text-accent">{availableXp.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceBar;

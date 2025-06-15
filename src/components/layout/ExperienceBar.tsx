
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
        "w-full flex items-center"
      )}
    >
      <div className="w-full flex items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0" title={`Level ${level}`}>
          <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          <span className="font-semibold text-primary hidden_ xs:inline">Lvl {level}</span>
        </div>
        <div className="flex-grow min-w-[50px] sm:min-w-[100px] mx-1 sm:mx-2">
          <Progress value={progressPercentage} className="h-1.5 sm:h-2" />
        </div>
        <div className="text-muted-foreground whitespace-nowrap hidden_ xxs:inline-flex items-center gap-0.5" title={`${xpTowardsNextLevel.toLocaleString()} / ${xpNeededForNextLevel.toLocaleString()} XP to next level`}>
          <span>{xpTowardsNextLevel.toLocaleString()}</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline">{xpNeededForNextLevel.toLocaleString()} XP</span>
        </div>
         <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0" title={`Available XP for upgrades: ${availableXp.toLocaleString()}`}>
          <Coins className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent" />
          <span className="font-semibold text-accent">{availableXp.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceBar;


"use client";

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Star, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useXp } from '@/contexts/XpContext'; // Import useXp hook

const ExperienceBar: React.FC = () => {
  const { level, currentLevelXp, xpToCompleteLevel } = useXp();
  const [isVisible, setIsVisible] = useState(true);

  const progressPercentage = xpToCompleteLevel > 0 ? (currentLevelXp / xpToCompleteLevel) * 100 : 0;

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-0 left-1/2 -translate-x-1/2 mt-2 p-2 bg-primary/80 text-primary-foreground rounded-full shadow-lg hover:bg-primary z-50"
        aria-label="Show Experience Bar"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className={cn(
        "fixed top-0 left-0 right-0 z-40 p-2 bg-background/90 backdrop-blur-md shadow-md border-b border-border h-[44px] flex items-center", // Added h-[44px] and flex items-center
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <span className="font-semibold text-primary">Lvl {level}</span>
        </div>
        <div className="flex-grow max-w-xs sm:max-w-sm md:max-w-md">
          <Progress value={progressPercentage} className="h-2 sm:h-3" />
        </div>
        <div className="text-muted-foreground whitespace-nowrap">
          {currentLevelXp.toLocaleString()} / {xpToCompleteLevel.toLocaleString()} XP
        </div>
        <button 
          onClick={() => setIsVisible(false)} 
          className="text-muted-foreground hover:text-foreground"
          aria-label="Hide Experience Bar"
        >
          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default ExperienceBar;

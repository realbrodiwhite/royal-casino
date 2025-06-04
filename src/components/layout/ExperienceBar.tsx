
"use client";

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Star, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const ExperienceBar: React.FC = () => {
  // Mock data - replace with actual global state later
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0);
  const [xpForNextLevel, setXpForNextLevel] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  // Simulate XP gain for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentXp(prevXp => {
        const newXp = prevXp + Math.floor(Math.random() * 10) + 5;
        if (newXp >= xpForNextLevel) {
          setCurrentLevel(prevLevel => prevLevel + 1);
          setXpForNextLevel(prevXpNL => Math.floor(prevXpNL * 1.5)); // Increase XP needed for next level
          return newXp - xpForNextLevel; // Carry over excess XP
        }
        return newXp;
      });
    }, 5000); // Add XP every 5 seconds

    return () => clearInterval(interval);
  }, [xpForNextLevel]);

  const progressPercentage = (currentXp / xpForNextLevel) * 100;

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-2 p-2 bg-primary/80 text-primary-foreground rounded-full shadow-lg hover:bg-primary z-50"
        aria-label="Show Experience Bar"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className={cn(
        "fixed top-0 left-0 right-0 z-40 p-2 bg-background/90 backdrop-blur-md shadow-md border-b border-border",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <span className="font-semibold text-primary">Lvl {currentLevel}</span>
        </div>
        <div className="flex-grow max-w-xs sm:max-w-sm md:max-w-md">
          <Progress value={progressPercentage} className="h-2 sm:h-3" />
        </div>
        <div className="text-muted-foreground whitespace-nowrap">
          {currentXp.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
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

    
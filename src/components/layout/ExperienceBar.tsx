
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Progress } from '@/components/ui/progress';
import { Star, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const ExperienceBar: React.FC = () => {
  // Function to calculate XP needed to complete a given level
  const calculateXpNeededForLevel = useCallback((level: number): number => {
    return level * 50;
  }, []);

  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0); // XP accumulated within the current level
  const [xpForNextLevel, setXpForNextLevel] = useState(() => calculateXpNeededForLevel(1)); // Total XP needed to complete the current level

  const [isVisible, setIsVisible] = useState(true);

  // Refs to hold the latest state for use in the interval, preventing stale closures
  const currentLevelRef = useRef(currentLevel);
  const currentXpRef = useRef(currentXp);
  const xpForNextLevelRef = useRef(xpForNextLevel);

  // Update refs whenever their corresponding state changes
  useEffect(() => {
    currentLevelRef.current = currentLevel;
  }, [currentLevel]);

  useEffect(() => {
    currentXpRef.current = currentXp;
  }, [currentXp]);

  useEffect(() => {
    xpForNextLevelRef.current = xpForNextLevel;
  }, [xpForNextLevel]);

  // Simulate XP gain for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      const gainedXpThisTick = Math.floor(Math.random() * 10) + 5; // Gain 5-14 XP
      
      let newAccumulatedXp = currentXpRef.current + gainedXpThisTick;
      let newLevel = currentLevelRef.current;
      let newXpThresholdForLevel = xpForNextLevelRef.current;

      // Loop to handle multiple level-ups in one tick if necessary
      while (newAccumulatedXp >= newXpThresholdForLevel) {
        newAccumulatedXp -= newXpThresholdForLevel; // XP carried over to the next level
        newLevel++;
        newXpThresholdForLevel = calculateXpNeededForLevel(newLevel);
      }

      // Update states with the new values
      setCurrentLevel(newLevel);
      setCurrentXp(newAccumulatedXp);
      setXpForNextLevel(newXpThresholdForLevel);

    }, 5000); // Add XP every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [calculateXpNeededForLevel]); // calculateXpNeededForLevel is stable due to useCallback

  const progressPercentage = xpForNextLevel > 0 ? (currentXp / xpForNextLevel) * 100 : 0;

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

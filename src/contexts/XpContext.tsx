
"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface XpContextValue {
  level: number;
  currentLevelXp: number; // XP accumulated within the current level
  xpToCompleteLevel: number; // Total XP needed to complete the current level
  addXp: (amount: number) => void;
  totalAccumulatedXp: number; // For potential display elsewhere, tracks overall XP
}

const XpContext = createContext<XpContextValue | undefined>(undefined);

const calculateXpNeededForLevel = (level: number): number => {
  return level * 50;
};

export const XpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [currentLevelXp, setCurrentLevelXp] = useState(0);
  const [xpToCompleteLevel, setXpToCompleteLevel] = useState(() => calculateXpNeededForLevel(1));
  const [totalAccumulatedXp, setTotalAccumulatedXp] = useState(0);

  const addXp = useCallback((amount: number) => {
    setTotalAccumulatedXp(prevTotal => prevTotal + amount);

    let newCurrentXp = currentLevelXp + amount;
    let newLevel = level;
    let newXpToComplete = xpToCompleteLevel;

    while (newCurrentXp >= newXpToComplete) {
      newCurrentXp -= newXpToComplete;
      newLevel++;
      newXpToComplete = calculateXpNeededForLevel(newLevel);
    }

    setLevel(newLevel);
    setCurrentLevelXp(newCurrentXp);
    setXpToCompleteLevel(newXpToComplete);
  }, [currentLevelXp, level, xpToCompleteLevel]);

  return (
    <XpContext.Provider value={{ level, currentLevelXp, xpToCompleteLevel, addXp, totalAccumulatedXp }}>
      {children}
    </XpContext.Provider>
  );
};

export const useXp = (): XpContextValue => {
  const context = useContext(XpContext);
  if (context === undefined) {
    throw new Error('useXp must be used within an XpProvider');
  }
  return context;
};

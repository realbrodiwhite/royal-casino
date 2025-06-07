
"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

interface XpContextValue {
  level: number;
  xpTowardsNextLevel: number;
  xpNeededForNextLevel: number;
  totalXpEarned: number;
  spentXpForSkills: number;
  availableXp: number;
  addXp: (amount: number) => void;
  canAffordSkillUpgrade: (cost: number) => boolean;
  spendXpOnSkill: (cost: number) => boolean;
  getSkillLevel?: (skillId: string) => number; // To be used by game logic later
}

const XpContext = createContext<XpContextValue | undefined>(undefined);

// Base XP for level 1 is 0, to reach level 2 needs 'calculateXpNeededForLevel(1)'
const calculateXpNeededForLevel = (level: number): number => {
  // Example: L1->L2 = 100XP, L2->L3 = 150XP, L3->L4 = 200XP, etc.
  // Or: L1=100, L2=250 (100+150), L3=450 (100+150+200) total
  return 50 + level * 50; // XP required to complete this level and advance to next
};

export const XpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [spentXpForSkills, setSpentXpForSkills] = useState(0);
  // UserSkillProgress would typically be fetched/managed elsewhere, mocked here for context structure
  // const [userSkills, setUserSkills] = useState<Record<string, number>>({}); 

  const calculateLevelDetails = useCallback((currentTotalXp: number) => {
    let currentLevel = 1;
    let xpForPrevLevels = 0; // Total XP accumulated to reach currentLevel
    let xpToCompleteCurrentLevel = calculateXpNeededForLevel(currentLevel);

    while (currentTotalXp >= xpForPrevLevels + xpToCompleteCurrentLevel) {
      xpForPrevLevels += xpToCompleteCurrentLevel;
      currentLevel++;
      xpToCompleteCurrentLevel = calculateXpNeededForLevel(currentLevel);
    }
    return {
      level: currentLevel,
      xpTowardsNextLevel: currentTotalXp - xpForPrevLevels,
      xpNeededForNextLevel: xpToCompleteCurrentLevel,
    };
  }, []);

  const { level, xpTowardsNextLevel, xpNeededForNextLevel } = useMemo(
    () => calculateLevelDetails(totalXpEarned),
    [totalXpEarned, calculateLevelDetails]
  );

  const availableXp = totalXpEarned - spentXpForSkills;

  const addXp = useCallback((amount: number) => {
    setTotalXpEarned(prev => prev + amount);
  }, []);

  const canAffordSkillUpgrade = useCallback((cost: number) => {
    return availableXp >= cost;
  }, [availableXp]);

  const spendXpOnSkill = useCallback((cost: number) => {
    if (canAffordSkillUpgrade(cost)) {
      setSpentXpForSkills(prev => prev + cost);
      // In a real app, you'd also update the specific skill's level for the user here
      return true;
    }
    return false;
  }, [canAffordSkillUpgrade]);

  // Placeholder for actual skill level fetching for game logic
  // const getSkillLevel = useCallback((skillId: string) => {
  //   return userSkills[skillId] || 0;
  // }, [userSkills]);

  return (
    <XpContext.Provider value={{
      level,
      xpTowardsNextLevel,
      xpNeededForNextLevel,
      totalXpEarned,
      spentXpForSkills,
      availableXp,
      addXp,
      canAffordSkillUpgrade,
      spendXpOnSkill,
      // getSkillLevel
    }}>
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

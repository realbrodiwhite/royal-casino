
import type { SkillDefinition } from '@/types/skills';
import { Sparkles, Anchor, Timer } from 'lucide-react';

const TOTAL_CORE_SKILLS_FOR_BONUS_CALC = 3;
const MAX_LEVEL_PER_CORE_SKILL = 10;
const TOTAL_CORE_SKILL_POINTS = TOTAL_CORE_SKILLS_FOR_BONUS_CALC * MAX_LEVEL_PER_CORE_SKILL; // 3 * 10 = 30
const TOTAL_GLOBAL_WIN_BONUS_FACTOR = 0.01; // 1% total bonus if all core skills are maxed
const GLOBAL_WIN_BONUS_PER_POINT = TOTAL_GLOBAL_WIN_BONUS_FACTOR / TOTAL_CORE_SKILL_POINTS; // 0.01 / 30

export const allSkillDefinitions: SkillDefinition[] = [
  {
    id: 'luck',
    name: 'Luck',
    description: 'Subtly improve your overall fortune. Each level contributes to a global bonus on your Credit winnings across games.',
    icon: Sparkles,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "No bonus to winnings yet. Upgrade to increase your winning potential.";
      const bonusContribution = (level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(3);
      return `Contributes +${bonusContribution}% to your global Credit win bonus.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'luck',
  },
  {
    id: 'faith',
    name: 'Faith',
    description: 'Your unwavering belief can lead to more rewarding outcomes. Each level enhances your global Credit win bonus.',
    icon: Anchor,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard winnings. Upgrade to bolster your rewards.";
      const bonusContribution = (level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(3);
      return `Contributes +${bonusContribution}% to your global Credit win bonus.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'rewards',
  },
  {
    id: 'timing',
    name: 'Timing',
    description: 'Mastering the moment can improve your gains. Each level fine-tunes your global Credit win bonus.',
    icon: Timer,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Normal win amounts. Upgrade to seize better opportunities.";
      const bonusContribution = (level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(3);
      return `Contributes +${bonusContribution}% to your global Credit win bonus.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'general',
  },
  // XP Harvester skill would be separate if we re-add it, as it affects XP, not win amounts.
  // Example:
  // {
  //   id: 'xp_harvester',
  //   name: 'XP Harvester',
  //   description: 'Become more efficient at learning from every play, permanently increasing all XP gains.',
  //   icon: TrendingUp, // Or another appropriate icon
  //   maxLevel: 5, // Example max level
  //   costPerLevel: (currentLevel) => (currentLevel + 1) * 300, // Example cost
  //   effectDescription: (level) => `Increases all XP earned by ${level * 2}%.`,
  //   getEffectValue: (level) => level * 0.02, // Returns 0.02 for 2%, 0.04 for 4%, etc.
  //   category: 'progression',
  // }
];

export const getSkillDefinitionById = (id: string): SkillDefinition | undefined => {
  return allSkillDefinitions.find(skill => skill.id === id);
};

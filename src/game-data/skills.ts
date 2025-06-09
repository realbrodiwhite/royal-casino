
import type { SkillDefinition } from '@/types/skills';
// Importing a wider range of icons that might fit the new skills
import { Brain, Zap, ShieldCheck, Rabbit, Eye, BarChart, Sparkles, Award, TrendingUp, Gem } from 'lucide-react';

const TOTAL_CORE_SKILLS_FOR_BONUS_CALC = 7; // Number of skills contributing to the global win bonus
const MAX_LEVEL_PER_SKILL = 10;
const TOTAL_CORE_SKILL_POINTS = TOTAL_CORE_SKILLS_FOR_BONUS_CALC * MAX_LEVEL_PER_SKILL;
const GLOBAL_WIN_BONUS_PER_POINT = 0.01 / TOTAL_CORE_SKILL_POINTS; // Each point adds this to the win multiplier factor

export const allSkillDefinitions: SkillDefinition[] = [
  {
    id: 'lucky_streak',
    name: 'Lucky Streak',
    description: 'Cultivate your innate luck to experience more frequent, though not necessarily larger, winning outcomes.',
    icon: Zap,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard win rates. Upgrade to enhance your overall winnings.";
      return `Increases overall Credit winnings. Current contribution: +${(level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(4)}% to win multiplier.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'luck',
  },
  {
    id: 'strategic_mind',
    name: 'Strategic Mind (Intelligence)',
    description: 'Sharpen your cognitive abilities to better identify opportunities and improve outcomes in games involving choice or pattern recognition.',
    icon: Brain,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard game outcomes. Upgrade to enhance your overall winnings.";
      return `Increases overall Credit winnings. Current contribution: +${(level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(4)}% to win multiplier.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'strategy',
  },
  {
    id: 'iron_resolve',
    name: 'Iron Resolve (Resilience)',
    description: 'Fortify your determination, allowing for a chance to recover from setbacks or gain minor consolations during losing streaks.',
    icon: ShieldCheck,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard resilience. Upgrade to enhance your overall winnings.";
      return `Increases overall Credit winnings. Current contribution: +${(level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(4)}% to win multiplier.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'endurance',
  },
  {
    id: 'quick_reflexes',
    name: 'Quick Reflexes',
    description: 'Hone your reaction time for games or bonus features where speed and quick decisions can lead to better results.',
    icon: Rabbit,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard reaction benefits. Upgrade to enhance your overall winnings.";
      return `Increases overall Credit winnings. Current contribution: +${(level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(4)}% to win multiplier.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'strategy',
  },
  {
    id: 'keen_intuition',
    name: 'Keen Intuition',
    description: 'Trust your gut feelings. This skill subtly guides you towards more favorable outcomes in chance-based scenarios.',
    icon: Eye,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard intuition. Upgrade to enhance your overall winnings.";
      return `Increases overall Credit winnings. Current contribution: +${(level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(4)}% to win multiplier.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'luck',
  },
  {
    id: 'gamblers_wisdom',
    name: "Gambler's Wisdom",
    description: 'Gain deeper insights into game mechanics, potentially unlocking information or slightly better odds on specific, less common winning combinations.',
    icon: BarChart,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Basic game understanding. Upgrade to enhance your overall winnings.";
      return `Increases overall Credit winnings. Current contribution: +${(level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(4)}% to win multiplier.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'strategy',
  },
  {
    id: 'fortune',
    name: 'Fortune',
    description: 'Develop an uncanny ability to be in the right place at the right time for the casino\'s grandest prizes.',
    icon: Gem,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard luck for big prizes. Upgrade to enhance your overall winnings.";
      return `Increases overall Credit winnings. Current contribution: +${(level * GLOBAL_WIN_BONUS_PER_POINT * 100).toFixed(4)}% to win multiplier.`;
    },
    getEffectValue: (level) => level * GLOBAL_WIN_BONUS_PER_POINT,
    category: 'rewards',
  },
  {
    id: 'xp_harvester',
    name: 'XP Harvester',
    description: 'Become more efficient at learning from every play, permanently increasing all XP gains.',
    icon: TrendingUp,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard XP gain.";
      return `Increases all Experience Points earned from gameplay by ${level * 2}%.`;
    },
    getEffectValue: (level) => level * 0.02, // This returns the XP boost percentage (e.g., 0.02 for 2%, 0.20 for 20%)
    category: 'general',
  }
];

export const getSkillDefinitionById = (id: string): SkillDefinition | undefined => {
  return allSkillDefinitions.find(skill => skill.id === id);
};

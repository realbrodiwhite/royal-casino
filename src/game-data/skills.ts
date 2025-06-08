
import type { SkillDefinition } from '@/types/skills';
// Importing a wider range of icons that might fit the new skills
import { Brain, Zap, ShieldCheck, Rabbit, Eye, BarChart, Sparkles, Award, TrendingUp, Gem } from 'lucide-react';

export const allSkillDefinitions: SkillDefinition[] = [
  {
    id: 'lucky_streak',
    name: 'Lucky Streak',
    description: 'Cultivate your innate luck to experience more frequent, though not necessarily larger, winning outcomes.',
    icon: Zap, // Represents quick, frequent events
    maxLevel: 6,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 120 + Math.pow(currentLevel, 2) * 5,
    effectDescription: (level) => {
      if (level === 0) return "Standard win frequency.";
      return `Subtly increases the chance of forming winning combinations more often (Influence Lvl ${level}).`;
    },
    getEffectValue: (level) => level * 0.001, // Small influence factor for win frequency
    category: 'luck',
  },
  {
    id: 'strategic_mind',
    name: 'Strategic Mind (Intelligence)',
    description: 'Sharpen your cognitive abilities to better identify opportunities and improve outcomes in games involving choice or pattern recognition.',
    icon: Brain,
    maxLevel: 6,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 200,
    effectDescription: (level) => {
      if (level === 0) return "Standard bonus feature trigger rate.";
      // Example: Could influence "BonusWinRate"
      return `Slightly enhances your ability to trigger bonus rounds and special game features (Influence Lvl ${level}).`;
    },
    getEffectValue: (level) => level * 0.002, // Influence factor for bonus triggers
    category: 'strategy',
  },
  {
    id: 'iron_resolve',
    name: 'Iron Resolve (Resilience)',
    description: 'Fortify your determination, allowing for a chance to recover from setbacks or gain minor consolations during losing streaks.',
    icon: ShieldCheck,
    maxLevel: 6,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 180,
    effectDescription: (level) => {
      if (level === 0) return "Standard play through losses.";
      return `Provides a small chance for a 'Consolation Credit' after a series of non-winning outcomes (Influence Lvl ${level}).`;
    },
    getEffectValue: (level) => level * 0.0005, // Small chance for a minor rebate
    category: 'endurance',
  },
  {
    id: 'quick_reflexes',
    name: 'Quick Reflexes',
    description: 'Hone your reaction time for games or bonus features where speed and quick decisions can lead to better results.',
    icon: Rabbit, // Represents speed
    maxLevel: 6,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 250,
    effectDescription: (level) => {
      if (level === 0) return "Standard decision speed benefits.";
      // Abstracted for casino:
      return `Improves effectiveness in rapid decision-making moments within certain bonus games (Influence Lvl ${level}).`;
    },
    getEffectValue: (level) => level * 0.01, // General effectiveness boost in applicable scenarios
    category: 'strategy', // Could also be general
  },
  {
    id: 'keen_intuition',
    name: 'Keen Intuition',
    description: 'Trust your gut feelings. This skill subtly guides you towards more favorable outcomes in chance-based scenarios.',
    icon: Eye, // Represents insight or sixth sense
    maxLevel: 6,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 160,
    effectDescription: (level) => {
      if (level === 0) return "Standard luck in random events.";
      return `Slightly increases your chances of favorable random events or better paths in bonus games (Influence Lvl ${level}).`;
    },
    getEffectValue: (level) => level * 0.0015, // Influence on positive random outcomes
    category: 'luck',
  },
  {
    id: 'gamblers_wisdom',
    name: "Gambler's Wisdom",
    description: 'Gain deeper insights into game mechanics, potentially unlocking information or slightly better odds on specific, less common winning combinations.',
    icon: BarChart, // Represents analysis and understanding
    maxLevel: 6,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 300,
    effectDescription: (level) => {
      if (level === 0) return "Basic understanding of game payouts.";
      return `May reveal subtle game hints or slightly improve payouts for very specific rare winning patterns (Influence Lvl ${level}).`;
    },
    getEffectValue: (level) => level * 0.0003, // Very small boost to rare specific wins
    category: 'strategy',
  },
  {
    id: 'fortune', // Renamed from fortune_finder
    name: 'Fortune', // Renamed from Fortune Finder
    description: 'Develop an uncanny ability to be in the right place at the right time for the casino\'s grandest prizes.',
    icon: Gem, // Or Sparkles, Award
    maxLevel: 6, 
    costPerLevel: (currentLevel) => (currentLevel + 1) * 500 + Math.pow(currentLevel, 2) * 20, // Expensive
    effectDescription: (level) => {
      if (level === 0) return "Standard jackpot hit rate.";
      // Example: Could influence "JackpotHitRate"
      return `Slightly increases your chances of hitting a jackpot across applicable games (Influence Lvl ${level}).`;
    },
    getEffectValue: (level) => level * 0.0001, // Very small influence factor for jackpots
    category: 'rewards',
  },
  {
    id: 'xp_harvester',
    name: 'XP Harvester',
    description: 'Become more efficient at learning from every play, permanently increasing all XP gains.',
    icon: TrendingUp,
    maxLevel: 6,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 75 + Math.pow(currentLevel,2)*10,
    effectDescription: (level) => {
      if (level === 0) return "Standard XP gain.";
      return `Increases all Experience Points earned from gameplay by ${level * 2}%.`;
    },
    getEffectValue: (level) => level * 0.02, // Direct 2% XP gain per level
    category: 'general',
  }
];

export const getSkillDefinitionById = (id: string): SkillDefinition | undefined => {
  return allSkillDefinitions.find(skill => skill.id === id);
};


import type { SkillDefinition } from '@/types/skills';
// Importing a wider range of icons that might fit the new skills
import { Brain, Zap, ShieldCheck, Rabbit, Eye, BarChart, Sparkles, Award, TrendingUp, Gem } from 'lucide-react';

// Constants for global win bonus calculation are removed as skills no longer affect win amounts.

export const allSkillDefinitions: SkillDefinition[] = [
  {
    id: 'lucky_streak',
    name: 'Lucky Streak',
    description: 'Showcase your dedication and unlock unique cosmetic perks as you level up this skill.',
    icon: Zap,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard player flair. Upgrade for enhanced prestige.";
      return `Grants access to exclusive cosmetic option tier ${level}. Further upgrades unlock more options.`;
    },
    getEffectValue: (level) => null, // Does not directly affect game win probabilities or amounts
    category: 'luck',
  },
  {
    id: 'strategic_mind',
    name: 'Strategic Mind (Intelligence)',
    description: 'Demonstrate your sharp thinking and gain recognition among fellow players.',
    icon: Brain,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard player profile. Upgrade to showcase your intellect.";
      return `Unlocks intellectual-themed profile badge tier ${level}.`;
    },
    getEffectValue: (level) => null, // Does not directly affect game win probabilities or amounts
    category: 'strategy',
  },
  {
    id: 'iron_resolve',
    name: 'Iron Resolve (Resilience)',
    description: 'Display your unwavering commitment to the casino community through unique profile markers.',
    icon: ShieldCheck,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard player resilience. Upgrade to display your steadfastness.";
      return `Awards a resilience-themed profile border tier ${level}.`;
    },
    getEffectValue: (level) => null, // Does not directly affect game win probabilities or amounts
    category: 'endurance',
  },
  {
    id: 'quick_reflexes',
    name: 'Quick Reflexes',
    description: 'Highlights your agility and quick thinking with special visual flairs on your profile.',
    icon: Rabbit,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard profile appearance. Upgrade for dynamic visual effects.";
      return `Unlocks dynamic profile animation tier ${level}.`;
    },
    getEffectValue: (level) => null, // Does not directly affect game win probabilities or amounts
    category: 'strategy',
  },
  {
    id: 'keen_intuition',
    name: 'Keen Intuition',
    description: 'Develop your sixth sense and gain access to exclusive community insights or early game news.',
    icon: Eye,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard community access. Upgrade for deeper insights.";
      return `Grants access to Tier ${level} of exclusive player insights & news.`;
    },
    getEffectValue: (level) => null, // Does not directly affect game win probabilities or amounts
    category: 'luck',
  },
  {
    id: 'gamblers_wisdom',
    name: "Gambler's Wisdom",
    description: 'Become a connoisseur of the casino, unlocking detailed personal game statistics and history features.',
    icon: BarChart,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Basic play tracking. Upgrade for detailed personal analytics.";
      return `Unlocks advanced personal game statistics, viewable on your profile, tier ${level}.`;
    },
    getEffectValue: (level) => null, // Does not directly affect game win probabilities or amounts
    category: 'strategy',
  },
  {
    id: 'fortune',
    name: 'Fortune',
    description: "Attract good fortune and gain recognition with exclusive 'Fortune Favored' titles and profile accolades.",
    icon: Gem,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard player status. Upgrade to be recognized as 'Fortune Favored'.";
      return `Grants 'Fortune Favored' title tier ${level} and associated profile accolades.`;
    },
    getEffectValue: (level) => null, // Does not directly affect game win probabilities or amounts
    category: 'rewards',
  },
  {
    id: 'xp_harvester',
    name: 'XP Harvester',
    description: 'Become more efficient at learning from every play, permanently increasing all XP gains.',
    icon: TrendingUp,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210, // Can adjust cost if it's too valuable
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

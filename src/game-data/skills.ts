
import type { SkillDefinition } from '@/types/skills';
import { BarChart, Gauge, TrendingUp, Zap } from 'lucide-react'; // Example icons

export const allSkillDefinitions: SkillDefinition[] = [
  {
    id: 'slots_savvy',
    name: 'Slots Savvy',
    description: 'Improves your general fortune on slot machines.',
    icon: Zap,
    maxLevel: 5,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 100, // e.g., L1: 100, L2: 200
    effectDescription: (level) => {
      if (level === 0) return "No bonus yet.";
      return `Slightly increases base RTP on all slot games by ${level * 0.1}%.`;
    },
    getEffectValue: (level) => level * 0.001, // 0.1% = 0.001
    category: 'slots',
  },
  {
    id: 'poker_patience',
    name: 'Poker Patience',
    description: 'Increases the chances of being dealt better starting hands in Video Poker.',
    icon: Gauge,
    maxLevel: 3,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 250,
    effectDescription: (level) => {
      if (level === 0) return "Standard hand dealing.";
      return `Slightly higher chance for pairs or better on initial deal (Level ${level}). Effect is subtle.`;
    },
    getEffectValue: (level) => level * 0.005, // Represents a small probabilistic shift
    category: 'poker',
  },
  {
    id: 'bingo_instinct',
    name: 'Bingo Instinct',
    description: 'Your keen eye helps you spot called numbers faster in Bingo.',
    icon: BarChart,
    maxLevel: 4,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 150,
    effectDescription: (level) => {
      if (level === 0) return "Manual daubing speed.";
      // This effect would be more about UI hints or auto-features in a real implementation
      return `Potentially highlights called numbers on your card faster (Level ${level}).`;
    },
    category: 'bingo',
  },
  {
    id: 'xp_boost_general',
    name: 'Learning Curve',
    description: 'Permanently increases all XP gains from playing games.',
    icon: TrendingUp,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 75 + Math.pow(currentLevel,2)*10, // progressively more expensive
    effectDescription: (level) => {
      if (level === 0) return "Standard XP gain.";
      return `Increases all XP earned by ${level * 2}%.`;
    },
    getEffectValue: (level) => level * 0.02, // 2% = 0.02
    category: 'general',
  },
];

export const getSkillDefinitionById = (id: string): SkillDefinition | undefined => {
  return allSkillDefinitions.find(skill => skill.id === id);
};

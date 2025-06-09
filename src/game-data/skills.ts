
import type { SkillDefinition } from '@/types/skills';
import { Sparkles, Anchor, Timer } from 'lucide-react';

export const allSkillDefinitions: SkillDefinition[] = [
  {
    id: 'luck',
    name: 'Luck',
    description: 'Embrace good fortune! Higher levels unlock unique "Lucky Star" profile badges and exclusive cosmetic items.',
    icon: Sparkles,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard player flair. Upgrade for enhanced prestige.";
      return `Grants access to 'Lucky Star' profile badge tier ${level} and related cosmetics.`;
    },
    getEffectValue: () => null,
    category: 'luck',
  },
  {
    id: 'faith',
    name: 'Faith',
    description: 'Show your steadfast dedication. Upgrading Faith grants access to special "Loyalist" chat flairs and early announcements for new game content.',
    icon: Anchor,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard community access. Upgrade for exclusive insights.";
      return `Unlocks 'Loyalist' chat flair tier ${level} and access to early game announcements.`;
    },
    getEffectValue: () => null,
    category: 'rewards',
  },
  {
    id: 'timing',
    name: 'Timing',
    description: 'Master the art of perfect timing. Each level unlocks a unique, animated profile border celebrating your precision and insight.',
    icon: Timer,
    maxLevel: 10,
    costPerLevel: (currentLevel) => (currentLevel + 1) * 210,
    effectDescription: (level) => {
      if (level === 0) return "Standard profile appearance. Upgrade for dynamic visual effects.";
      return `Unlocks dynamic animated profile border tier ${level}.`;
    },
    getEffectValue: () => null,
    category: 'general',
  },
];

export const getSkillDefinitionById = (id: string): SkillDefinition | undefined => {
  return allSkillDefinitions.find(skill => skill.id === id);
};

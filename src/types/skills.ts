
export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>; // Optional: Lucide icon or custom SVG
  /**
   * Calculates the XP cost to upgrade from the currentLevel to currentLevel + 1.
   * @param currentLevel The current level of the skill (0 if not yet acquired).
   * @returns The XP cost for the next level.
   */
  costPerLevel: (currentLevel: number) => number;
  /**
   * Returns a string describing the effect of the skill at a given level.
   * This should explain how the skill influences game outcomes (e.g., win frequency, bonus rates).
   * @param level The level of the skill.
   * @returns A string describing the effect.
   */
  effectDescription: (level: number) => string;
  /**
   * Returns the numerical value representing the "strength" or "influence" of the effect at a given level.
   * This might be used by game logic to bias RNG or decision trees, rather than a direct RTP add.
   * @param level The level of the skill.
   * @returns A number representing the effect's influence value, or null if not applicable.
   */
  getEffectValue?: (level: number) => number | null;
  prerequisites?: { skillId: string; level: number }[]; // Optional: Other skills required
  category?: 'luck' | 'strategy' | 'endurance' | 'rewards' | 'general'; // More thematic categories
}

export interface UserSkillProgress {
  skillId: string;
  currentLevel: number;
}

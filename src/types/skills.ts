
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
   * @param level The level of the skill.
   * @returns A string describing the effect.
   */
  effectDescription: (level: number) => string;
  /**
   * Returns the numerical value of the effect at a given level, if applicable.
   * This might be used by game logic.
   * @param level The level of the skill.
   * @returns A number representing the effect value, or null if not applicable/purely descriptive.
   */
  getEffectValue?: (level: number) => number | null;
  prerequisites?: { skillId: string; level: number }[]; // Optional: Other skills required
  category?: 'slots' | 'poker' | 'bingo' | 'general';
}

export interface UserSkillProgress {
  skillId: string;
  currentLevel: number;
}

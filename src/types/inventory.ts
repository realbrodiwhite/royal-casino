
export type ItemEffectType = 
  | 'WIN_MULTIPLIER_BOOST' // Multiplies credit winnings from games
  | 'JACKPOT_CHANCE_BOOST' // For games with jackpots (social currency jackpots)
  | 'BONUS_TRIGGER_BOOST' // For games with bonus rounds
  | 'XP_MULTIPLIER' // General XP boost
  | 'FREE_SPINS' // Specific to slots (free plays using Credits)
  | 'BET_INSURANCE'; // e.g., next Credit bet is risk-free up to X amount

export interface ItemEffect {
  type: ItemEffectType;
  value: number; // e.g., 1.1 for 10% win multiplier, or 5 for 5 free spins
  durationMinutes?: number; // Duration of the effect in minutes, if applicable
  appliesToGameType?: string[]; // e.g., ['slots', 'poker'] or null/undefined for all
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  icon: string; // Could be a path to an SVG or a Lucide icon name
  category: 'snack' | 'tobacco' | 'liquor' | 'beverage' | 'charm' | 'special';
  cost: number; // In Kings Coin (premium currency)
  effects: ItemEffect[];
  isConsumable: boolean; // true if one-time use, false if permanent (like a charm)
  stackable?: boolean; // Can the user have multiple of these in their backpack?
  maxStack?: number; // If stackable, what's the max quantity?
  flavorText?: string; // A fun, thematic description
}

export interface BackpackItem {
  itemId: string; // References ShopItem.id
  quantity: number;
}

export interface ActiveBuff {
  itemId: string;
  effect: ItemEffect;
  startTime: number; // timestamp
  endTime: number; // timestamp, if duration based
}

export interface UserInventory {
  userId: string;
  backpack: BackpackItem[];
  activeBuffs: ActiveBuff[];
}

    
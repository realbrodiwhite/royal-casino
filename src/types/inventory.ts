
export type ItemEffectType = 
  | 'WIN_MULTIPLIER_BOOST' 
  | 'JACKPOT_CHANCE_BOOST' 
  | 'BONUS_TRIGGER_BOOST' 
  | 'XP_MULTIPLIER' 
  | 'FREE_SPINS' 
  | 'BET_INSURANCE';

export interface ItemEffect {
  type: ItemEffectType;
  value: number; 
  durationMinutes?: number; 
  appliesToGameType?: string[]; 
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  icon: string; 
  category: 'snack' | 'tobacco' | 'liquor' | 'beverage' | 'charm' | 'special';
  cost: number; // Cost is now in Credits
  effects: ItemEffect[];
  isConsumable: boolean; 
  stackable?: boolean; 
  maxStack?: number; 
  flavorText?: string; 
}

export interface BackpackItem {
  itemId: string; 
  quantity: number;
}

export interface ActiveBuff {
  itemId: string;
  effect: ItemEffect;
  startTime: number; 
  endTime: number; 
}

export interface UserInventory {
  userId: string;
  backpack: BackpackItem[];
  activeBuffs: ActiveBuff[];
}


import type { ShopItem } from '@/types/inventory';

export const allShopItems: ShopItem[] = [
  {
    id: 'beer_rtp_boost', // ID kept for now, effect changed
    name: 'Craft Brew',
    description: 'A refreshing ale that temporarily increases Credit winnings from slot games by 10% for 2 minutes.',
    icon: 'Beer', 
    category: 'beverage',
    cost: 200, // Cost in Credits
    effects: [
      { type: 'WIN_MULTIPLIER_BOOST', value: 1.1, durationMinutes: 2, appliesToGameType: ['slots'] } 
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 10,
    flavorText: "Tastes like bigger wins... or at least a good time!"
  },
  {
    id: 'cigar_jackpot_boost',
    name: 'Lucky Stogie',
    description: 'A fine cigar said to slightly increase your chances of hitting a Credit jackpot in slots for 5 minutes.',
    icon: 'Cigarette', 
    category: 'tobacco',
    cost: 500, // Cost in Credits
    effects: [
      { type: 'JACKPOT_CHANCE_BOOST', value: 0.01, durationMinutes: 5, appliesToGameType: ['slots'] } 
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 5,
    flavorText: "Puff, puff, pass... the big Credit prize to me!"
  },
  {
    id: 'energy_drink_xp',
    name: 'Zing! Energy Drink',
    description: 'Supercharge your gameplay and level up faster! Grants 1.5x XP for 10 minutes.',
    icon: 'Zap', 
    category: 'beverage',
    cost: 150, // Cost in Credits
    effects: [
      { type: 'XP_MULTIPLIER', value: 1.5, durationMinutes: 10 } 
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 20,
    flavorText: "Warning: May cause spontaneous high-fives."
  },
  {
    id: 'four_leaf_clover',
    name: 'Four-Leaf Clover Charm',
    description: 'A permanent charm that slightly increases your chances of triggering bonus features.',
    icon: 'Leaf', 
    category: 'charm',
    cost: 2000, // Cost in Credits
    effects: [
      { type: 'BONUS_TRIGGER_BOOST', value: 0.005 } 
    ],
    isConsumable: false, 
    stackable: false,
    flavorText: "The luck of the Irish, always by your side."
  },
  {
    id: 'free_spins_voucher',
    name: 'Golden Spin Voucher',
    description: 'Grants 5 free plays (using Credits) on any slot machine.',
    icon: 'Ticket', 
    category: 'special',
    cost: 300, // Cost in Credits
    effects: [
      { type: 'FREE_SPINS', value: 5, appliesToGameType: ['slots'] }
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 3,
    flavorText: "Spin it to win Credits, on the house!"
  },
  {
    id: 'cherry_magnet_charm',
    name: 'Cherry Magnet Charm',
    description: 'A special charm that makes Cherries slightly more likely to appear on slot reels.',
    icon: 'Sparkles', // Using Sparkles for now, could use CherrySymbol's SVG string if preferred
    category: 'charm',
    cost: 1200, // Credits
    effects: [
      { 
        type: 'SYMBOL_WEIGHT_BOOST', 
        symbolId: 'CherrySymbol', // Specific to CherrySymbol
        value: 10, // Adds 10 to the base weight of CherrySymbol
        appliesToGameType: ['slots'] 
      }
    ],
    isConsumable: false,
    stackable: false,
    flavorText: "Feeling fruity? This charm might help!"
  }
];

export const getItemById = (id: string): ShopItem | undefined => {
  return allShopItems.find(item => item.id === id);
};

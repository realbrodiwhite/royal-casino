
import type { ShopItem } from '@/types/inventory';

export const allShopItems: ShopItem[] = [
  {
    id: 'beer_rtp_boost', // id can remain for now, but effect changed
    name: 'Craft Brew',
    description: 'A refreshing ale that seems to make your wins a bit bigger!',
    icon: 'Beer', 
    category: 'beverage',
    cost: 20, // Kings Coin
    effects: [
      // Effect changed from RTP_BOOST to WIN_MULTIPLIER_BOOST
      { type: 'WIN_MULTIPLIER_BOOST', value: 1.1, durationMinutes: 2, appliesToGameType: ['slots'] } // 10% larger Credit wins for 2 mins
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 10,
    flavorText: "Tastes like bigger wins... or at least a good time!"
  },
  {
    id: 'cigar_jackpot_boost',
    name: 'Lucky Stogie',
    description: 'A fine cigar said to attract larger Credit jackpots.',
    icon: 'Cigarette', 
    category: 'tobacco',
    cost: 50, // Kings Coin
    effects: [
      { type: 'JACKPOT_CHANCE_BOOST', value: 0.01, durationMinutes: 5, appliesToGameType: ['slots'] } // 1% higher chance for social jackpots for 5 mins
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 5,
    flavorText: "Puff, puff, pass... the big Credit prize to me!"
  },
  {
    id: 'energy_drink_xp',
    name: 'Zing! Energy Drink',
    description: 'Supercharge your gameplay and level up faster!',
    icon: 'Zap', 
    category: 'beverage',
    cost: 15, // Kings Coin
    effects: [
      { type: 'XP_MULTIPLIER', value: 1.5, durationMinutes: 10 } // 1.5x XP for 10 minutes
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 20,
    flavorText: "Warning: May cause spontaneous high-fives."
  },
  {
    id: 'four_leaf_clover',
    name: 'Four-Leaf Clover Charm',
    description: 'A permanent charm that slightly increases your luck for bonus features.',
    icon: 'Leaf', 
    category: 'charm',
    cost: 200, // Kings Coin
    effects: [
      { type: 'BONUS_TRIGGER_BOOST', value: 0.005 } // 0.5% bonus trigger boost, permanent
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
    cost: 30, // Kings Coin
    effects: [
      { type: 'FREE_SPINS', value: 5, appliesToGameType: ['slots'] }
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 3,
    flavorText: "Spin it to win Credits, on the house!"
  }
];

export const getItemById = (id: string): ShopItem | undefined => {
  return allShopItems.find(item => item.id === id);
};

    
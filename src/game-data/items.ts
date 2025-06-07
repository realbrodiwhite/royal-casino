
import type { ShopItem } from '@/types/inventory';

// Placeholder icons - in a real app, these would be actual SVG components or image paths
// For Lucide icons, just use the name string. For custom SVGs, you'd handle rendering them.

export const allShopItems: ShopItem[] = [
  {
    id: 'beer_rtp_boost',
    name: 'Craft Brew',
    description: 'A refreshing ale that sharpens your senses!',
    icon: 'Beer', // Lucide Icon Name
    category: 'beverage',
    cost: 20, // Premium currency
    effects: [
      { type: 'RTP_BOOST', value: 0.01, durationMinutes: 2, appliesToGameType: ['slots'] } // 1% RTP boost for 2 mins
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 10,
    flavorText: "Tastes like victory... or at least a good time!"
  },
  {
    id: 'cigar_jackpot_boost',
    name: 'Lucky Stogie',
    description: 'A fine cigar said to attract fortune.',
    icon: 'Cigarette', // Lucide Icon Name (closest match, or use custom SVG)
    category: 'tobacco',
    cost: 50,
    effects: [
      { type: 'JACKPOT_CHANCE_BOOST', value: 0.01, durationMinutes: 5, appliesToGameType: ['slots'] } // 1% higher jackpot chance for 5 mins
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 5,
    flavorText: "Puff, puff, pass... the jackpot to me!"
  },
  {
    id: 'energy_drink_xp',
    name: 'Zing! Energy Drink',
    description: 'Supercharge your gameplay and level up faster!',
    icon: 'Zap', // Lucide Icon Name
    category: 'beverage',
    cost: 15,
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
    description: 'A permanent charm that slightly increases your luck on all games.',
    icon: 'Leaf', // Lucide Icon Name
    category: 'charm',
    cost: 200,
    effects: [
      // Example of a small, permanent, general boost. Exact mechanics TBD.
      // This might be a passive flag rather than an "effect" handled by game logic.
      // For now, let's say it subtly influences "luck" based events.
      { type: 'BONUS_TRIGGER_BOOST', value: 0.005 } // 0.5% bonus trigger boost, permanent
    ],
    isConsumable: false, // Permanent
    stackable: false,
    flavorText: "The luck of the Irish, always by your side."
  },
  {
    id: 'free_spins_voucher',
    name: 'Golden Spin Voucher',
    description: 'Grants 5 free spins on any slot machine.',
    icon: 'Ticket', // Lucide Icon Name
    category: 'special',
    cost: 30, // Or awarded
    effects: [
      { type: 'FREE_SPINS', value: 5, appliesToGameType: ['slots'] }
    ],
    isConsumable: true,
    stackable: true,
    maxStack: 3,
    flavorText: "Spin it to win it, on the house!"
  }
];

export const getItemById = (id: string): ShopItem | undefined => {
  return allShopItems.find(item => item.id === id);
};

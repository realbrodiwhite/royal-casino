
import type { SlotGameThemeConfig } from '@/types/game-theme';

export const classicSlotsTheme: SlotGameThemeConfig = {
  gameType: 'slots',
  themeId: 'classic-slots',
  displayName: 'Classic Fruit Slots',
  description: 'A timeless slot machine experience with traditional symbols.',
  grid: {
    rows: 3,
    cols: 3,
  },
  symbols: [
    { id: 'CherrySymbol', weight: 40 },
    { id: 'BellSymbol', weight: 30 },
    { id: 'GoldCoinSymbol', weight: 20 },
    { id: 'DiamondSymbol', weight: 10 },
  ],
  // Paylines are 0-indexed: [row, col]
  paylines: [
    [[1, 0], [1, 1], [1, 2]], // Middle row
    // [[0, 0], [0, 1], [0, 2]], // Top row (optional)
    // [[2, 0], [2, 1], [2, 2]], // Bottom row (optional)
  ],
  // Payouts are multipliers of the spin cost
  // Key: symbolId, Inner Key: count of matching symbols, Value: payout multiplier
  paytable: {
    "CherrySymbol": { 3: 5, 2: 1 }, // 3 Cherries pay 5x, 2 Cherries pay 1x
    "BellSymbol": { 3: 10 },
    "GoldCoinSymbol": { 3: 20 },
    "DiamondSymbol": { 3: 50 },
  },
  backgroundAsset: 'bg-classic-slots-background',
  soundAssets: {
    spin: '/audio/themes/classic-slots/spin.mp3',
    winSmall: '/audio/themes/classic-slots/win-small.mp3',
    winMedium: '/audio/themes/classic-slots/win-medium.mp3',
  },
};

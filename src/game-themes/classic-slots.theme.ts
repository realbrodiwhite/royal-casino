
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
    { id: 'CherrySymbol', weight: 40 }, // Cherries are common
    { id: 'BellSymbol', weight: 30 },
    { id: 'GoldCoinSymbol', weight: 20 },
    { id: 'DiamondSymbol', weight: 10 }, // Diamonds are rarer
  ],
  backgroundAsset: 'bg-classic-slots-background', // Example: a CSS class for the background
  soundAssets: {
    spin: '/audio/themes/classic-slots/spin.mp3',
    winSmall: '/audio/themes/classic-slots/win-small.mp3',
    winMedium: '/audio/themes/classic-slots/win-medium.mp3',
  },
};

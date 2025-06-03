
import type { SlotGameThemeConfig } from '@/types/game-theme';

export const megaSlotsTheme: SlotGameThemeConfig = {
  gameType: 'slots',
  themeId: 'mega-slots',
  displayName: 'Mega Payout Slots',
  description: 'A larger grid with more ways to win big!',
  grid: {
    rows: 5,
    cols: 6,
  },
  symbols: [
    { id: 'CherrySymbol', weight: 50 },
    { id: 'BellSymbol', weight: 25 },
    { id: 'GoldCoinSymbol', weight: 15 },
    { id: 'DiamondSymbol', weight: 10 },
    // Example: Add more symbols with different weights if 'SevenSymbol' or 'BarSymbol' were defined
    // { id: 'SevenSymbol', weight: 5 },
    // { id: 'BarSymbol', weight: 20 },
  ],
  backgroundAsset: 'bg-mega-slots-background', // Example: a CSS class
  soundAssets: {
    spin: '/audio/themes/mega-slots/spin.mp3',
    winLarge: '/audio/themes/mega-slots/win-large.mp3',
    jackpot: '/audio/themes/mega-slots/jackpot.mp3',
  },
};


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
    'CherrySymbol',
    'DiamondSymbol',
    'GoldCoinSymbol',
    'BellSymbol',
    // 'SevenSymbol', // Placeholder for more symbols
    // 'BarSymbol',   // Placeholder for more symbols
  ],
  backgroundAsset: 'bg-mega-slots-background', // Example: a CSS class
  soundAssets: {
    spin: '/audio/themes/mega-slots/spin.mp3',
    winLarge: '/audio/themes/mega-slots/win-large.mp3',
    jackpot: '/audio/themes/mega-slots/jackpot.mp3',
  },
};

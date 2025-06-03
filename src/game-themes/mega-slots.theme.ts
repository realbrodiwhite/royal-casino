
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
  ],
  paylines: [
    [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5]], // Top row
    [[1,0], [1,1], [1,2], [1,3], [1,4], [1,5]], // Second row
    [[2,0], [2,1], [2,2], [2,3], [2,4], [2,5]], // Middle row
    [[3,0], [3,1], [3,2], [3,3], [3,4], [3,5]], // Fourth row
    [[4,0], [4,1], [4,2], [4,3], [4,4], [4,5]], // Bottom row
    // Add diagonal or other patterns as desired
    // [[0,0], [1,1], [2,2], [3,3], [4,4]], // Example Diagonal
  ],
  paytable: {
    "CherrySymbol":   { 6: 100, 5: 40, 4: 10, 3: 2, 2: 0.5 },
    "BellSymbol":     { 6: 250, 5: 100, 4: 25, 3: 5 },
    "GoldCoinSymbol": { 6: 500, 5: 200, 4: 50, 3: 10 },
    "DiamondSymbol":  { 6: 1000, 5: 400, 4: 100, 3: 20 },
  },
  backgroundAsset: 'bg-mega-slots-background',
  soundAssets: {
    spin: '/audio/themes/mega-slots/spin.mp3',
    winLarge: '/audio/themes/mega-slots/win-large.mp3',
    jackpot: '/audio/themes/mega-slots/jackpot.mp3',
  },
};

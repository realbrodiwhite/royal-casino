
import type { SlotGameThemeConfig } from '@/types/game-theme';

export const jungleJewelsTheme: SlotGameThemeConfig = {
  gameType: 'slots',
  themeId: 'jungle-jewels',
  displayName: 'Jungle Jewels',
  description: 'Venture into the wild for sparkling gems and exotic creatures.',
  grid: {
    rows: 4,
    cols: 5,
  },
  symbols: [
    { id: 'EmeraldSymbol', weight: 15 },
    { id: 'RubySymbol', weight: 20 },
    { id: 'MonkeySymbol', weight: 25 },
    { id: 'ParrotSymbol', weight: 30 },
    { id: 'DiamondSymbol', weight: 10 }, // Reusing
  ],
  paylines: [ // Example paylines for 4x5 grid
    [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]], // Second row from top
    [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]], // Third row from top
    [[0, 0], [1, 1], [2, 2], [3, 3], [3, 4]], // Diagonal
    [[3, 0], [2, 1], [1, 2], [0, 3], [0, 4]], // Reverse Diagonal
    [[0,0],[0,1],[0,2],[0,3],[0,4]], // Top row
    [[3,0],[3,1],[3,2],[3,3],[3,4]], // Bottom row
  ],
  paytable: {
    "EmeraldSymbol": { 5: 750, 4: 150, 3: 30 },
    "RubySymbol":    { 5: 400, 4: 100, 3: 20 },
    "MonkeySymbol":  { 5: 200, 4: 50,  3: 10 },
    "ParrotSymbol":  { 5: 100, 4: 25,  3: 5 },
    "DiamondSymbol": { 5: 80,  4: 20,  3: 4 },
  },
  backgroundAsset: 'bg-gradient-to-br from-green-500 to-yellow-600', // Example jungle background
  soundAssets: {
    spin: '/audio/placeholder/spin-jungle.mp3',
    winSmall: '/audio/placeholder/win-monkey.mp3',
    winMedium: '/audio/placeholder/win-jewels.mp3',
  },
};

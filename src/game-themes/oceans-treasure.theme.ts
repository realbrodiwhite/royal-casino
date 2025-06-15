
import type { SlotGameThemeConfig } from '@/types/game-theme';

export const oceansTreasureTheme: SlotGameThemeConfig = {
  gameType: 'slots',
  themeId: 'oceans-treasure',
  displayName: "Ocean's Treasure",
  description: 'Dive deep for sunken riches and mysterious marine life.',
  grid: {
    rows: 3,
    cols: 5,
  },
  symbols: [
    { id: 'PearlSymbol', weight: 15 },
    { id: 'ClamSymbol', weight: 20 },
    { id: 'FishSymbol', weight: 25 },
    { id: 'AnchorSymbol', weight: 30 },
    { id: 'GoldCoinSymbol', weight: 10 }, // Reusing
  ],
  paylines: [
    [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]], // Middle row
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], // Top row
    [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]], // Bottom row
    [[0, 0], [1, 1], [2, 2], [1, 3], [0, 4]], // V-shape
    [[2, 0], [1, 1], [0, 2], [1, 3], [2, 4]], // Inverted V-shape
  ],
  paytable: {
    "PearlSymbol":    { 5: 500, 4: 100, 3: 25 },
    "ClamSymbol":     { 5: 250, 4: 75,  3: 15 },
    "FishSymbol":     { 5: 100, 4: 30,  3: 10 },
    "AnchorSymbol":   { 5: 75,  4: 20,  3: 5 },
    "GoldCoinSymbol": { 5: 50,  4: 15,  3: 3 },
  },
  backgroundAsset: 'bg-gradient-to-b from-blue-400 to-blue-700', // Example underwater background
  soundAssets: {
    spin: '/audio/placeholder/spin-bubbles.mp3',
    winSmall: '/audio/placeholder/win-splash.mp3',
    winMedium: '/audio/placeholder/win-treasure.mp3',
  },
};

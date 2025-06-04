
import type { SlotGameThemeConfig } from '@/types/game-theme';

export const horrificHalloweenTheme: SlotGameThemeConfig = {
  gameType: 'slots',
  themeId: 'horrific-halloween',
  displayName: 'Horrific Halloween Slots',
  description: 'A spooky slot adventure with ghoulish symbols and frightful wins!',
  grid: {
    rows: 3,
    cols: 5,
  },
  symbols: [
    { id: 'PumpkinSymbol', weight: 30 }, // Assumes PumpkinSymbol.tsx will be created
    { id: 'GhostSymbol', weight: 25 },   // Assumes GhostSymbol.tsx will be created
    { id: 'BatSymbol', weight: 20 },     // Assumes BatSymbol.tsx will be created
    { id: 'WitchHatSymbol', weight: 15 },// Assumes WitchHatSymbol.tsx will be created
    { id: 'CherrySymbol', weight: 10 }, // Reusing an existing symbol
  ],
  // Paylines are 0-indexed: [row, col] for a 3x5 grid
  paylines: [
    [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]], // Middle row
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], // Top row
    [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]], // Bottom row
    [[0, 0], [1, 1], [2, 2], [1, 3], [0, 4]], // V-shape
    [[2, 0], [1, 1], [0, 2], [1, 3], [2, 4]], // Inverted V-shape
  ],
  paytable: {
    "PumpkinSymbol": { 5: 200, 4: 75, 3: 20 },
    "GhostSymbol": { 5: 150, 4: 60, 3: 15 },
    "BatSymbol": { 5: 100, 4: 40, 3: 10 },
    "WitchHatSymbol": { 5: 75, 4: 30, 3: 5 },
    "CherrySymbol": { 5: 50, 4: 20, 3: 2 }, // Adjusted payout for this theme
  },
  backgroundAsset: 'bg-halloween-creepy-night', // Example class, would need CSS definition
  soundAssets: {
    spin: '/audio/themes/halloween/spin-creepy.mp3',
    winSmall: '/audio/themes/halloween/win-ghostly.mp3',
    winMedium: '/audio/themes/halloween/win-cackle.mp3',
    winLarge: '/audio/themes/halloween/win-thunder.mp3',
  },
};

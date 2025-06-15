
import type { SlotGameThemeConfig } from '@/types/game-theme';

export const galacticGemsTheme: SlotGameThemeConfig = {
  gameType: 'slots',
  themeId: 'galactic-gems',
  displayName: 'Galactic Gems',
  description: 'Explore the cosmos for otherworldly crystals and treasures.',
  grid: {
    rows: 3,
    cols: 4,
  },
  symbols: [
    { id: 'AmethystCrystalSymbol', weight: 20 },
    { id: 'SapphireCrystalSymbol', weight: 25 },
    { id: 'AlienCoinSymbol', weight: 30 },
    { id: 'PlanetSymbol', weight: 15 },
    { id: 'BellSymbol', weight: 10 }, // Reusing
  ],
  paylines: [ // Example paylines for 3x4 grid
    [[1, 0], [1, 1], [1, 2], [1, 3]], // Middle row
    [[0, 0], [0, 1], [0, 2], [0, 3]], // Top row
    [[2, 0], [2, 1], [2, 2], [2, 3]], // Bottom row
    [[0,0],[1,1],[2,2],[2,3]], // Angled
  ],
  paytable: {
    "AmethystCrystalSymbol": { 4: 300, 3: 50 },
    "SapphireCrystalSymbol": { 4: 200, 3: 40 },
    "AlienCoinSymbol":       { 4: 100, 3: 20 },
    "PlanetSymbol":          { 4: 500, 3: 100 }, // Rare planet
    "BellSymbol":            { 4: 50,  3: 10 },
  },
  backgroundAsset: 'bg-gradient-to-tl from-indigo-800 to-purple-900', // Example space background
  soundAssets: {
    spin: '/audio/placeholder/spin-space.mp3',
    winSmall: '/audio/placeholder/win-crystal.mp3',
    winMedium: '/audio/placeholder/win-alien.mp3',
  },
};

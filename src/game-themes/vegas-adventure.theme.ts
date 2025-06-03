
import type { SlotGameThemeConfig } from '@/types/game-theme';

export const vegasAdventureTheme: SlotGameThemeConfig = {
  gameType: 'slots',
  themeId: 'vegas-adventure',
  displayName: 'Vegas Adventure Slots',
  description: 'Experience the thrill of Vegas with more lines and bigger potential wins!',
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
    // Example Diagonal (uncomment to add)
    // [[0,0], [1,1], [2,2], [3,3], [4,4]], 
  ],
  paytable: {
    "CherrySymbol":   { 6: 100, 5: 40, 4: 10, 3: 2, 2: 0.5 },
    "BellSymbol":     { 6: 250, 5: 100, 4: 25, 3: 5 },
    "GoldCoinSymbol": { 6: 500, 5: 200, 4: 50, 3: 10 },
    "DiamondSymbol":  { 6: 1000, 5: 400, 4: 100, 3: 20 },
  },
  backgroundAsset: 'bg-vegas-adventure-background', // Placeholder class
  soundAssets: {
    spin: '/audio/themes/vegas-adventure/spin.mp3',
    winLarge: '/audio/themes/vegas-adventure/win-large.mp3',
    jackpot: '/audio/themes/vegas-adventure/jackpot.mp3',
  },
};

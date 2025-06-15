
import type { SlotGameThemeConfig } from '@/types/game-theme';

export const tripleDiamondTheme: SlotGameThemeConfig = {
  gameType: 'slots',
  themeId: 'triple-diamond',
  displayName: 'Triple Diamond',
  description: 'Classic slot action with a focus on high-paying diamonds.',
  grid: {
    rows: 3,
    cols: 3,
  },
  symbols: [
    { id: 'DiamondSymbol', weight: 20 },
    { id: 'BellSymbol', weight: 30 },
    { id: 'CherrySymbol', weight: 50 },
  ],
  paylines: [
    [[1, 0], [1, 1], [1, 2]], // Middle row
    [[0, 0], [0, 1], [0, 2]], // Top row
    [[2, 0], [2, 1], [2, 2]], // Bottom row
  ],
  paytable: {
    "DiamondSymbol": { 3: 100, 2: 10 },
    "BellSymbol": { 3: 20 },
    "CherrySymbol": { 3: 5, 2: 1 },
  },
  backgroundAsset: 'bg-gradient-to-b from-slate-700 to-slate-900', // Example background
  soundAssets: {
    spin: '/audio/themes/classic-slots/spin.mp3',
    winSmall: '/audio/themes/classic-slots/win-small.mp3',
    winMedium: '/audio/themes/classic-slots/win-medium.mp3',
    winLarge: '/audio/themes/vegas-adventure/win-large.mp3',
  },
};

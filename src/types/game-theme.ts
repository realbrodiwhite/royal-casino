
export interface SlotSymbolConfig {
  id: string; // e.g., 'cherry', 'diamond'
  // componentName is not directly used; id maps to allSymbolComponents in the page
}

export interface SlotGameThemeConfig {
  gameType: 'slots';
  themeId: string;
  displayName: string;
  description: string;
  grid: {
    /** Number of rows for the slot machine grid (min: 1, max: 5) */
    rows: 1 | 2 | 3 | 4 | 5;
    /** Number of columns for the slot machine grid (min: 3, max: 6) */
    cols: 3 | 4 | 5 | 6;
  };
  /** Array of symbols with their identifiers and weights for this theme. */
  symbols: Array<{
    id: string; // Identifier for the symbol, maps to allSymbolComponents
    weight: number; // Higher weight means more frequent appearance
  }>;
  /** Defines the paylines. Each inner array represents a payline as a list of [row, col] coordinates. */
  paylines: Array<Array<[number, number]>>;
  /** Defines the payouts. Key is symbolId, inner key is count of symbols, value is payout multiplier. */
  paytable: Record<string, Record<number, number>>; // e.g. { "CherrySymbol": { 3: 5, 2: 1 } } means 3 cherries pay 5x bet, 2 cherries pay 1x bet.
  backgroundAsset?: string; // Path or identifier for background
  soundAssets?: {
    spin?: string;
    winSmall?: string;
    winMedium?: string;
    winLarge?: string;
    jackpot?: string;
  };
}

export interface PokerGameThemeConfig {
  gameType: 'poker';
  themeId: string;
  displayName: string;
  description: string;
  cardDeckStyle: string; // e.g., 'classic-red', 'royal-gold'
  tableBackgroundAsset?: string;
  chipSetAsset?: string;
}

export interface BingoGameThemeConfig {
  gameType: 'bingo';
  themeId: string;
  displayName: string;
  description: string;
  callerVoice?: string; // e.g., 'male-energetic', 'female-calm'
  cardStyle?: string; // e.g., 'vintage', 'modern-digital'
  markerStyle?: string; // e.g., 'dab-red', 'chip-transparent'
}

// Add other game type configurations as needed

export type GameThemeConfig =
  | SlotGameThemeConfig
  | PokerGameThemeConfig
  | BingoGameThemeConfig;
// Add other game theme types to the union as they are defined

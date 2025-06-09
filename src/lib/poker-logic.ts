
// src/lib/poker-logic.ts
import { shuffleArray as b3ShuffleArray } from '@/lib/b3-engine';

export type Suit = '♥' | '♦' | '♣' | '♠'; // Hearts, Diamonds, Clubs, Spades
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
  id: string; // e.g., "KH" for King of Hearts, "AS" for Ace of Spades
}

export const SUITS: Suit[] = ['♥', '♦', '♣', '♠'];
export const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, id: `${rank}${suit}` });
    }
  }
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  return b3ShuffleArray(shuffled);
}

// Deals cards from the top of the deck. Modifies the deck.
export function dealCardsFromDeck(deck: Card[], count: number): Card[] {
  if (deck.length < count) {
    throw new Error("Not enough cards in deck to deal.");
  }
  return deck.splice(0, count); // Removes cards from the deck and returns them
}


export type HandRank =
  | "Nothing"
  | "Jacks or Better"
  | "Two Pair"
  | "Three of a Kind"
  | "Straight"
  | "Flush"
  | "Full House"
  | "Four of a Kind"
  | "Straight Flush"
  | "Royal Flush";

export interface EvaluatedHand {
  rank: HandRank;
  payoutMultiplier: number;
}

// Payouts are per credit bet.
export const PAYTABLE: Record<HandRank, number> = {
  "Royal Flush": 250,    // Often higher with max bet, e.g., 800 for 5 credits
  "Straight Flush": 50,
  "Four of a Kind": 25,
  "Full House": 9,
  "Flush": 6,
  "Straight": 4,
  "Three of a Kind": 3,
  "Two Pair": 2,
  "Jacks or Better": 1,
  "Nothing": 0,
};

export const getRankValue = (rank: Rank): number => {
  if (rank === 'A') return 14;
  if (rank === 'K') return 13;
  if (rank === 'Q') return 12;
  if (rank === 'J') return 11;
  if (rank === 'T') return 10;
  return parseInt(rank, 10);
};


export function evaluateHand(hand: Card[]): EvaluatedHand {
  if (hand.length !== 5) return { rank: "Nothing", payoutMultiplier: 0 };

  const rankCounts: Record<Rank, number> = {} as Record<Rank, number>;
  const suitCounts: Record<Suit, number> = {} as Record<Suit, number>;
  const sortedRanks = hand.map(card => getRankValue(card.rank)).sort((a, b) => a - b);

  for (const card of hand) {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
  }

  const isFlush = Object.values(suitCounts).some(count => count === 5);
  
  const rankValues = Object.values(rankCounts);
  const isFourOfAKind = rankValues.includes(4);
  const isThreeOfAKind = rankValues.includes(3);
  const pairs = rankValues.filter(count => count === 2).length;
  const isFullHouse = isThreeOfAKind && pairs === 1;

  // Straight check
  let isStraight = true;
  for (let i = 0; i < sortedRanks.length - 1; i++) {
    if (sortedRanks[i+1] - sortedRanks[i] !== 1) {
      isStraight = false;
      break;
    }
  }
  // Ace-low straight (A, 2, 3, 4, 5)
  if (!isStraight && sortedRanks[0] === 2 && sortedRanks[1] === 3 && sortedRanks[2] === 4 && sortedRanks[3] === 5 && sortedRanks[4] === 14) {
    isStraight = true;
  }
  
  const isRoyalFlush = isStraight && isFlush && sortedRanks[0] === 10 && sortedRanks[4] === 14; // T, J, Q, K, A of same suit

  if (isRoyalFlush) return { rank: "Royal Flush", payoutMultiplier: PAYTABLE["Royal Flush"] };
  if (isStraight && isFlush) return { rank: "Straight Flush", payoutMultiplier: PAYTABLE["Straight Flush"] };
  if (isFourOfAKind) return { rank: "Four of a Kind", payoutMultiplier: PAYTABLE["Four of a Kind"] };
  if (isFullHouse) return { rank: "Full House", payoutMultiplier: PAYTABLE["Full House"] };
  if (isFlush) return { rank: "Flush", payoutMultiplier: PAYTABLE["Flush"] };
  if (isStraight) return { rank: "Straight", payoutMultiplier: PAYTABLE["Straight"] };
  if (isThreeOfAKind) return { rank: "Three of a Kind", payoutMultiplier: PAYTABLE["Three of a Kind"] };
  if (pairs === 2) return { rank: "Two Pair", payoutMultiplier: PAYTABLE["Two Pair"] };
  
  // Jacks or Better (One Pair of J, Q, K, or A)
  if (pairs === 1) {
    const pairRank = (Object.keys(rankCounts) as Rank[]).find(r => rankCounts[r] === 2);
    if (pairRank && ['J', 'Q', 'K', 'A'].includes(pairRank)) {
      return { rank: "Jacks or Better", payoutMultiplier: PAYTABLE["Jacks or Better"] };
    }
  }

  return { rank: "Nothing", payoutMultiplier: PAYTABLE["Nothing"] };
}

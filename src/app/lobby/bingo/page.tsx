
"use client";

import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AppWindow, Ticket, Users } from 'lucide-react'; // Changed icon
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import CreditDisplay from '@/components/game/CreditDisplay';
// XpDisplay removed

const BINGO_COLS = ['B', 'I', 'N', 'G', 'O'] as const;
const NUMBERS_PER_COL: Record<typeof BINGO_COLS[number], { min: number, max: number, count: number }> = {
  B: { min: 1, max: 15, count: 5 },
  I: { min: 16, max: 30, count: 5 },
  N: { min: 31, max: 45, count: 4 }, // N column has 4 numbers + FREE space
  G: { min: 46, max: 60, count: 5 },
  O: { min: 61, max: 75, count: 5 },
};

type BingoNumber = number | 'FREE';
type BingoCardGrid = BingoNumber[][]; // Column-major: grid[col][row]

const generateBingoCard = (): BingoCardGrid => {
  const card: BingoCardGrid = [];
  BINGO_COLS.forEach((colLetter, colIndex) => {
    const { min, max, count } = NUMBERS_PER_COL[colLetter];
    const colNumbers: Set<number> = new Set();
    while (colNumbers.size < count) {
      colNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    const sortedColNumbers = Array.from(colNumbers).sort((a, b) => a - b);
    
    if (colLetter === 'N') {
      // Insert FREE space in the middle of N column (2 numbers, FREE, 2 numbers)
      const nColWithFree: BingoNumber[] = [];
      nColWithFree.push(sortedColNumbers[0]);
      nColWithFree.push(sortedColNumbers[1]);
      nColWithFree.push('FREE');
      nColWithFree.push(sortedColNumbers[2]);
      nColWithFree.push(sortedColNumbers[3]);
      card.push(nColWithFree);
    } else {
      card.push(sortedColNumbers);
    }
  });
  return card; // This is column-major, needs to be transposed for row-major display
};

// Helper to transpose for display
const transposeGrid = (grid: BingoCardGrid): BingoNumber[][] => {
  if (!grid || grid.length === 0) return [];
  return grid[0].map((_, rowIndex) => grid.map(col => col[rowIndex]));
};


export default function BingoPage() {
  const [bingoCard, setBingoCard] = useState<BingoNumber[][]>([]);
  const [daubedCells, setDaubedCells] = useState<boolean[][]>([]);
  const [calledNumbers, setCalledNumbers] = useState<Set<number>>(new Set());
  const [currentCredits, setCurrentCredits] = useState(1000); 
  const [currentXp, setCurrentXp] = useState(0); 
  const [isGameActive, setIsGameActive] = useState(false);
  // TODO: Add more game state: current called number, game messages, win state, etc.

  const initializeNewCard = useCallback(() => {
    const newCardData = generateBingoCard();
    setBingoCard(transposeGrid(newCardData)); // Transpose for display
    setDaubedCells(Array(5).fill(null).map(() => Array(5).fill(false)));
    setCalledNumbers(new Set());
    // setIsGameActive(false); // Or true if auto-starting
  }, []);
  
  useEffect(() => {
    initializeNewCard();
  }, [initializeNewCard]);

  const handleDaub = (row: number, col: number) => {
    if (!isGameActive) return;
    const number = bingoCard[row][col];
    if (typeof number === 'number' && calledNumbers.has(number)) {
      const newDaubs = daubedCells.map(r => [...r]);
      newDaubs[row][col] = !newDaubs[row][col];
      setDaubedCells(newDaubs);
      // TODO: Check for Bingo
    } else if (number === 'FREE' && !daubedCells[row][col]) { // Auto-daub FREE space if not already
      const newDaubs = daubedCells.map(r => [...r]);
      newDaubs[row][col] = true;
      setDaubedCells(newDaubs);
    }
  };

  // Placeholder for starting a game
  const handleStartGame = () => {
    if (currentCredits >= 10) { // Assuming a ticket costs 10 credits
        setCurrentCredits(prev => prev - 10);
        setCurrentXp(prevXp => prevXp + 10);
        initializeNewCard();
        // Auto-daub FREE space at start
        const freeSpaceCoords = findFreeSpace(bingoCard);
        if (freeSpaceCoords) {
          setDaubedCells(prevDaubs => {
            const newDaubs = prevDaubs.map(r => [...r]);
            newDaubs[freeSpaceCoords.row][freeSpaceCoords.col] = true;
            return newDaubs;
          });
        }
        setIsGameActive(true);
        // TODO: Start calling numbers
    } else {
        // Show error: not enough credits
    }
  };

  const findFreeSpace = (card: BingoNumber[][]): {row: number, col: number} | null => {
    for (let r = 0; r < card.length; r++) {
        for (let c = 0; c < card[r].length; c++) {
            if (card[r][c] === 'FREE') return {row: r, col: c};
        }
    }
    return null;
  }


  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-8 sm:py-12 flex flex-col items-center">
        <header className="mb-8 sm:mb-10 text-center">
          <AppWindow className="h-12 w-12 sm:h-16 md:h-20 text-primary mx-auto mb-3 sm:mb-4" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-primary">Bingo Hall</h1>
          <p className="text-md sm:text-lg md:text-xl text-muted-foreground mt-2 px-2">
            Get your daubers ready! More features coming soon.
          </p>
        </header>

        <div className="w-full max-w-xs sm:max-w-sm mx-auto mb-6 sm:mb-8">
          <CreditDisplay initialCredits={currentCredits} />
        </div>
        
        <div className="mb-6">
            <Button onClick={handleStartGame} disabled={isGameActive} size="lg">
                <Ticket className="mr-2 h-5 w-5"/> Buy New Card (10 Credits)
            </Button>
        </div>

        {bingoCard.length > 0 ? (
          <div className="bg-card p-3 sm:p-4 border border-border rounded-lg shadow-xl w-full max-w-md">
            <div className="grid grid-cols-5 gap-1 sm:gap-2">
              {BINGO_COLS.map((letter) => (
                <div key={letter} className="flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold text-primary h-10 sm:h-12 md:h-14 rounded-t-md bg-primary/20">
                  {letter}
                </div>
              ))}
              {bingoCard.map((rowItems, rowIndex) => (
                <React.Fragment key={`row-${rowIndex}`}>
                  {rowItems.map((num, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleDaub(rowIndex, colIndex)}
                      disabled={!isGameActive && num !== 'FREE'}
                      className={cn(
                        "flex items-center justify-center text-lg sm:text-xl md:text-2xl font-semibold aspect-square w-full rounded-md border border-border/50 transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        daubedCells[rowIndex]?.[colIndex] 
                          ? "bg-accent text-accent-foreground scale-95 shadow-inner" 
                          : "bg-card hover:bg-muted/50",
                        num === 'FREE' && !daubedCells[rowIndex]?.[colIndex] && "bg-primary/10 text-primary",
                        num === 'FREE' && daubedCells[rowIndex]?.[colIndex] && "bg-primary text-primary-foreground"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Loading Bingo Card...</p>
        )}
        
        <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">Current Called Number: <span className="font-bold text-primary">--</span> (Coming Soon)</p>
            <p className="text-muted-foreground text-sm mt-2">Game interactions like number calling and win detection are under development.</p>
        </div>

      </main>
      <footer className="text-center py-4 sm:py-6 text-xs sm:text-sm text-muted-foreground border-t border-border mt-auto">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
    </div>
  );
}
    
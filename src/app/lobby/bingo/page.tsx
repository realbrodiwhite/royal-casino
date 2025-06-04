
"use client";

import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AppWindow, Ticket, Users, Play, Pause, RotateCcw, History, Volume2 } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import CreditDisplay from '@/components/game/CreditDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

const BINGO_COLS = ['B', 'I', 'N', 'G', 'O'] as const;
const NUMBERS_PER_COL: Record<typeof BINGO_COLS[number], { min: number, max: number, count: number }> = {
  B: { min: 1, max: 15, count: 5 },
  I: { min: 16, max: 30, count: 5 },
  N: { min: 31, max: 45, count: 4 }, // N column has 4 numbers + FREE space
  G: { min: 46, max: 60, count: 5 },
  O: { min: 61, max: 75, count: 5 },
};
const TOTAL_NUMBERS = 75;

type BingoNumber = number | 'FREE';
type BingoCardGrid = BingoNumber[][]; // Column-major: grid[col][row]

const generateBingoCard = (): BingoCardGrid => {
  const card: BingoCardGrid = [];
  BINGO_COLS.forEach((colLetter) => {
    const { min, max, count } = NUMBERS_PER_COL[colLetter];
    const colNumbers: Set<number> = new Set();
    while (colNumbers.size < count) {
      colNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    const sortedColNumbers = Array.from(colNumbers).sort((a, b) => a - b);
    
    if (colLetter === 'N') {
      const nColWithFree: BingoNumber[] = [
        sortedColNumbers[0],
        sortedColNumbers[1],
        'FREE',
        sortedColNumbers[2],
        sortedColNumbers[3],
      ];
      card.push(nColWithFree);
    } else {
      card.push(sortedColNumbers);
    }
  });
  return card;
};

const transposeGrid = (grid: BingoCardGrid): BingoNumber[][] => {
  if (!grid || grid.length === 0) return [];
  return grid[0].map((_, rowIndex) => grid.map(col => col[rowIndex]));
};

const initialAllPossibleNumbers = () => Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);

export default function BingoPage() {
  const [bingoCard, setBingoCard] = useState<BingoNumber[][]>([]);
  const [daubedCells, setDaubedCells] = useState<boolean[][]>([]);
  
  const [calledNumbersSet, setCalledNumbersSet] = useState<Set<number>>(new Set());
  const [calledNumbersHistory, setCalledNumbersHistory] = useState<number[]>([]);
  const [currentCalledNumber, setCurrentCalledNumber] = useState<number | null>(null);
  const [remainingToCall, setRemainingToCall] = useState<number[]>(initialAllPossibleNumbers());

  const [currentCredits, setCurrentCredits] = useState(1000); 
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  
  const { toast } = useToast();
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cardCost = 10;

  const findFreeSpaceCoords = (card: BingoNumber[][]): {row: number, col: number} | null => {
    for (let r = 0; r < card.length; r++) {
      for (let c = 0; c < (card[r]?.length || 0); c++) {
        if (card[r][c] === 'FREE') return {row: r, col: c};
      }
    }
    return null;
  };
  
  const initializeNewCardAndDaubs = useCallback(() => {
    const newCardData = generateBingoCard();
    const transposedCard = transposeGrid(newCardData);
    setBingoCard(transposedCard);
    
    const initialDaubs = Array(5).fill(null).map(() => Array(5).fill(false));
    const freeSpaceCoords = findFreeSpaceCoords(transposedCard);
    if (freeSpaceCoords) {
      initialDaubs[freeSpaceCoords.row][freeSpaceCoords.col] = true;
    }
    setDaubedCells(initialDaubs);
  }, []);

  const resetCaller = () => {
    setCurrentCalledNumber(null);
    setCalledNumbersSet(new Set());
    setCalledNumbersHistory([]);
    const shuffledNumbers = [...initialAllPossibleNumbers()].sort(() => Math.random() - 0.5);
    setRemainingToCall(shuffledNumbers);
  };
  
  useEffect(() => {
    initializeNewCardAndDaubs();
    resetCaller();
  }, [initializeNewCardAndDaubs]);

  const callNextNumber = useCallback(() => {
    setRemainingToCall(prevRemaining => {
      if (prevRemaining.length === 0) {
        if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
        setIsGameActive(false);
        toast({ title: "Game Over", description: "All numbers have been called!" });
        return [];
      }
      const [nextNumber, ...rest] = prevRemaining;
      setCurrentCalledNumber(nextNumber);
      setCalledNumbersSet(prevSet => new Set(prevSet).add(nextNumber));
      setCalledNumbersHistory(prevHistory => [...prevHistory, nextNumber]);
      return rest;
    });
  }, [toast]);

  useEffect(() => {
    if (isGameActive && !isGamePaused && remainingToCall.length > 0) {
      gameIntervalRef.current = setInterval(callNextNumber, 3000); // Call number every 3 seconds
    } else {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    }
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
  }, [isGameActive, isGamePaused, callNextNumber, remainingToCall.length]);


  const handleDaub = (row: number, col: number) => {
    if (!isGameActive) {
      toast({ title: "Game Not Active", description: "Start the game to daub numbers.", variant: "destructive" });
      return;
    }
    const number = bingoCard[row][col];
    if (typeof number === 'number') {
      if (calledNumbersSet.has(number)) {
        const newDaubs = daubedCells.map(r => [...r]);
        newDaubs[row][col] = !newDaubs[row][col]; // Toggle daub
        setDaubedCells(newDaubs);
        // TODO: Check for Bingo immediately after daub
      } else {
        toast({ title: "Number Not Called", description: `Number ${number} has not been called yet.`, variant: "destructive" });
      }
    } else if (number === 'FREE') { // Free space is auto-daubed and can be un-daubed/re-daubed if desired, though unusual.
        const newDaubs = daubedCells.map(r => [...r]);
        newDaubs[row][col] = !newDaubs[row][col];
        setDaubedCells(newDaubs);
    }
  };

  const handleBuyAndStart = () => {
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current); // Stop any current game

    if (currentCredits < cardCost) {
        toast({ title: "Not Enough Credits", description: `You need ${cardCost} credits to play.`, variant: "destructive" });
        return;
    }
    setCurrentCredits(prev => prev - cardCost);
    // setCurrentXp(prevXp => prevXp + cardCost); // XP gain on game start
    
    initializeNewCardAndDaubs();
    resetCaller();
    setIsGameActive(true);
    setIsGamePaused(false);
    toast({ title: "New Game Started!", description: `New card purchased for ${cardCost} credits. Good luck!`});
  };

  const handlePauseResumeGame = () => {
    if (!isGameActive) return;
    setIsGamePaused(!isGamePaused);
    toast({ title: isGamePaused ? "Game Resumed" : "Game Paused" });
  };

  const handleResetGame = () => {
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    setIsGameActive(false);
    setIsGamePaused(false);
    initializeNewCardAndDaubs(); // Gives a fresh card
    resetCaller(); // Resets the numbers to be called
    toast({ title: "Game Reset", description: "Board and caller have been reset. Buy a new card to start." });
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-8 sm:py-12 flex flex-col items-center">
        <header className="mb-6 sm:mb-8 text-center">
          <AppWindow className="h-10 w-10 sm:h-12 md:h-16 text-primary mx-auto mb-2 sm:mb-3" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-primary">Bingo Hall</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-1 px-2">
            Daub your way to victory! Numbers are called automatically.
          </p>
        </header>

        <div className="w-full max-w-xs sm:max-w-sm mx-auto mb-4 sm:mb-6">
          <CreditDisplay initialCredits={currentCredits} />
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Button onClick={handleBuyAndStart} size="lg" variant="default" disabled={isGameActive && !isGamePaused}>
                <Ticket className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/> Buy New Card & Play ({cardCost} Cr)
            </Button>
            <Button onClick={handlePauseResumeGame} size="sm" variant="outline" disabled={!isGameActive}>
                {isGamePaused ? <Play className="mr-2 h-4 w-4"/> : <Pause className="mr-2 h-4 w-4"/>}
                {isGamePaused ? "Resume" : "Pause"}
            </Button>
            <Button onClick={handleResetGame} size="sm" variant="destructive">
                <RotateCcw className="mr-2 h-4 w-4"/> Reset Game
            </Button>
        </div>

        {/* Caller Information */}
        <Card className="w-full max-w-lg bg-card border-border shadow-md mb-4 sm:mb-6">
            <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-xl sm:text-2xl text-primary font-headline text-center flex items-center justify-center">
                    <Volume2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6"/> Caller's Board
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <div className="mb-3">
                    <p className="text-sm text-muted-foreground">Current Number:</p>
                    <p className={cn(
                        "text-5xl sm:text-6xl font-bold text-primary transition-all duration-300",
                        currentCalledNumber ? "scale-110" : "scale-100"
                    )}>
                        {currentCalledNumber || "--"}
                    </p>
                </div>
                <div className="h-24 overflow-y-auto p-2 border border-border/30 rounded-md bg-background/50">
                    <p className="text-xs text-muted-foreground mb-1">Called Numbers History ({calledNumbersHistory.length}/{TOTAL_NUMBERS}):</p>
                    {calledNumbersHistory.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                            {calledNumbersHistory.map(num => (
                                <span key={num} className="px-1.5 py-0.5 text-xs bg-accent text-accent-foreground rounded-sm">
                                    {num}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground italic">Waiting for game to start...</p>
                    )}
                </div>
            </CardContent>
        </Card>


        {/* Bingo Card */}
        {bingoCard.length > 0 ? (
          <div className="bg-card p-2 sm:p-3 border border-border rounded-lg shadow-xl w-full max-w-md mb-4 sm:mb-6">
            <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
              {BINGO_COLS.map((letter) => (
                <div key={letter} className="flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-primary h-8 sm:h-10 md:h-12 rounded-t-sm bg-primary/20">
                  {letter}
                </div>
              ))}
              {bingoCard.map((rowItems, rowIndex) => (
                <React.Fragment key={`row-${rowIndex}`}>
                  {rowItems.map((num, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleDaub(rowIndex, colIndex)}
                      disabled={!isGameActive}
                      className={cn(
                        "flex items-center justify-center text-md sm:text-lg md:text-xl font-semibold aspect-square w-full rounded-sm border border-border/30 transition-all",
                        "focus:outline-none focus:ring-1 focus:ring-ring",
                        daubedCells[rowIndex]?.[colIndex] 
                          ? "bg-accent text-accent-foreground scale-95 shadow-inner" 
                          : "bg-card hover:bg-muted/50",
                        num === 'FREE' && !daubedCells[rowIndex]?.[colIndex] && "bg-primary/10 text-primary font-bold",
                        num === 'FREE' && daubedCells[rowIndex]?.[colIndex] && "bg-primary text-primary-foreground font-bold",
                        (!isGameActive || (typeof num === 'number' && !calledNumbersSet.has(num) && num !== 'FREE')) && !daubedCells[rowIndex]?.[colIndex] && "opacity-60"
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
        
        <div className="text-center">
            {/* Placeholder for BINGO button and win messages */}
            <Button variant="default" size="lg" className="mt-2 sm:mt-3" disabled={!isGameActive} onClick={() => toast({title: "Coming Soon!", description:"Bingo win checking is under development."})}>
                Call BINGO!
            </Button>
            <p className="text-muted-foreground text-xs sm:text-sm mt-3 px-2">
                Win checking and automated BINGO detection are coming soon. Daub your card as numbers are called!
            </p>
        </div>

      </main>
      <footer className="text-center py-4 sm:py-6 text-xs sm:text-sm text-muted-foreground border-t border-border mt-auto">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
    </div>
  );
}
    

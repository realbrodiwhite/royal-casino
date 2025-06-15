
"use client";

// DESIGN NOTE: This gameplay page should ideally fit within a single viewport height.
// Content should be responsive and adjust automatically to different screen ratios and orientations
// to avoid internal scrolling of the main game area.

import React, { useState, useCallback, useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import UserBalanceDisplay from '@/components/game/CreditDisplay';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Ticket, Gift, Sparkles, Palette } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useXp } from '@/contexts/XpContext';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { chance as b3Chance, nextInt as b3NextInt } from '@/lib/b3-engine';

const GRID_SIZE = 3;
const POSSIBLE_SYMBOLS = ["💎", "💰", "🍒", "🔔", "⭐", "🍀"];

interface TicketOption {
  id: string;
  name: string;
  cost: number; // Cost in Credits
  winAmount: number; // Win in Credits
}

const TICKET_OPTIONS: TicketOption[] = [
  { id: "classic", name: "Classic Ticket", cost: 10, winAmount: 50 },
  { id: "silver", name: "Silver Ticket", cost: 25, winAmount: 150 },
  { id: "gold", name: "Gold Ticket", cost: 50, winAmount: 350 },
];

type ScratchCell = {
  symbol: string;
  revealed: boolean;
};

type ScratchGrid = ScratchCell[][];

const generateInitialGrid = (): ScratchGrid => {
  const grid: ScratchGrid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[i][j] = { symbol: '?', revealed: false };
    }
  }
  return grid;
};

const generateTicketSymbols = (): ScratchGrid => {
  const newGrid = generateInitialGrid();
  const shouldWin = b3Chance(0.3); // 30% chance to be a winning ticket
  let winningSymbol = POSSIBLE_SYMBOLS[b3NextInt(0, POSSIBLE_SYMBOLS.length - 1)];

  if (shouldWin) {
    const winType = b3NextInt(0, (GRID_SIZE === 3 ? 3 : 1)); // 4 win types for 3x3, 2 for other sizes
    const winIndex = b3NextInt(0, GRID_SIZE - 1);

    if (winType === 0) { // Row win
      for (let j = 0; j < GRID_SIZE; j++) newGrid[winIndex][j].symbol = winningSymbol;
    } else if (winType === 1) { // Column win
      for (let i = 0; i < GRID_SIZE; i++) newGrid[i][winIndex].symbol = winningSymbol;
    } else if (winType === 2 && GRID_SIZE === 3) { // Main diagonal win
        for (let i = 0; i < GRID_SIZE; i++) newGrid[i][i].symbol = winningSymbol;
    } else if (winType === 3 && GRID_SIZE === 3) { // Anti-diagonal win
        for (let i = 0; i < GRID_SIZE; i++) newGrid[i][GRID_SIZE - 1 - i].symbol = winningSymbol;
    } else if (GRID_SIZE !== 3 && winType > 1) { // Fallback for non-3x3 if winType logic was different
        for (let j = 0; j < GRID_SIZE; j++) newGrid[winIndex][j].symbol = winningSymbol; // Default to row win
    }
  }

  // Fill remaining cells
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (newGrid[i][j].symbol === '?') { // Only fill if not part of a winning line
        newGrid[i][j].symbol = POSSIBLE_SYMBOLS[b3NextInt(0, POSSIBLE_SYMBOLS.length - 1)];
      }
    }
  }
  return newGrid;
};


export default function ScratchersPage() {
  const [credits, setCredits] = useState(1000);
  const [scratchGrid, setScratchGrid] = useState<ScratchGrid>(generateInitialGrid());
  const [isTicketActive, setIsTicketActive] = useState(false);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [hasWonThisTicket, setHasWonThisTicket] = useState(false);
  const [selectedTicketOptionId, setSelectedTicketOptionId] = useState<string>(TICKET_OPTIONS[0].id);
  const { toast } = useToast();
  const { addXp } = useXp();

  const selectedTicket = TICKET_OPTIONS.find(opt => opt.id === selectedTicketOptionId) || TICKET_OPTIONS[0];

  const checkForWin = useCallback((currentGrid: ScratchGrid): { win: boolean; winningSymbol: string | null } => {
    if (!currentGrid || currentGrid.length === 0) return { win: false, winningSymbol: null };
    const size = currentGrid.length;

    // Check rows
    for (let i = 0; i < size; i++) {
      if (currentGrid[i].every(cell => cell.revealed)) { // Only check if all cells in row are revealed
        const firstSymbol = currentGrid[i][0].symbol;
        if (currentGrid[i].every(cell => cell.symbol === firstSymbol)) {
          return { win: true, winningSymbol: firstSymbol };
        }
      }
    }

    // Check columns
    for (let j = 0; j < size; j++) {
      if (currentGrid.every(row => row[j].revealed)) { // Only check if all cells in column are revealed
        const firstSymbol = currentGrid[0][j].symbol;
        let colMatch = true;
        for (let i = 0; i < size; i++) {
          if (currentGrid[i][j].symbol !== firstSymbol) {
            colMatch = false;
            break;
          }
        }
        if (colMatch) return { win: true, winningSymbol: firstSymbol };
      }
    }
    
    // Check main diagonal (top-left to bottom-right)
    if (GRID_SIZE === 3 && currentGrid.every((row, idx) => row[idx].revealed)) {
        const firstDiagSymbol = currentGrid[0][0].symbol;
        let mainDiagMatch = true;
        for (let i = 0; i < size; i++) {
            if(currentGrid[i][i].symbol !== firstDiagSymbol) {
                mainDiagMatch = false;
                break;
            }
        }
        if (mainDiagMatch) return { win: true, winningSymbol: firstDiagSymbol };
    }

    // Check anti-diagonal (top-right to bottom-left)
    if (GRID_SIZE === 3 && currentGrid.every((row, idx) => row[size - 1 - idx].revealed)) {
        const firstAntiDiagSymbol = currentGrid[0][size-1].symbol;
        let antiDiagMatch = true;
        for (let i = 0; i < size; i++) {
            if(currentGrid[i][size-1-i].symbol !== firstAntiDiagSymbol) {
                antiDiagMatch = false;
                break;
            }
        }
        if (antiDiagMatch) return { win: true, winningSymbol: firstAntiDiagSymbol };
    }

    return { win: false, winningSymbol: null };
  }, []);


  const handleBuyTicket = () => {
    if (credits < selectedTicket.cost) { 
      toast({ title: "Not Enough Credits", description: "You don't have enough credits to buy this ticket.", variant: "destructive" });
      return;
    }
    setCredits(prev => prev - selectedTicket.cost);
    addXp(selectedTicket.cost); 
    setScratchGrid(generateTicketSymbols());
    setIsTicketActive(true);
    setGameMessage("Scratch to reveal your prize!");
    setIsWin(null);
    setRevealedCount(0);
    setHasWonThisTicket(false);
    toast({ title: `${selectedTicket.name} Purchased!`, description: `Cost: ${selectedTicket.cost} credits. Good luck!` });
  };

  const handleScratchCell = (row: number, col: number) => {
    if (!isTicketActive || scratchGrid[row][col].revealed) return;

    const newGrid = scratchGrid.map(r => r.map(c => ({ ...c })));
    newGrid[row][col].revealed = true;
    setScratchGrid(newGrid);

    const currentRevealedCount = newGrid.flat().filter(cell => cell.revealed).length;
    setRevealedCount(currentRevealedCount);

    if (!hasWonThisTicket) {
        const { win, winningSymbol } = checkForWin(newGrid);
        if (win && winningSymbol) {
            setCredits(prev => prev + selectedTicket.winAmount); 
            setGameMessage(`Congratulations! You matched three ${winningSymbol}s and won ${selectedTicket.winAmount} credits!`);
            setIsWin(true);
            setHasWonThisTicket(true);
            toast({ title: "You Won!", description: `You won ${selectedTicket.winAmount} credits!` });
        }
    }

    if (currentRevealedCount === GRID_SIZE * GRID_SIZE) {
        setIsTicketActive(false);
        if (!hasWonThisTicket) {
            setGameMessage("No win this time. Better luck next ticket!");
            setIsWin(false);
            toast({ title: "No Win", description: "Try buying another ticket.", variant: "destructive" });
        }
    }
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-8 sm:pb-12 pt-[64px] sm:pt-[68px] flex flex-col items-center">
        <header className="mb-8 sm:mb-10 text-center">
          <Ticket className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-3 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Scratch & Win</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-1 px-2">Buy a ticket and scratch for instant prizes!</p>
        </header>

        <div className="w-full max-w-lg mx-auto mb-6 sm:mb-8">
          <UserBalanceDisplay credits={credits} />
        </div>

        <Card className="w-full max-w-md bg-card border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-primary font-headline text-center">
              {isTicketActive ? "Scratch Your Ticket!" : (gameMessage && isWin !== null ? "Ticket Revealed!" : "Get Your Ticket")}
            </CardTitle>
             {!isTicketActive && <p className="text-sm text-center text-muted-foreground">Choose your ticket type:</p>}
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {!isTicketActive && (
              <RadioGroup
                value={selectedTicketOptionId}
                onValueChange={setSelectedTicketOptionId}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4"
              >
                {TICKET_OPTIONS.map(option => (
                  <Label
                    key={option.id}
                    htmlFor={option.id}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                      selectedTicketOptionId === option.id && "border-primary ring-2 ring-primary"
                    )}
                  >
                    <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                    <span className="font-semibold text-sm sm:text-base">{option.name}</span>
                    <span className="text-xs text-muted-foreground">Cost: {option.cost} Cr</span>
                    <span className="text-xs text-muted-foreground">Win: {option.winAmount} Cr</span>
                  </Label>
                ))}
              </RadioGroup>
            )}

            {!isTicketActive && isWin === null && (
              <Button
                onClick={handleBuyTicket}
                variant="default"
                className="w-full font-semibold text-md sm:text-lg py-2.5 sm:py-3"
                disabled={credits < selectedTicket.cost}
              >
                <Gift className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Buy {selectedTicket.name} ({selectedTicket.cost} Credits)
              </Button>
            )}

            {(isTicketActive || (isWin !== null && scratchGrid.flat().some(c => c.symbol !== '?'))) && (
              <div
                className="grid gap-1 sm:gap-2 mx-auto aspect-square max-w-xs sm:max-w-sm"
                style={{gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`}}
              >
                {scratchGrid.flat().map((cell, index) => {
                  const row = Math.floor(index / GRID_SIZE);
                  const col = index % GRID_SIZE;
                  return (
                    <button
                      key={index}
                      onClick={() => handleScratchCell(row, col)}
                      disabled={!isTicketActive || cell.revealed}
                      className={cn(
                        "aspect-square flex items-center justify-center rounded-md border border-border text-2xl sm:text-3xl font-bold transition-all duration-300 ease-in-out",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                        cell.revealed ? "bg-card-foreground/10 text-primary cursor-default" : "bg-muted hover:bg-muted/80 text-transparent cursor-pointer",
                        cell.revealed && cell.symbol === "💰" && "text-green-400",
                        cell.revealed && cell.symbol === "💎" && "text-blue-400",
                        cell.revealed && cell.symbol === "🍒" && "text-red-400",
                        cell.revealed && cell.symbol === "⭐" && "text-yellow-400",
                         !cell.revealed && "scratch-overlay relative overflow-hidden"
                      )}
                      aria-label={`Scratch cell ${row + 1}-${col + 1}`}
                    >
                      {cell.revealed ? cell.symbol :
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 flex items-center justify-center">
                            <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700 opacity-50"/>
                        </div>
                      }
                    </button>
                  );
                })}
              </div>
            )}

            {gameMessage && (
              <ResultsDisplay message={gameMessage} isWin={isWin} />
            )}

            {!isTicketActive && isWin !== null && (
                 <Button
                    onClick={handleBuyTicket}
                    variant="default"
                    className="w-full font-semibold text-md sm:text-lg py-2.5 sm:py-3 mt-3 sm:mt-4"
                    disabled={credits < selectedTicket.cost}
                >
                    <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Play Again ({selectedTicket.name})?
                </Button>
            )}
          </CardContent>
           <CardFooter className="text-xs text-center text-muted-foreground pt-3 sm:pt-4">
                <p>Match 3 symbols in a row, column, or diagonal to win {selectedTicket.winAmount} credits!</p>
            </CardFooter>
        </Card>

      </main>
      <Footer />
      <style jsx global>{`
        .scratch-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            hsla(var(--muted-foreground), 0.3) 0,
            hsla(var(--muted-foreground), 0.3) 5px,
            transparent 5px,
            transparent 10px
          );
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

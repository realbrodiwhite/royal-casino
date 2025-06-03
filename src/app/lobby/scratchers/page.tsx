
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import CreditDisplay from '@/components/game/CreditDisplay';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Ticket, Star, Gift, Sparkles, Palette } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const GRID_SIZE = 3;
const TICKET_COST = 10;
const WIN_AMOUNT = 50; // Fixed win amount for matching 3
const POSSIBLE_SYMBOLS = ["💎", "💰", "🍒", "🔔", "⭐", "🍀"];

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
      // Assign symbols randomly or strategically later
      // For now, just a placeholder to be filled when ticket is bought
      grid[i][j] = { symbol: '?', revealed: false };
    }
  }
  return grid;
};

const generateTicketSymbols = (): ScratchGrid => {
  const newGrid = generateInitialGrid();
  // For a higher chance of winning for testing, let's try to place winning lines sometimes
  // This is a very basic way to control odds for demo. Real odds are more complex.
  const shouldWin = Math.random() < 0.2; // 20% chance to generate a winning ticket
  let winningSymbol = POSSIBLE_SYMBOLS[Math.floor(Math.random() * POSSIBLE_SYMBOLS.length)];
  let winPlaced = false;

  if (shouldWin) {
    const winType = Math.floor(Math.random() * 3); // 0: row, 1: col, 2: diag1 (diag2 is rarer)
    const winIndex = Math.floor(Math.random() * GRID_SIZE);

    if (winType === 0) { // Row win
      for (let j = 0; j < GRID_SIZE; j++) newGrid[winIndex][j].symbol = winningSymbol;
      winPlaced = true;
    } else if (winType === 1) { // Col win
      for (let i = 0; i < GRID_SIZE; i++) newGrid[i][winIndex].symbol = winningSymbol;
      winPlaced = true;
    } else if (winType === 2 && GRID_SIZE === 3) { // Main diagonal win (only for 3x3)
        for (let i = 0; i < GRID_SIZE; i++) newGrid[i][i].symbol = winningSymbol;
        winPlaced = true;
    }
    // Could add anti-diagonal for 3x3:
    // else if (winType === 3 && GRID_SIZE === 3) { 
    //    for (let i = 0; i < GRID_SIZE; i++) newGrid[i][GRID_SIZE - 1 - i].symbol = winningSymbol;
    //    winPlaced = true;
    // }
  }

  // Fill the rest of the grid
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (newGrid[i][j].symbol === '?') { // If not part of a pre-placed win
        newGrid[i][j].symbol = POSSIBLE_SYMBOLS[Math.floor(Math.random() * POSSIBLE_SYMBOLS.length)];
      }
    }
  }
  return newGrid;
};


export default function ScratchersPage() {
  const [credits, setCredits] = useState(1000);
  const [experiencePoints, setExperiencePoints] = useState(0);
  const [scratchGrid, setScratchGrid] = useState<ScratchGrid>(generateInitialGrid());
  const [isTicketActive, setIsTicketActive] = useState(false);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const { toast } = useToast();

  const checkForWin = useCallback((currentGrid: ScratchGrid): { win: boolean; winningSymbol: string | null } => {
    if (!currentGrid || currentGrid.length === 0) return { win: false, winningSymbol: null };
    const size = currentGrid.length;

    // Check rows
    for (let i = 0; i < size; i++) {
      const firstSymbol = currentGrid[i][0].symbol;
      if (currentGrid[i].every(cell => cell.revealed && cell.symbol === firstSymbol)) {
        return { win: true, winningSymbol: firstSymbol };
      }
    }

    // Check columns
    for (let j = 0; j < size; j++) {
      const firstSymbol = currentGrid[0][j].symbol;
      let colMatch = true;
      for (let i = 0; i < size; i++) {
        if (!currentGrid[i][j].revealed || currentGrid[i][j].symbol !== firstSymbol) {
          colMatch = false;
          break;
        }
      }
      if (colMatch) return { win: true, winningSymbol: firstSymbol };
    }
    
    // Check main diagonal (top-left to bottom-right)
    const firstDiagSymbol = currentGrid[0][0].symbol;
    let mainDiagMatch = true;
    for (let i = 0; i < size; i++) {
        if(!currentGrid[i][i].revealed || currentGrid[i][i].symbol !== firstDiagSymbol) {
            mainDiagMatch = false;
            break;
        }
    }
    if (mainDiagMatch) return { win: true, winningSymbol: firstDiagSymbol };

    // Check anti-diagonal (top-right to bottom-left)
    const firstAntiDiagSymbol = currentGrid[0][size-1].symbol;
    let antiDiagMatch = true;
    for (let i = 0; i < size; i++) {
        if(!currentGrid[i][size-1-i].revealed || currentGrid[i][size-1-i].symbol !== firstAntiDiagSymbol) {
            antiDiagMatch = false;
            break;
        }
    }
    if (antiDiagMatch) return { win: true, winningSymbol: firstAntiDiagSymbol };


    return { win: false, winningSymbol: null };
  }, []);


  const handleBuyTicket = () => {
    if (credits < TICKET_COST) {
      toast({ title: "Not Enough Credits", description: "You don't have enough credits to buy a ticket.", variant: "destructive" });
      return;
    }
    setCredits(prev => prev - TICKET_COST);
    setExperiencePoints(prevXp => prevXp + TICKET_COST);
    setScratchGrid(generateTicketSymbols());
    setIsTicketActive(true);
    setGameMessage("Scratch to reveal your prize!");
    setIsWin(null);
    setRevealedCount(0);
    toast({ title: "Ticket Purchased!", description: `Cost: ${TICKET_COST} credits. Good luck!` });
  };

  const handleScratchCell = (row: number, col: number) => {
    if (!isTicketActive || scratchGrid[row][col].revealed) return;

    const newGrid = scratchGrid.map(r => r.map(c => ({ ...c })));
    newGrid[row][col].revealed = true;
    setScratchGrid(newGrid);
    const currentRevealedCount = revealedCount + 1;
    setRevealedCount(currentRevealedCount);

    const { win, winningSymbol } = checkForWin(newGrid);
    
    if (win && winningSymbol) {
      setCredits(prev => prev + WIN_AMOUNT);
      setGameMessage(`Congratulations! You matched three ${winningSymbol}s and won ${WIN_AMOUNT} credits!`);
      setIsWin(true);
      setIsTicketActive(false); // End current ticket
      toast({ title: "You Won!", description: `You won ${WIN_AMOUNT} credits!` });
    } else if (currentRevealedCount === GRID_SIZE * GRID_SIZE) { // All cells revealed, no win
        setGameMessage("No win this time. Better luck next ticket!");
        setIsWin(false);
        setIsTicketActive(false);
        toast({ title: "No Win", description: "Try buying another ticket.", variant: "destructive" });
    }
  };
  
  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        <header className="mb-10 text-center">
          <Ticket className="h-20 w-20 text-gold mx-auto mb-4" />
          <h1 className="text-5xl font-bold font-headline text-gold">Scratch & Win</h1>
          <p className="text-xl text-silver mt-2">Buy a ticket and scratch for instant prizes!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
          <CreditDisplay initialCredits={credits} />
          <Card className="bg-opacity-50 backdrop-blur-md border-gold shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gold">Experience Points</CardTitle>
              <Star className="h-5 w-5 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-silver">{experiencePoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">XP earned this session</p>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full max-w-md bg-silver/10 border-gold shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-gold font-headline text-center">
              {isTicketActive ? "Scratch Your Ticket!" : "Get Your Ticket"}
            </CardTitle>
             <p className="text-sm text-center text-silver/80">Ticket Cost: {TICKET_COST} credits</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isTicketActive ? (
              <Button 
                onClick={handleBuyTicket} 
                className="w-full bg-gold text-deep-purple hover:bg-gold/90 font-semibold text-lg py-3"
                disabled={credits < TICKET_COST}
              >
                <Gift className="mr-2 h-5 w-5" /> Buy Ticket ({TICKET_COST} Credits)
              </Button>
            ) : (
              <div 
                className="grid gap-2 mx-auto aspect-square"
                style={{gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`}}
              >
                {scratchGrid.flat().map((cell, index) => {
                  const row = Math.floor(index / GRID_SIZE);
                  const col = index % GRID_SIZE;
                  return (
                    <button
                      key={index}
                      onClick={() => handleScratchCell(row, col)}
                      disabled={cell.revealed}
                      className={cn(
                        "aspect-square flex items-center justify-center rounded-md border border-gold/50 text-3xl font-bold transition-all duration-300 ease-in-out",
                        "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-deep-purple",
                        cell.revealed ? "bg-deep-purple/30 text-gold cursor-default" : "bg-silver/30 hover:bg-silver/40 text-transparent cursor-pointer",
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
                            <Palette className="h-8 w-8 text-gray-700 opacity-50"/>
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

            {isWin !== null && !isTicketActive && (
                 <Button 
                    onClick={handleBuyTicket} 
                    className="w-full bg-gold text-deep-purple hover:bg-gold/90 font-semibold text-lg py-3 mt-4"
                    disabled={credits < TICKET_COST}
                >
                    <Sparkles className="mr-2 h-5 w-5" /> Play Again?
                </Button>
            )}
          </CardContent>
           <CardFooter className="text-xs text-center text-silver/70 pt-4">
                <p>Match 3 symbols in a row, column, or diagonal to win {WIN_AMOUNT} credits!</p>
            </CardFooter>
        </Card>

      </main>
      <footer className="text-center py-6 text-sm text-silver/70 border-t border-gold/20 mt-auto">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
      <style jsx global>{`
        .scratch-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(128,128,128,0.3) 0,
            rgba(128,128,128,0.3) 5px,
            transparent 5px,
            transparent 10px
          );
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

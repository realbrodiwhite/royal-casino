
"use client";

import React, { useState, useCallback } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import CreditDisplay from '@/components/game/CreditDisplay';
import XpDisplay from '@/components/game/XpDisplay'; // Import XpDisplay
import ResultsDisplay from '@/components/game/ResultsDisplay';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Ticket, Gift, Sparkles, Palette } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const GRID_SIZE = 3;
const TICKET_COST = 10;
const WIN_AMOUNT = 50; 
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
      grid[i][j] = { symbol: '?', revealed: false };
    }
  }
  return grid;
};

const generateTicketSymbols = (): ScratchGrid => {
  const newGrid = generateInitialGrid();
  const shouldWin = Math.random() < 0.2; 
  let winningSymbol = POSSIBLE_SYMBOLS[Math.floor(Math.random() * POSSIBLE_SYMBOLS.length)];
  
  if (shouldWin) {
    const winType = Math.floor(Math.random() * 3); 
    const winIndex = Math.floor(Math.random() * GRID_SIZE);

    if (winType === 0) { 
      for (let j = 0; j < GRID_SIZE; j++) newGrid[winIndex][j].symbol = winningSymbol;
    } else if (winType === 1) { 
      for (let i = 0; i < GRID_SIZE; i++) newGrid[i][winIndex].symbol = winningSymbol;
    } else if (winType === 2 && GRID_SIZE === 3) { 
        for (let i = 0; i < GRID_SIZE; i++) newGrid[i][i].symbol = winningSymbol;
    }
  }

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (newGrid[i][j].symbol === '?') { 
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

    for (let i = 0; i < size; i++) {
      const firstSymbol = currentGrid[i][0].symbol;
      if (currentGrid[i].every(cell => cell.revealed && cell.symbol === firstSymbol)) {
        return { win: true, winningSymbol: firstSymbol };
      }
    }

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
    
    const firstDiagSymbol = currentGrid[0][0].symbol;
    let mainDiagMatch = true;
    for (let i = 0; i < size; i++) {
        if(!currentGrid[i][i].revealed || currentGrid[i][i].symbol !== firstDiagSymbol) {
            mainDiagMatch = false;
            break;
        }
    }
    if (mainDiagMatch) return { win: true, winningSymbol: firstDiagSymbol };

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
    toast({ title: "Ticket Purchased!", description: \`Cost: \${TICKET_COST} credits. Good luck!\` });
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
      setGameMessage(\`Congratulations! You matched three \${winningSymbol}s and won \${WIN_AMOUNT} credits!\`);
      setIsWin(true);
      setIsTicketActive(false); 
      toast({ title: "You Won!", description: \`You won \${WIN_AMOUNT} credits!\` });
    } else if (currentRevealedCount === GRID_SIZE * GRID_SIZE) { 
        setGameMessage("No win this time. Better luck next ticket!");
        setIsWin(false);
        setIsTicketActive(false);
        toast({ title: "No Win", description: "Try buying another ticket.", variant: "destructive" });
    }
  };
  
  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        <header className="mb-10 text-center">
          <Ticket className="h-20 w-20 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-bold font-headline text-primary">Scratch & Win</h1>
          <p className="text-xl text-muted-foreground mt-2">Buy a ticket and scratch for instant prizes!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
          <CreditDisplay initialCredits={credits} />
          <XpDisplay experiencePoints={experiencePoints} />
        </div>

        <Card className="w-full max-w-md bg-card border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary font-headline text-center">
              {isTicketActive ? "Scratch Your Ticket!" : "Get Your Ticket"}
            </CardTitle>
             <p className="text-sm text-center text-muted-foreground">Ticket Cost: {TICKET_COST} credits</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isTicketActive ? (
              <Button 
                onClick={handleBuyTicket} 
                variant="default"
                className="w-full font-semibold text-lg py-3"
                disabled={credits < TICKET_COST}
              >
                <Gift className="mr-2 h-5 w-5" /> Buy Ticket ({TICKET_COST} Credits)
              </Button>
            ) : (
              <div 
                className="grid gap-2 mx-auto aspect-square"
                style={{gridTemplateColumns: \`repeat(\${GRID_SIZE}, 1fr)\`}}
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
                        "aspect-square flex items-center justify-center rounded-md border border-border text-3xl font-bold transition-all duration-300 ease-in-out",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                        cell.revealed ? "bg-card-foreground/10 text-primary cursor-default" : "bg-muted hover:bg-muted/80 text-transparent cursor-pointer",
                        cell.revealed && cell.symbol === "💰" && "text-green-400", // Keep specific colors for emphasis
                        cell.revealed && cell.symbol === "💎" && "text-blue-400",
                        cell.revealed && cell.symbol === "🍒" && "text-red-400",
                        cell.revealed && cell.symbol === "⭐" && "text-yellow-400",
                         !cell.revealed && "scratch-overlay relative overflow-hidden"
                      )}
                      aria-label={`Scratch cell \${row + 1}-\${col + 1}`}
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
                    variant="default"
                    className="w-full font-semibold text-lg py-3 mt-4"
                    disabled={credits < TICKET_COST}
                >
                    <Sparkles className="mr-2 h-5 w-5" /> Play Again?
                </Button>
            )}
          </CardContent>
           <CardFooter className="text-xs text-center text-muted-foreground pt-4">
                <p>Match 3 symbols in a row, column, or diagonal to win {WIN_AMOUNT} credits!</p>
            </CardFooter>
        </Card>

      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border mt-auto">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
      <style jsx global>{\`
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
      \`}</style>
    </div>
  );
}

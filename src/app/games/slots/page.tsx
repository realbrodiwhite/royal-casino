
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import CreditDisplay from '@/components/game/CreditDisplay';
import GameGrid from '@/components/game/GameGrid';
import GridBox from '@/components/game/GridBox';
import SpinButton from '@/components/game/SpinButton';
import AutospinSwitch from '@/components/game/AutospinSwitch';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import WinAnimation from '@/components/game/WinAnimation';
import CherrySymbol from '@/components/game/symbols/CherrySymbol';
import DiamondSymbol from '@/components/game/symbols/DiamondSymbol';
import { Shuffle, PlayCircle, PauseCircle } from 'lucide-react';
import Navbar from '@/components/layout/navbar'; // Assuming Navbar exists

// Example symbols
const symbols = [
  (props: React.SVGProps<SVGSVGElement>) => <CherrySymbol {...props} />,
  (props: React.SVGProps<SVGSVGElement>) => <DiamondSymbol {...props} />,
  (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props} data-ai-hint="gold coin"><circle cx="50" cy="50" r="40" fill="gold" stroke="darkgoldenrod" strokeWidth="3"/><text x="50" y="60" fontSize="30" textAnchor="middle" fill="black">$</text></svg>,
  (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props} data-ai-hint="bell symbol"><path d="M20 70 Q50 90 80 70 A30 30 0 0 1 20 70 M50 20 L50 30 M40 75 H60 M50 75 V85" stroke="gold" strokeWidth="4" fill="yellow" /></svg>,
];

const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

const initialReels = (rows: number, cols: number) =>
  Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null).map(() => getRandomSymbol()));

export default function SlotsPage() {
  const rows = 3;
  const cols = 3;
  const [reels, setReels] = useState(() => initialReels(rows, cols));
  const [spinning, setSpinning] = useState(false);
  const [credits, setCredits] = useState(1000);
  const [isAutospin, setIsAutospin] = useState(false);
  const [resultsMessage, setResultsMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [showWinAnimation, setShowWinAnimation] = useState(false);

  const spinCost = 10;

  const handleSpin = useCallback(() => {
    if (credits < spinCost) {
      setResultsMessage("Not enough credits to spin!");
      setIsWin(false);
      setIsAutospin(false); // Stop autospin if not enough credits
      return;
    }

    setSpinning(true);
    setCredits((prev) => prev - spinCost);
    setResultsMessage(null);
    setIsWin(null);

    // Simulate spinning animation for each reel
    const newReels = reels.map(row => row.map(() => getRandomSymbol())); // Initialize with random for visual effect
    setReels(newReels); // Show initial random symbols before "spinning"

    let spinIntervals = 0;
    const interval = setInterval(() => {
      setReels(currentReels => currentReels.map(row => row.map(() => getRandomSymbol())));
      spinIntervals++;
      if (spinIntervals >= 10) { // Spin for 1 second (10 * 100ms)
        clearInterval(interval);
        
        const finalReels = initialReels(rows, cols); // Determine final outcome
        setReels(finalReels);
        setSpinning(false);

        // Simple win condition: 3 of the same symbol in the middle row
        // In a real game, this would be complex and use the game algorithm and RTP settings
        const middleRow = finalReels[Math.floor(rows / 2)];
        const firstSymbolName = middleRow[0]({}).type.name; // A bit hacky to get symbol type name
        const isWinningRow = middleRow.every(
          (symbolFunc) => symbolFunc({}).type.name === firstSymbolName
        );

        if (isWinningRow) {
          const currentWinAmount = 100; // Example win amount
          setResultsMessage(`You won ${currentWinAmount} credits!`);
          setIsWin(true);
          setCredits((prev) => prev + currentWinAmount);
          setWinAmount(currentWinAmount);
          setShowWinAnimation(true);
        } else {
          setResultsMessage("No win this time. Try again!");
          setIsWin(false);
        }
      }
    }, 100); // Update reels every 100ms
  }, [credits, reels, rows, cols]);

  useEffect(() => {
    let autoSpinTimeout: NodeJS.Timeout;
    if (isAutospin && !spinning && credits >= spinCost) {
      autoSpinTimeout = setTimeout(handleSpin, 1500); // Delay between autospins
    }
    return () => clearTimeout(autoSpinTimeout);
  }, [isAutospin, spinning, credits, handleSpin]);

  const handleToggleAutospin = () => {
    if (!isAutospin && credits < spinCost) {
        setResultsMessage("Not enough credits to start autospin!");
        setIsWin(false);
        return;
    }
    setIsAutospin(!isAutospin);
    if (isAutospin) { // If turning off autospin
        setResultsMessage(null);
    }
  };
  
  const handleWinAnimationComplete = () => {
    setShowWinAnimation(false);
    setWinAmount(0);
  };

  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col items-center p-4">
      <Navbar />
      <header className="my-8 text-center">
        <h1 className="text-5xl font-bold font-headline text-gold">Royal Slots</h1>
        <p className="text-xl text-silver mt-2">Spin the reels for majestic wins!</p>
      </header>

      <main className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <CreditDisplay initialCredits={credits} />

        <GameGrid rows={rows} cols={cols}>
          {reels.flat().map((SymbolComponent, index) => (
            <GridBox
              key={index}
              className={spinning ? 'animate-pulse' : ''}
            >
              <SymbolComponent className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-1" />
            </GridBox>
          ))}
        </GameGrid>

        {resultsMessage && <ResultsDisplay message={resultsMessage} isWin={isWin} />}
        
        <WinAnimation 
            trigger={showWinAnimation} 
            winAmount={winAmount} 
            onAnimationComplete={handleWinAnimationComplete} 
        />

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <SpinButton onClick={handleSpin} isLoading={spinning} disabled={spinning || (isAutospin && credits < spinCost)}>
            {spinning ? 'Spinning...' : 'Spin'}
          </SpinButton>
          <Button 
            variant="outline" 
            className="border-gold text-gold hover:bg-gold/10 w-full md:w-auto"
            onClick={handleToggleAutospin}
            disabled={spinning && isAutospin}
          >
            {isAutospin ? <PauseCircle className="mr-2"/> : <PlayCircle className="mr-2"/>}
            {isAutospin ? 'Stop Auto' : 'Autospin'}
          </Button>
        </div>
        {/* <AutospinSwitch isAutospin={isAutospin} onToggle={handleToggleAutospin} disabled={spinning}/> */}
      </main>

      <footer className="mt-12 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
        <p>Games are for entertainment purposes only. Play responsibly.</p>
      </footer>
    </div>
  );
}

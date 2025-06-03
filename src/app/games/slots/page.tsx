
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import CreditDisplay from '@/components/game/CreditDisplay';
import GameGrid from '@/components/game/GameGrid';
import GridBox from '@/components/game/GridBox';
import SpinButton from '@/components/game/SpinButton';
// import AutospinSwitch from '@/components/game/AutospinSwitch'; // Commented out as per previous state
import ResultsDisplay from '@/components/game/ResultsDisplay';
import WinAnimation from '@/components/game/WinAnimation';
import Navbar from '@/components/layout/navbar';
import { PlayCircle, PauseCircle } from 'lucide-react';

import CherrySymbol from '@/components/game/symbols/CherrySymbol';
import DiamondSymbol from '@/components/game/symbols/DiamondSymbol';
import GoldCoinSymbol from '@/components/game/symbols/GoldCoinSymbol';
import BellSymbol from '@/components/game/symbols/BellSymbol';

import { classicSlotsTheme } from '@/game-themes/classic-slots.theme'; // Default theme
import { megaSlotsTheme } from '@/game-themes/mega-slots.theme'; // Alternative theme
import type { SlotGameThemeConfig } from '@/types/game-theme';

// --- Symbol Component Mapping ---
// This maps symbol string identifiers from the theme config to actual React components.
const allSymbolComponents: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  CherrySymbol: CherrySymbol,
  DiamondSymbol: DiamondSymbol,
  GoldCoinSymbol: GoldCoinSymbol,
  BellSymbol: BellSymbol,
  // Add other symbols here as they are created and imported
  // e.g., SevenSymbol: SevenSymbol,
};
// --- End Symbol Component Mapping ---


export default function SlotsPage() {
  // TODO: Implement theme selection logic. For now, defaults to classicSlotsTheme.
  // const [currentTheme, setCurrentTheme] = useState<SlotGameThemeConfig>(classicSlotsTheme);
  // For demonstration, let's allow switching between two themes (this would typically be more sophisticated)
  const [activeThemeConfig, setActiveThemeConfig] = useState<SlotGameThemeConfig>(classicSlotsTheme);

  const rows = activeThemeConfig.grid.rows;
  const cols = activeThemeConfig.grid.cols;

  // Filter and map symbols based on the active theme's configuration
  const themeSymbols = activeThemeConfig.symbols
    .map(symbolId => allSymbolComponents[symbolId])
    .filter((component): component is React.FC<React.SVGProps<SVGSVGElement>> => Boolean(component));

  const getRandomSymbol = useCallback(() => {
    if (themeSymbols.length === 0) {
      // Fallback or error handling if no symbols are available for the theme
      return (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props}><text x="10" y="50">?</text></svg>;
    }
    return themeSymbols[Math.floor(Math.random() * themeSymbols.length)];
  }, [themeSymbols]);

  const initialReels = useCallback((r: number, c: number) =>
    Array(r)
      .fill(null)
      .map(() => Array(c).fill(null).map(() => getRandomSymbol())),
    [getRandomSymbol]
  );

  const [reels, setReels] = useState(() => initialReels(rows, cols));
  const [spinning, setSpinning] = useState(false);
  const [credits, setCredits] = useState(1000);
  const [isAutospin, setIsAutospin] = useState(false);
  const [resultsMessage, setResultsMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [showWinAnimation, setShowWinAnimation] = useState(false);

  const spinCost = 10;

  // Effect to re-initialize reels when theme (and thus rows/cols) changes
  useEffect(() => {
    setReels(initialReels(rows, cols));
  }, [rows, cols, initialReels]);


  const handleSpin = useCallback(() => {
    if (credits < spinCost) {
      setResultsMessage("Not enough credits to spin!");
      setIsWin(false);
      setIsAutospin(false);
      return;
    }

    setSpinning(true);
    setCredits((prev) => prev - spinCost);
    setResultsMessage(null);
    setIsWin(null);

    const newReelsVisual = initialReels(rows, cols);
    setReels(newReelsVisual);

    let spinIntervals = 0;
    const interval = setInterval(() => {
      setReels(currentReels => currentReels.map(row => row.map(() => getRandomSymbol())));
      spinIntervals++;
      if (spinIntervals >= 10) { // Spin for 1 second
        clearInterval(interval);
        
        const finalReels = initialReels(rows, cols);
        setReels(finalReels);
        setSpinning(false);

        // Win condition: 3 (or more, if cols > 3) of the same symbol in the middle row
        const middleRowIndex = Math.floor(rows / 2);
        const middleRowSymbols = finalReels[middleRowIndex];
        
        if (middleRowSymbols && middleRowSymbols.length > 0) {
            const firstSymbolComponent = middleRowSymbols[0];
            const isWinningRow = middleRowSymbols.every(
            (symbolComponent) => symbolComponent === firstSymbolComponent
            );

            if (isWinningRow) {
            const currentWinAmount = 100; // Example win amount
            setResultsMessage(\`You won \${currentWinAmount} credits!\`);
            setIsWin(true);
            setCredits((prev) => prev + currentWinAmount);
            setWinAmount(currentWinAmount);
            setShowWinAnimation(true);
            } else {
            setResultsMessage("No win this time. Try again!");
            setIsWin(false);
            }
        } else {
            setResultsMessage("Error determining outcome.");
            setIsWin(false);
        }
      }
    }, 100);
  }, [credits, rows, cols, initialReels, getRandomSymbol]);

  useEffect(() => {
    let autoSpinTimeout: NodeJS.Timeout;
    if (isAutospin && !spinning && credits >= spinCost) {
      autoSpinTimeout = setTimeout(handleSpin, 1500);
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
    if (isAutospin) {
        setResultsMessage(null);
    }
  };
  
  const handleWinAnimationComplete = () => {
    setShowWinAnimation(false);
    setWinAmount(0);
  };

  const toggleTheme = () => {
    setActiveThemeConfig(prevTheme => 
      prevTheme.themeId === classicSlotsTheme.themeId ? megaSlotsTheme : classicSlotsTheme
    );
  };

  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col items-center p-4">
      <Navbar />
      <header className="my-8 text-center">
        <h1 className="text-5xl font-bold font-headline text-gold">{activeThemeConfig.displayName}</h1>
        <p className="text-xl text-silver mt-2">{activeThemeConfig.description}</p>
      </header>

      <main className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <CreditDisplay initialCredits={credits} />
        
        {/* Button to toggle theme for demonstration */}
        <Button onClick={toggleTheme} variant="outline" className="border-gold text-gold hover:bg-gold/10">
          Switch to {activeThemeConfig.themeId === classicSlotsTheme.themeId ? megaSlotsTheme.displayName : classicSlotsTheme.displayName}
        </Button>

        {themeSymbols.length > 0 ? (
            <GameGrid rows={rows} cols={cols} className={activeThemeConfig.backgroundAsset}>
            {reels.flat().map((SymbolComponent, index) => (
                <GridBox
                key={index}
                className={spinning ? 'animate-pulse' : ''}
                >
                <SymbolComponent className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-1" />
                </GridBox>
            ))}
            </GameGrid>
        ) : (
            <div className="text-center text-red-400 p-4 border border-red-400 rounded-md">
                <p>Error: No symbols configured for the current theme.</p>
                <p>Please check the theme configuration: <code className="bg-black/20 px-1 rounded">{activeThemeConfig.themeId}</code></p>
            </div>
        )}


        {resultsMessage && <ResultsDisplay message={resultsMessage} isWin={isWin} />}
        
        <WinAnimation 
            trigger={showWinAnimation} 
            winAmount={winAmount} 
            onAnimationComplete={handleWinAnimationComplete} 
        />

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <SpinButton onClick={handleSpin} isLoading={spinning} disabled={spinning || (isAutospin && credits < spinCost) || themeSymbols.length === 0}>
            {spinning ? 'Spinning...' : 'Spin'}
          </SpinButton>
          <Button 
            variant="outline" 
            className="border-gold text-gold hover:bg-gold/10 w-full md:w-auto"
            onClick={handleToggleAutospin}
            disabled={(spinning && isAutospin) || themeSymbols.length === 0}
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

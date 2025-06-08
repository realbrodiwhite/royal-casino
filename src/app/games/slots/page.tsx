
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import UserBalanceDisplay from '@/components/game/UserBalanceDisplay'; // Updated import
// XpDisplay removed
import GameGrid from '@/components/game/GameGrid';
import GridBox from '@/components/game/GridBox';
import SpinButton from '@/components/game/SpinButton';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import WinAnimation from '@/components/game/WinAnimation';
import Navbar from '@/components/layout/navbar';
import { PlayCircle, PauseCircle, Palette, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useXp } from '@/contexts/XpContext'; // Import useXp

import CherrySymbol from '@/components/game/symbols/CherrySymbol';
import DiamondSymbol from '@/components/game/symbols/DiamondSymbol';
import GoldCoinSymbol from '@/components/game/symbols/GoldCoinSymbol';
import BellSymbol from '@/components/game/symbols/BellSymbol';
// Import new symbol components here when created, e.g.:
// import PumpkinSymbol from '@/components/game/symbols/PumpkinSymbol';
// import GhostSymbol from '@/components/game/symbols/GhostSymbol';
// import BatSymbol from '@/components/game/symbols/BatSymbol';
// import WitchHatSymbol from '@/components/game/symbols/WitchHatSymbol';


import { classicSlotsTheme } from '@/game-themes/classic-slots.theme';
import { vegasAdventureTheme } from '@/game-themes/vegas-adventure.theme';
import { horrificHalloweenTheme } from '@/game-themes/horrific-halloween.theme'; // Import the new theme
import type { SlotGameThemeConfig } from '@/types/game-theme';

const allSymbolComponents: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  CherrySymbol: CherrySymbol,
  DiamondSymbol: DiamondSymbol,
  GoldCoinSymbol: GoldCoinSymbol,
  BellSymbol: BellSymbol,
  // Add new symbols here once their components are created:
  PumpkinSymbol: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props} data-ai-hint="jack-o-lantern pumpkin"><text x="25" y="65" fontSize="50">🎃</text></svg>, // Placeholder
  GhostSymbol: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props} data-ai-hint="spooky ghost"><text x="25" y="65" fontSize="50">👻</text></svg>,     // Placeholder
  BatSymbol: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props} data-ai-hint="flying bat"><text x="25" y="65" fontSize="50">🦇</text></svg>,       // Placeholder
  WitchHatSymbol: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props} data-ai-hint="witch hat"><text x="25" y="65" fontSize="50">🧙</text></svg>, // Placeholder
};

interface SymbolData {
  id: string;
  component: React.FC<React.SVGProps<SVGSVGElement>>;
}

const FALLBACK_SYMBOL: SymbolData = {
  id: "fallback",
  component: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props} data-ai-hint="question mark error"><text x="25" y="65" fontSize="50">?</text></svg>,
};

const availableThemes: SlotGameThemeConfig[] = [classicSlotsTheme, vegasAdventureTheme, horrificHalloweenTheme]; // Add new theme to the list

const themeImagePaths: Record<string, string> = {
  'classic-slots': '/images/theme-art/classic-slots-theme.svg',
  'vegas-adventure': '/images/theme-art/vegas-adventure-theme.svg',
  'horrific-halloween': '/images/theme-art/horrific-halloween-theme.svg',
};

type CellCoordinate = [number, number];

export default function SlotsPage() {
  const { addXp } = useXp(); // Get addXp from context
  const [selectedTheme, setSelectedTheme] = useState<SlotGameThemeConfig | null>(null);

  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [availableSymbolsWithData, setAvailableSymbolsWithData] = useState<Array<SymbolData & { weight: number }>>([]);

  useEffect(() => {
    if (selectedTheme) {
      setRows(selectedTheme.grid.rows);
      setCols(selectedTheme.grid.cols);
      const currentSymbols = selectedTheme.symbols
        .map(themeSymbol => {
          const component = allSymbolComponents[themeSymbol.id];
          if (component) {
            return { id: themeSymbol.id, component, weight: themeSymbol.weight };
          }
          console.warn(`Symbol component for id '${themeSymbol.id}' not found in allSymbolComponents. Using fallback.`);
          return { id: themeSymbol.id, component: FALLBACK_SYMBOL.component, weight: themeSymbol.weight }; // Use fallback if symbol not found
        })
        .filter((item): item is SymbolData & { weight: number } => Boolean(item));
      setAvailableSymbolsWithData(currentSymbols);
    }
  }, [selectedTheme]);


  const getRandomSymbolData = useCallback((): SymbolData => {
    if (availableSymbolsWithData.length === 0) {
      console.warn("No symbols available in availableSymbolsWithData, returning FALLBACK_SYMBOL");
      return FALLBACK_SYMBOL;
    }

    const totalWeight = availableSymbolsWithData.reduce((sum, symbol) => sum + symbol.weight, 0);
    if (totalWeight === 0) {
        console.warn("Total weight of available symbols is 0, returning FALLBACK_SYMBOL");
        return FALLBACK_SYMBOL;
    }
    let random = Math.random() * totalWeight;

    for (const symbol of availableSymbolsWithData) {
      if (random < symbol.weight) {
        return { id: symbol.id, component: symbol.component };
      }
      random -= symbol.weight;
    }
    // Fallback to the last symbol if somehow random logic fails (should not happen if weights are positive)
    const lastSymbol = availableSymbolsWithData[availableSymbolsWithData.length - 1];
    return {id: lastSymbol.id, component: lastSymbol.component};
  }, [availableSymbolsWithData]);

  const initialReels = useCallback((r: number, c: number): SymbolData[][] =>
    Array(r)
      .fill(null)
      .map(() => Array(c).fill(null).map(() => getRandomSymbolData())),
    [getRandomSymbolData]
  );

  const [reels, setReels] = useState<SymbolData[][]>(() => initialReels(rows, cols));
  const [spinning, setSpinning] = useState(false);
  const [standardCredits, setStandardCredits] = useState(1000);
  const [premiumCoins, setPremiumCoins] = useState(50); // Mock premium coins
  const [isAutospin, setIsAutospin] = useState(false);
  const [resultsMessage, setResultsMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [highlightedWinningCells, setHighlightedWinningCells] = useState<CellCoordinate[]>([]);

  const spinCost = 10; // Assuming spin cost is in standard credits
  const mockDiamondUserCount = 1234; // Mock data for new display

  useEffect(() => {
    if (selectedTheme) {
      setReels(initialReels(selectedTheme.grid.rows, selectedTheme.grid.cols));
      setHighlightedWinningCells([]);
    }
  }, [selectedTheme, initialReels]);

  const calculateWins = useCallback((
    finalReels: SymbolData[][],
    theme: SlotGameThemeConfig,
    betAmount: number
  ): { totalWinAmount: number; winDetails: Array<{ paylineIndex: number; symbolId: string; count: number; amount: number; line: Array<CellCoordinate> }> } => {
    let totalWinAmount = 0;
    const winDetails: Array<{ paylineIndex: number; symbolId: string; count: number; amount: number; line: Array<CellCoordinate> }> = [];

    if (!theme.paylines || !theme.paytable) {
      console.warn("Paylines or paytable not defined for the theme.");
      return { totalWinAmount: 0, winDetails: [] };
    }

    theme.paylines.forEach((payline, paylineIndex) => {
      const symbolsOnPayline: SymbolData[] = [];
      for (const [r, c] of payline) {
        if (finalReels[r] && finalReels[r][c]) {
          symbolsOnPayline.push(finalReels[r][c]);
        } else {
          console.error(`Invalid coordinate [${r},${c}] in payline ${paylineIndex} for current grid dimensions ${theme.grid.rows}x${theme.grid.cols}. FinalReels:`, finalReels);
          return;
        }
      }

      if (symbolsOnPayline.length === 0) return;

      const firstSymbolId = symbolsOnPayline[0].id;
      if (firstSymbolId === FALLBACK_SYMBOL.id) return;

      let matchCount = 0;
      for (const symbolData of symbolsOnPayline) {
        if (symbolData.id === firstSymbolId) {
          matchCount++;
        } else {
          break;
        }
      }

      if (matchCount > 0) {
        const symbolPaytableInfo = theme.paytable[firstSymbolId];
        if (symbolPaytableInfo) {
          let actualPayoutMultiplier = 0;
          let paidMatchCount = 0;
          for (let count = matchCount; count >=1; count--) {
            if (symbolPaytableInfo[count]) {
              actualPayoutMultiplier = symbolPaytableInfo[count];
              paidMatchCount = count;
              break;
            }
          }

          if (actualPayoutMultiplier > 0 && paidMatchCount > 0) {
            const winAmountForPayline = actualPayoutMultiplier * betAmount;
            totalWinAmount += winAmountForPayline;
            winDetails.push({
              paylineIndex,
              symbolId: firstSymbolId,
              count: paidMatchCount,
              amount: winAmountForPayline,
              line: payline.slice(0, paidMatchCount) as CellCoordinate[]
            });
          }
        }
      }
    });

    return { totalWinAmount, winDetails };
  }, []);


  const handleSpin = useCallback(() => {
    setShowWinAnimation(false);
    setHighlightedWinningCells([]);

    if (!selectedTheme) return;

    if (standardCredits < spinCost) {
      setResultsMessage("Not enough standard credits to spin!");
      setIsWin(false);
      setIsAutospin(false);
      return;
    }
    if (availableSymbolsWithData.length === 0) {
      setResultsMessage("No symbols available for this theme. Check console for details.");
      console.error("Aborting spin: availableSymbolsWithData is empty. Selected theme:", selectedTheme);
      setIsWin(false);
      return;
    }

    setSpinning(true);
    setStandardCredits((prev) => prev - spinCost);
    addXp(spinCost); 
    setResultsMessage(null);
    setIsWin(null);
    setWinAmount(0);

    let spinCycles = 0;
    const visualSpinInterval = setInterval(() => {
      setReels(currentReels => currentReels.map(row => row.map(() => getRandomSymbolData())));
      spinCycles++;
      if (spinCycles >= 10) {
        clearInterval(visualSpinInterval);

        const finalReelsResult = initialReels(selectedTheme.grid.rows, selectedTheme.grid.cols);
        setReels(finalReelsResult);
        setSpinning(false);

        const { totalWinAmount, winDetails } = calculateWins(finalReelsResult, selectedTheme, spinCost);

        if (totalWinAmount > 0) {
          const winMessages = winDetails.map(detail =>
            `${detail.count} ${detail.symbolId}(s) on line ${detail.paylineIndex + 1} for ${detail.amount}`
          );
          setResultsMessage(`You won ${totalWinAmount} credits! ${winDetails.length > 1 ? 'Details: ' + winMessages.join('; ') : winMessages[0]}`);
          setIsWin(true);
          setStandardCredits((prev) => prev + totalWinAmount); // Winnings are in standard credits
          setWinAmount(totalWinAmount);
          setShowWinAnimation(true);

          const allWinningCells: CellCoordinate[] = [];
          winDetails.forEach(detail => {
            detail.line.forEach(coord => {
              if (!allWinningCells.find(c => c[0] === coord[0] && c[1] === coord[1])) {
                allWinningCells.push(coord);
              }
            });
          });
          setHighlightedWinningCells(allWinningCells);

        } else {
          setResultsMessage("No win this time. Try again!");
          setIsWin(false);
          setHighlightedWinningCells([]);
        }
      }
    }, 100);
  }, [standardCredits, initialReels, getRandomSymbolData, availableSymbolsWithData, calculateWins, selectedTheme, spinCost, addXp]);

  useEffect(() => {
    let autoSpinTimeout: NodeJS.Timeout;
    if (selectedTheme && isAutospin && !spinning && standardCredits >= spinCost && availableSymbolsWithData.length > 0) {
      autoSpinTimeout = setTimeout(handleSpin, 2000);
    }
    return () => clearTimeout(autoSpinTimeout);
  }, [isAutospin, spinning, standardCredits, handleSpin, availableSymbolsWithData.length, selectedTheme]);

  const handleToggleAutospin = () => {
    if (!selectedTheme) return;
    if (!isAutospin && standardCredits < spinCost) {
        setResultsMessage("Not enough credits to start autospin!");
        setIsWin(false);
        return;
    }
    if (availableSymbolsWithData.length === 0 && !isAutospin) {
        setResultsMessage("Cannot start autospin: No symbols available for this theme.");
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
    setHighlightedWinningCells([]);
  };

  const handleThemeSelect = (theme: SlotGameThemeConfig) => {
    setSelectedTheme(theme);
    setIsAutospin(false); 
    setResultsMessage(null);
    setIsWin(null);
    setShowWinAnimation(false);
    setWinAmount(0);
    setHighlightedWinningCells([]);
  };

  if (!selectedTheme) {
    return (
      <div className="min-h-screen text-foreground flex flex-col items-center p-4 pt-[88px] sm:pt-[92px]">
        <Navbar />
        <header className="my-6 sm:my-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Choose Your Slot Adventure!</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-2 px-2">Select a theme to start playing.</p>
        </header>
        <main className="flex flex-wrap justify-center items-stretch gap-6 sm:gap-8 w-full max-w-5xl px-2">
          {availableThemes.map(theme => (
            <Card key={theme.themeId} className="w-full sm:w-72 md:w-80 bg-card border-border shadow-xl hover:shadow-primary/50 transition-all duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                 <Sparkles className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-xl sm:text-2xl font-headline text-primary">{theme.displayName}</CardTitle>
                <CardDescription className="text-muted-foreground min-h-[3.5rem] overflow-hidden text-ellipsis text-sm">{theme.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-center">
                 <p className="text-xs text-muted-foreground text-center mb-1">Grid: {theme.grid.rows}x{theme.grid.cols}</p>
                 <p className="text-xs text-muted-foreground text-center mb-3">Symbols: {theme.symbols.length}</p>
                 <Image
                    src={themeImagePaths[theme.themeId] || `/images/theme-art/default-theme.svg`}
                    alt={theme.displayName}
                    width={200}
                    height={100}
                    className="rounded-md mx-auto object-cover"
                 />
              </CardContent>
              <CardFooter className="mt-auto">
                <Button onClick={() => handleThemeSelect(theme)} variant="default" className="w-full">
                  Play {theme.displayName}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </main>
         <footer className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-muted-foreground px-2 py-1.5 sm:py-2 border-t border-border">
            <p>&copy; 2025 Royal Casino. All Rights Reserved. Built By Brodi Inc.</p>
         </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col items-center p-4 pt-[88px] sm:pt-[92px]">
      <Navbar />
      <header className="my-6 sm:my-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">{selectedTheme.displayName}</h1>
        <p className="text-md sm:text-lg text-muted-foreground mt-2 px-2">{selectedTheme.description}</p>
      </header>

      <main className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-2xl px-2">
        <div className="w-full max-w-lg mx-auto"> {/* Adjusted max-width for 3 cards */}
            <UserBalanceDisplay standardCredits={standardCredits} premiumCoins={premiumCoins} diamondUserCount={mockDiamondUserCount} />
        </div>

        <Button onClick={() => handleThemeSelect(null)} variant="outline" className="w-full sm:w-auto">
          <Palette className="mr-2 h-4 w-4" /> Change Theme
        </Button>

        {availableSymbolsWithData.length > 0 ? (
          <GameGrid rows={rows} cols={cols} className={selectedTheme.backgroundAsset}>
            {reels.flat().map((symbolData, index) => {
              const rowIndex = Math.floor(index / cols);
              const colIndex = index % cols;
              const isWinning = showWinAnimation && highlightedWinningCells.some(
                cell => cell[0] === rowIndex && cell[1] === colIndex
              );
              return (
                <GridBox
                  key={index}
                  className={spinning ? 'animate-pulse' : ''}
                  isWinningCell={isWinning}
                >
                  <symbolData.component className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 p-1" />
                </GridBox>
              );
            })}
          </GameGrid>
        ) : (
          <div className="text-center text-destructive p-4 border border-destructive rounded-md bg-destructive/10">
            <p>Error: No symbols configured or available for the current theme: <code className="bg-destructive/20 px-1 rounded">{selectedTheme.themeId}</code>.</p>
            <p>Please check the theme configuration and ensure symbols are correctly mapped and available in <code className="bg-destructive/20 px-1 rounded">allSymbolComponents</code>.</p>
          </div>
        )}

        {resultsMessage && <ResultsDisplay message={resultsMessage} isWin={isWin} />}

        <WinAnimation
            trigger={showWinAnimation}
            winAmount={winAmount}
            onAnimationComplete={handleWinAnimationComplete}
        />

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <SpinButton
            onClick={handleSpin}
            isLoading={spinning}
            disabled={spinning || (isAutospin && standardCredits < spinCost) || availableSymbolsWithData.length === 0}
            className="w-full sm:w-auto"
          >
            {spinning ? 'Spinning...' : 'Spin'}
          </SpinButton>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleToggleAutospin}
            disabled={(spinning && isAutospin) || (availableSymbolsWithData.length === 0 && !isAutospin)}
          >
            {isAutospin ? <PauseCircle className="mr-2"/> : <PlayCircle className="mr-2"/>}
            {isAutospin ? 'Stop Auto' : 'Autospin'}
          </Button>
        </div>
      </main>

      <footer className="text-center py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground border-t border-border">
        <p>&copy; 2025 Royal Casino. All Rights Reserved. Built By Brodi Inc.</p>
        <p>Games are for entertainment purposes only. Play responsibly.</p>
      </footer>
    </div>
  );
}

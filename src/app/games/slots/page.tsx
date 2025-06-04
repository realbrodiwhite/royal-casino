
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import CreditDisplay from '@/components/game/CreditDisplay';
import XpDisplay from '@/components/game/XpDisplay';
import GameGrid from '@/components/game/GameGrid';
import GridBox from '@/components/game/GridBox';
import SpinButton from '@/components/game/SpinButton';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import WinAnimation from '@/components/game/WinAnimation';
import Navbar from '@/components/layout/navbar';
import { PlayCircle, PauseCircle, Palette, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

import CherrySymbol from '@/components/game/symbols/CherrySymbol';
import DiamondSymbol from '@/components/game/symbols/DiamondSymbol';
import GoldCoinSymbol from '@/components/game/symbols/GoldCoinSymbol';
import BellSymbol from '@/components/game/symbols/BellSymbol';

import { classicSlotsTheme } from '@/game-themes/classic-slots.theme';
import { vegasAdventureTheme } from '@/game-themes/vegas-adventure.theme';
import type { SlotGameThemeConfig } from '@/types/game-theme';

const allSymbolComponents: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  CherrySymbol: CherrySymbol,
  DiamondSymbol: DiamondSymbol,
  GoldCoinSymbol: GoldCoinSymbol,
  BellSymbol: BellSymbol,
};

interface SymbolData {
  id: string;
  component: React.FC<React.SVGProps<SVGSVGElement>>;
}

const FALLBACK_SYMBOL: SymbolData = {
  id: "fallback",
  component: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props}><text x="10" y="50">?</text></svg>,
};

const availableThemes: SlotGameThemeConfig[] = [classicSlotsTheme, vegasAdventureTheme];

export default function SlotsPage() {
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
          console.warn(`Symbol component for id '${themeSymbol.id}' not found in allSymbolComponents.`);
          return null;
        })
        .filter((item): item is SymbolData & { weight: number } => Boolean(item));
      setAvailableSymbolsWithData(currentSymbols);
    }
  }, [selectedTheme]);


  const getRandomSymbolData = useCallback((): SymbolData => {
    if (availableSymbolsWithData.length === 0) {
      return FALLBACK_SYMBOL;
    }

    const totalWeight = availableSymbolsWithData.reduce((sum, symbol) => sum + symbol.weight, 0);
    let random = Math.random() * totalWeight;

    for (const symbol of availableSymbolsWithData) {
      if (random < symbol.weight) {
        return { id: symbol.id, component: symbol.component };
      }
      random -= symbol.weight;
    }
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
  const [credits, setCredits] = useState(1000);
  const [experiencePoints, setExperiencePoints] = useState(0); 
  const [isAutospin, setIsAutospin] = useState(false);
  const [resultsMessage, setResultsMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [showWinAnimation, setShowWinAnimation] = useState(false);

  const spinCost = 10;

  useEffect(() => {
    if (selectedTheme) {
      setReels(initialReels(selectedTheme.grid.rows, selectedTheme.grid.cols));
    }
  }, [selectedTheme, initialReels]);

  const calculateWins = useCallback((
    finalReels: SymbolData[][],
    theme: SlotGameThemeConfig,
    betAmount: number
  ): { totalWinAmount: number; winDetails: Array<{ paylineIndex: number; symbolId: string; count: number; amount: number; line: Array<[number,number]> }> } => {
    let totalWinAmount = 0;
    const winDetails: Array<{ paylineIndex: number; symbolId: string; count: number; amount: number; line: Array<[number,number]> }> = [];

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
          console.error(`Invalid coordinate [${r},${c}] in payline ${paylineIndex} for current grid dimensions.`);
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
              line: payline
            });
          }
        }
      }
    });

    return { totalWinAmount, winDetails };
  }, []);


  const handleSpin = useCallback(() => {
    setShowWinAnimation(false); 

    if (!selectedTheme) return;

    if (credits < spinCost) {
      setResultsMessage("Not enough credits to spin!");
      setIsWin(false);
      setIsAutospin(false);
      return;
    }
    if (availableSymbolsWithData.length === 0) {
      setResultsMessage("No symbols available for this theme.");
      setIsWin(false);
      return;
    }

    setSpinning(true);
    setCredits((prev) => prev - spinCost);
    setExperiencePoints((prevXp) => prevXp + spinCost); 
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
            `${detail.count} ${detail.symbolId}s on line ${detail.paylineIndex + 1} (${detail.line.map(c => `[${c[0]},${c[1]}]`).join(' ')}) for ${detail.amount}`
          );
          setResultsMessage(`You won ${totalWinAmount} credits! ${winDetails.length > 1 ? 'Details: ' + winMessages.join('; ') : winMessages[0]}`);
          setIsWin(true);
          setCredits((prev) => prev + totalWinAmount);
          setWinAmount(totalWinAmount);
          setShowWinAnimation(true);
        } else {
          setResultsMessage("No win this time. Try again!");
          setIsWin(false);
        }
      }
    }, 100);
  }, [credits, initialReels, getRandomSymbolData, availableSymbolsWithData.length, calculateWins, selectedTheme, spinCost]);

  useEffect(() => {
    let autoSpinTimeout: NodeJS.Timeout;
    if (selectedTheme && isAutospin && !spinning && credits >= spinCost && availableSymbolsWithData.length > 0) {
      autoSpinTimeout = setTimeout(handleSpin, 2000);
    }
    return () => clearTimeout(autoSpinTimeout);
  }, [isAutospin, spinning, credits, handleSpin, availableSymbolsWithData.length, selectedTheme]);

  const handleToggleAutospin = () => {
    if (!selectedTheme) return;
    if (!isAutospin && credits < spinCost) {
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
  };

  const handleThemeSelect = (theme: SlotGameThemeConfig) => {
    setSelectedTheme(theme);
    setIsAutospin(false);
    setResultsMessage(null);
    setIsWin(null);
    // Reset credits and XP here if desired when switching themes, or manage globally
  };

  if (!selectedTheme) {
    return (
      <div className="min-h-screen text-foreground flex flex-col items-center p-4">
        <Navbar />
        <header className="my-6 sm:my-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">Choose Your Slot Adventure!</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-2 px-2">Select a theme to start playing.</p>
        </header>
        <main className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 w-full max-w-4xl px-2">
          {availableThemes.map(theme => (
            <Card key={theme.themeId} className="w-full sm:max-w-xs bg-card border-border shadow-xl hover:shadow-primary/50 transition-all duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                 <Sparkles className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-xl font-headline text-primary">{theme.displayName}</CardTitle>
                <CardDescription className="text-muted-foreground h-16 overflow-hidden text-ellipsis text-sm">{theme.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-center">
                 <p className="text-xs text-muted-foreground text-center mb-1">Grid: {theme.grid.rows}x{theme.grid.cols}</p>
                 <p className="text-xs text-muted-foreground text-center mb-3">Symbols: {theme.symbols.length}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleThemeSelect(theme)} variant="default" className="w-full">
                  Play {theme.displayName}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </main>
         <footer className="mt-8 sm:mt-12 text-center text-sm text-muted-foreground px-2">
            <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
         </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col items-center p-4">
      <Navbar />
      <header className="my-6 sm:my-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">{selectedTheme.displayName}</h1>
        <p className="text-md sm:text-lg text-muted-foreground mt-2 px-2">{selectedTheme.description}</p>
      </header>

      <main className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-2xl px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <CreditDisplay initialCredits={credits} />
            <XpDisplay experiencePoints={experiencePoints} />
        </div>

        <Button onClick={() => setSelectedTheme(null)} variant="outline" className="w-full sm:w-auto">
          <Palette className="mr-2 h-4 w-4" /> Change Theme
        </Button>

        {availableSymbolsWithData.length > 0 ? (
          <GameGrid rows={rows} cols={cols} className={selectedTheme.backgroundAsset}>
            {reels.flat().map((symbolData, index) => (
              <GridBox
                key={index}
                className={spinning ? 'animate-pulse' : ''}
              >
                <symbolData.component className="w-12 h-12 xs:w-14 xs:h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 p-1" />
              </GridBox>
            ))}
          </GameGrid>
        ) : (
          <div className="text-center text-destructive p-4 border border-destructive rounded-md bg-destructive/10">
            <p>Error: No symbols configured or available for the current theme: <code className="bg-destructive/20 px-1 rounded">{selectedTheme.themeId}</code>.</p>
            <p>Please check the theme configuration and ensure symbols are correctly mapped and weighted.</p>
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
            disabled={spinning || (isAutospin && credits < spinCost) || availableSymbolsWithData.length === 0}
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

      <footer className="mt-8 sm:mt-12 text-center text-sm text-muted-foreground px-2">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
        <p>Games are for entertainment purposes only. Play responsibly.</p>
      </footer>
    </div>
  );
}

    
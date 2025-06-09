
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import UserBalanceDisplay from '@/components/game/CreditDisplay';
import GameGrid from '@/components/game/GameGrid';
import GridBox from '@/components/game/GridBox';
import SpinButton from '@/components/game/SpinButton';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import WinAnimation from '@/components/game/WinAnimation';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import { PlayCircle, PauseCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useXp } from '@/contexts/XpContext'; 
import { weightedRandom as b3WeightedRandom } from '@/lib/b3-engine';

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

export default function LegacySlotsPage() { 
  const [activeThemeConfig, setActiveThemeConfig] = useState<SlotGameThemeConfig>(classicSlotsTheme);
  const { toast } = useToast();
  const { addXp } = useXp(); 

  const rows = activeThemeConfig.grid.rows;
  const cols = activeThemeConfig.grid.cols;

  const [availableSymbolsWithData, setAvailableSymbolsWithData] = useState<Array<SymbolData & { weight: number }>>([]);

  useEffect(() => {
    const currentSymbols = activeThemeConfig.symbols
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
  }, [activeThemeConfig]);


  const getRandomSymbolData = useCallback((): SymbolData => {
    if (availableSymbolsWithData.length === 0) {
      console.warn("No symbols available in availableSymbolsWithData (LegacySlots), returning FALLBACK_SYMBOL");
      return FALLBACK_SYMBOL;
    }
    const selectedSymbolWithWeight = b3WeightedRandom(availableSymbolsWithData);
    if (selectedSymbolWithWeight) {
      return { id: selectedSymbolWithWeight.id, component: selectedSymbolWithWeight.component };
    }
    console.warn("b3WeightedRandom returned null in LegacySlots, falling back to FALLBACK_SYMBOL.");
    return FALLBACK_SYMBOL;
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
  const [isAutospin, setIsAutospin] = useState(false);
  const [resultsMessage, setResultsMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [showWinAnimation, setShowWinAnimation] = useState(false);

  const spinCost = 10; 

  useEffect(() => {
    setReels(initialReels(rows, cols));
  }, [rows, cols, initialReels, activeThemeConfig]);

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
    addXp(spinCost); 
    setResultsMessage(null);
    setIsWin(null);
    setShowWinAnimation(false);
    setWinAmount(0);

    let spinCycles = 0;
    const visualSpinInterval = setInterval(() => {
      setReels(currentReels => currentReels.map(row => row.map(() => getRandomSymbolData())));
      spinCycles++;
      if (spinCycles >= 10) { 
        clearInterval(visualSpinInterval);
        
        const finalReelsResult = initialReels(rows, cols);
        setReels(finalReelsResult);
        setSpinning(false);

        const { totalWinAmount, winDetails } = calculateWins(finalReelsResult, activeThemeConfig, spinCost);

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
  }, [credits, rows, cols, initialReels, getRandomSymbolData, availableSymbolsWithData.length, calculateWins, activeThemeConfig, spinCost, addXp]);

  useEffect(() => {
    let autoSpinTimeout: NodeJS.Timeout;
    if (isAutospin && !spinning && credits >= spinCost && availableSymbolsWithData.length > 0) {
      autoSpinTimeout = setTimeout(handleSpin, 2000); 
    }
    return () => clearTimeout(autoSpinTimeout);
  }, [isAutospin, spinning, credits, handleSpin, availableSymbolsWithData.length]);
  
  const handleToggleAutospin = () => {
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

  const toggleTheme = () => {
    setActiveThemeConfig(prevTheme => 
      prevTheme.themeId === classicSlotsTheme.themeId ? vegasAdventureTheme : classicSlotsTheme
    );
    setIsAutospin(false);
    setResultsMessage(null);
    setIsWin(null);
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col items-center p-4 pt-[88px] sm:pt-[92px]"> 
      <Navbar />
      <header className="my-8 text-center">
        <h1 className="text-5xl font-bold font-headline text-primary">{activeThemeConfig.displayName}</h1>
        <p className="text-xl text-muted-foreground mt-2">{activeThemeConfig.description}</p>
      </header>

      <main className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <div className="w-full max-w-lg mx-auto">
            <UserBalanceDisplay credits={credits} />
        </div>
        
        <Button onClick={toggleTheme} variant="outline">
          Switch to {activeThemeConfig.themeId === classicSlotsTheme.themeId ? vegasAdventureTheme.displayName : classicSlotsTheme.displayName}
        </Button>

        {availableSymbolsWithData.length > 0 ? (
          <GameGrid rows={rows} cols={cols} className={activeThemeConfig.backgroundAsset}>
            {reels.flat().map((symbolData, index) => (
              <GridBox
                key={index}
                className={spinning ? 'animate-pulse' : ''}
              >
                <symbolData.component className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-1" />
              </GridBox>
            ))}
          </GameGrid>
        ) : (
          <div className="text-center text-destructive p-4 border border-destructive rounded-md bg-destructive/10">
            <p>Error: No symbols configured or available for the current theme: <code className="bg-destructive/20 px-1 rounded">{activeThemeConfig.themeId}</code>.</p>
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
          >
            {spinning ? 'Spinning...' : `Spin (${spinCost} Credits)`}
          </SpinButton>
          <Button 
            variant="outline" 
            className="w-full md:w-auto"
            onClick={handleToggleAutospin}
            disabled={(spinning && isAutospin) || (availableSymbolsWithData.length === 0 && !isAutospin)}
          >
            {isAutospin ? <PauseCircle className="mr-2"/> : <PlayCircle className="mr-2"/>}
            {isAutospin ? 'Stop Auto' : 'Autospin'}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

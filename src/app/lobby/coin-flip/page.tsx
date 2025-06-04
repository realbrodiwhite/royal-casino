
"use client";

import React, { useState, useCallback } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CreditDisplay from '@/components/game/CreditDisplay';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CircleDollarSign, Repeat, HelpCircle, TrendingUp, TrendingDown, Pocket, ChevronsUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type CoinSide = 'Heads' | 'Tails';
type DoubleOrNothingMode = 'inactive' | 'active';

export default function CoinFlipPage() {
  const [credits, setCredits] = useState(1000);
  const [experiencePoints, setExperiencePoints] = useState(0);
  const [betAmount, setBetAmount] = useState<number | string>(10);
  const [chosenSide, setChosenSide] = useState<CoinSide | null>(null);
  const [coinResult, setCoinResult] = useState<CoinSide | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);

  const [doubleOrNothingMode, setDoubleOrNothingMode] = useState<DoubleOrNothingMode>('inactive');
  const [currentWinningsForDouble, setCurrentWinningsForDouble] = useState(0);

  const { toast } = useToast();

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setBetAmount('');
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0) {
        setBetAmount(numValue);
      }
    }
  };

  const performFlip = (side: CoinSide, isDoubleOrNothing: boolean) => {
    setIsFlipping(true);
    setChosenSide(side);
    setGameMessage(null);
    setIsWin(null);
    setCoinResult(null);

    const currentBet = typeof betAmount === 'string' ? parseInt(betAmount, 10) : betAmount;

    if (!isDoubleOrNothing) {
      if (isNaN(currentBet) || currentBet <= 0) {
        toast({ title: "Invalid Bet", description: "Please enter a positive bet amount.", variant: "destructive" });
        setIsFlipping(false);
        return;
      }
      if (currentBet > credits) {
        toast({ title: "Not Enough Credits", description: "Your bet amount exceeds your available credits.", variant: "destructive" });
        setIsFlipping(false);
        return;
      }
      setCredits(prev => prev - currentBet);
    }

    setTimeout(() => {
      const result: CoinSide = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setCoinResult(result);
      setIsFlipping(false);

      if (isDoubleOrNothing) {
        if (result === side) {
          const newWinnings = currentWinningsForDouble * 2;
          setCurrentWinningsForDouble(newWinnings);
          setGameMessage(`Double Up WIN! It's ${result}. You now have ${newWinnings} to risk or take.`);
          setIsWin(true);
          toast({ title: "Double Up Success!", description: `Your potential winnings are now ${newWinnings}!` });
          // Stay in doubleOrNothingMode = 'active'
        } else {
          setGameMessage(`Double Up LOST. It was ${result}. You lost your ${currentWinningsForDouble} stake.`);
          setIsWin(false);
          setCurrentWinningsForDouble(0);
          setDoubleOrNothingMode('inactive');
          toast({ title: "Double Up Failed", description: "You lost the staked winnings.", variant: "destructive" });
        }
      } else { // Initial flip
        if (result === side) {
          const winnings = currentBet * 2;
          setCurrentWinningsForDouble(winnings);
          setGameMessage(`It's ${result}! You won ${winnings} credits! Double or Nothing?`);
          setIsWin(true);
          setDoubleOrNothingMode('active');
          toast({ title: "You Won!", description: `Initial flip won ${winnings}. Choose to double or take.` });
        } else {
          setGameMessage(`It's ${result}. Better luck next time!`);
          setIsWin(false);
          setDoubleOrNothingMode('inactive'); // No winnings to double
          toast({ title: "You Lost", description: `The coin landed on ${result}.`, variant: "destructive" });
        }
      }
    }, 1500);
  };

  const handleInitialFlip = (side: CoinSide) => {
    if (doubleOrNothingMode === 'active') return; // Should not happen if UI is correct
    performFlip(side, false);
  };

  const handleDoubleOrNothingAttempt = (side: CoinSide) => {
    if (doubleOrNothingMode !== 'active' || currentWinningsForDouble <= 0) return;
    performFlip(side, true);
  };

  const handleTakeWinnings = () => {
    if (doubleOrNothingMode !== 'active' || currentWinningsForDouble <= 0) return;
    setCredits(prev => prev + currentWinningsForDouble);
    setGameMessage(`You collected ${currentWinningsForDouble} credits!`);
    toast({ title: "Winnings Collected!", description: `${currentWinningsForDouble} credits added to your balance.` });
    setCurrentWinningsForDouble(0);
    setDoubleOrNothingMode('inactive');
    setIsWin(null); // Reset win state as game is over
  };


  const getCoinDisplay = () => {
    if (isFlipping) {
      return <Repeat className="h-20 w-20 sm:h-24 sm:w-24 text-primary animate-spin" />;
    }
    if (coinResult === 'Heads') {
      return <TrendingUp className="h-20 w-20 sm:h-24 sm:w-24 text-green-400" />;
    }
    if (coinResult === 'Tails') {
      return <TrendingDown className="h-20 w-20 sm:h-24 sm:w-24 text-red-400" />;
    }
    return <HelpCircle className="h-20 w-20 sm:h-24 sm:w-24 text-primary opacity-50" />;
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <header className="mb-8 sm:mb-10 text-center">
          <CircleDollarSign className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-2 sm:mb-3" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Coin Flip</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-1 px-2">Heads or Tails? Double your winnings!</p>
        </header>

        <div className="w-full max-w-xs sm:max-w-sm mx-auto mb-6 sm:mb-8">
          <CreditDisplay initialCredits={credits} />
        </div>

        <Card className="w-full max-w-md bg-card border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-primary font-headline text-center">
              {doubleOrNothingMode === 'active' ? "Double or Nothing!" : "Place Your Bet"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {doubleOrNothingMode === 'inactive' && (
              <div className="space-y-2">
                <Label htmlFor="betAmount" className="text-foreground">Bet Amount</Label>
                <Input
                  id="betAmount"
                  type="number"
                  placeholder="Enter bet amount"
                  value={betAmount}
                  onChange={handleBetAmountChange}
                  disabled={isFlipping || doubleOrNothingMode === 'active'}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground text-base sm:text-lg"
                />
              </div>
            )}

            {doubleOrNothingMode === 'active' && (
              <div className="text-center p-3 bg-primary/10 border border-primary rounded-md">
                <p className="text-lg font-semibold text-primary">Risking: {currentWinningsForDouble.toLocaleString()} credits</p>
                <p className="text-sm text-muted-foreground">Win { (currentWinningsForDouble * 2).toLocaleString()} or lose it all!</p>
              </div>
            )}

            <div className="flex justify-center items-center h-28 sm:h-32 my-3 sm:my-4">
              {getCoinDisplay()}
            </div>

            {gameMessage && (
              <ResultsDisplay message={gameMessage} isWin={isWin} />
            )}

          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:gap-4">
            {doubleOrNothingMode === 'inactive' ? (
              <>
                <Button
                  onClick={() => handleInitialFlip('Heads')}
                  disabled={isFlipping || credits < (typeof betAmount === 'number' ? betAmount : 0) || (typeof betAmount === 'string' && parseInt(betAmount) <=0) || betAmount === ''}
                  variant="default"
                  className="w-full font-semibold text-md sm:text-lg py-2.5 sm:py-3"
                >
                  Bet on Heads
                </Button>
                <Button
                  onClick={() => handleInitialFlip('Tails')}
                  disabled={isFlipping || credits < (typeof betAmount === 'number' ? betAmount : 0) || (typeof betAmount === 'string' && parseInt(betAmount) <=0) || betAmount === ''}
                  variant="outline"
                  className="w-full font-semibold text-md sm:text-lg py-2.5 sm:py-3"
                >
                  Bet on Tails
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleDoubleOrNothingAttempt('Heads')}
                  disabled={isFlipping}
                  variant="default"
                  className="w-full font-semibold text-md sm:text-lg py-2.5 sm:py-3"
                >
                  <ChevronsUp className="mr-2 h-5 w-5" /> Double on Heads
                </Button>
                <Button
                  onClick={() => handleDoubleOrNothingAttempt('Tails')}
                  disabled={isFlipping}
                  variant="outline"
                  className="w-full font-semibold text-md sm:text-lg py-2.5 sm:py-3"
                >
                  <ChevronsUp className="mr-2 h-5 w-5" /> Double on Tails
                </Button>
                <Button
                  onClick={handleTakeWinnings}
                  disabled={isFlipping}
                  variant="secondary"
                  className="w-full font-semibold text-md sm:text-lg py-2.5 sm:py-3"
                >
                  <Pocket className="mr-2 h-5 w-5" /> Take {currentWinningsForDouble.toLocaleString()} Credits
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </main>
      <footer className="text-center py-4 sm:py-6 text-xs sm:text-sm text-muted-foreground border-t border-border mt-auto">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

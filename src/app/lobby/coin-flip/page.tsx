
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CreditDisplay from '@/components/game/CreditDisplay';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CircleDollarSign, Repeat, Star, HelpCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type CoinSide = 'Heads' | 'Tails';

export default function CoinFlipPage() {
  const [credits, setCredits] = useState(1000); // Initial credits
  const [experiencePoints, setExperiencePoints] = useState(0);
  const [betAmount, setBetAmount] = useState<number | string>(10);
  const [chosenSide, setChosenSide] = useState<CoinSide | null>(null);
  const [coinResult, setCoinResult] = useState<CoinSide | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
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

  const handleFlip = useCallback((side: CoinSide) => {
    const currentBet = typeof betAmount === 'string' ? parseInt(betAmount, 10) : betAmount;

    if (isNaN(currentBet) || currentBet <= 0) {
      toast({ title: "Invalid Bet", description: "Please enter a positive bet amount.", variant: "destructive" });
      return;
    }
    if (currentBet > credits) {
      toast({ title: "Not Enough Credits", description: "Your bet amount exceeds your available credits.", variant: "destructive" });
      return;
    }

    setIsFlipping(true);
    setChosenSide(side);
    setGameMessage(null);
    setIsWin(null);
    setCoinResult(null);

    // Deduct bet and add XP
    setCredits(prev => prev - currentBet);
    setExperiencePoints(prevXp => prevXp + currentBet);

    // Simulate coin flip
    setTimeout(() => {
      const result: CoinSide = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setCoinResult(result);
      setIsFlipping(false);

      if (result === side) {
        const winnings = currentBet * 2;
        setCredits(prev => prev + winnings);
        setGameMessage(`It's ${result}! You won ${winnings} credits!`);
        setIsWin(true);
        toast({ title: "You Won!", description: `The coin landed on ${result}. You doubled your bet!` });
      } else {
        setGameMessage(`It's ${result}. Better luck next time!`);
        setIsWin(false);
        toast({ title: "You Lost", description: `The coin landed on ${result}.`, variant: "destructive" });
      }
    }, 1500); // Simulate flip duration
  }, [betAmount, credits, toast]);

  const getCoinDisplay = () => {
    if (isFlipping) {
      return <Repeat className="h-24 w-24 text-gold animate-spin" />;
    }
    if (coinResult === 'Heads') {
      return <TrendingUp className="h-24 w-24 text-green-400" />;
    }
    if (coinResult === 'Tails') {
      return <TrendingDown className="h-24 w-24 text-red-400" />;
    }
    return <HelpCircle className="h-24 w-24 text-gold opacity-50" />;
  };

  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        <header className="mb-10 text-center">
          <CircleDollarSign className="h-20 w-20 text-gold mx-auto mb-4" />
          <h1 className="text-5xl font-bold font-headline text-gold">Coin Flip</h1>
          <p className="text-xl text-silver mt-2">Heads or Tails? Test your luck!</p>
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
            <CardTitle className="text-2xl text-gold font-headline text-center">Place Your Bet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="betAmount" className="text-silver">Bet Amount</Label>
              <Input
                id="betAmount"
                type="number"
                placeholder="Enter bet amount"
                value={betAmount}
                onChange={handleBetAmountChange}
                disabled={isFlipping}
                className="bg-deep-purple/50 border-gold text-silver placeholder:text-silver/60 text-lg"
              />
            </div>

            <div className="flex justify-center items-center h-32 my-4">
              {getCoinDisplay()}
            </div>
            
            {gameMessage && (
              <ResultsDisplay message={gameMessage} isWin={isWin} />
            )}

          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => handleFlip('Heads')}
              disabled={isFlipping || credits < (typeof betAmount === 'number' ? betAmount : 0)}
              className="w-full bg-gold text-deep-purple hover:bg-gold/90 font-semibold text-lg py-3"
            >
              Bet on Heads
            </Button>
            <Button
              onClick={() => handleFlip('Tails')}
              disabled={isFlipping || credits < (typeof betAmount === 'number' ? betAmount : 0)}
              variant="outline"
              className="w-full border-gold text-gold hover:bg-gold/10 font-semibold text-lg py-3"
            >
              Bet on Tails
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="text-center py-6 text-sm text-silver/70 border-t border-gold/20 mt-auto">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
    </div>
  );
}

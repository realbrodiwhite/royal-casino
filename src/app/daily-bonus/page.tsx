
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import UserBalanceDisplay from '@/components/game/CreditDisplay';
import { Gift, Coins, Beer as BeerIcon, RotateCw, Hourglass, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { nextInt } from '@/lib/b3-engine';
import { differenceInHours, formatDistanceToNowStrict, addHours } from 'date-fns';

const LAST_SPIN_TIMESTAMP_KEY = 'royalCasinoLastSpinTimestamp';
const SPIN_COOLDOWN_HOURS = 24;

interface Prize {
  id: string;
  type: 'credits' | 'item';
  label: string;
  amount?: number; // For credits
  itemId?: string; // For items
  icon: React.ReactNode;
  color?: string; // TailWind color class for background like 'bg-yellow-400/20'
}

const wheelPrizes: Prize[] = [
  { id: 'credits_50', type: 'credits', amount: 50, label: '50 Credits', icon: <Coins className="h-8 w-8 text-yellow-500" />, color: 'bg-yellow-500/10' },
  { id: 'credits_100', type: 'credits', amount: 100, label: '100 Credits', icon: <Coins className="h-8 w-8 text-yellow-600" />, color: 'bg-yellow-600/10' },
  { id: 'item_beer', type: 'item', itemId: 'beer_rtp_boost', label: '1 Craft Brew', icon: <BeerIcon className="h-8 w-8 text-amber-600" />, color: 'bg-amber-600/10' },
  { id: 'credits_250', type: 'credits', amount: 250, label: '250 Credits', icon: <Coins className="h-8 w-8 text-yellow-700" />, color: 'bg-yellow-700/10' },
  { id: 'credits_75', type: 'credits', amount: 75, label: '75 Credits', icon: <Coins className="h-8 w-8 text-yellow-500" />, color: 'bg-yellow-500/10' },
  { id: 'credits_150', type: 'credits', amount: 150, label: '150 Credits', icon: <Coins className="h-8 w-8 text-yellow-600" />, color: 'bg-yellow-600/10' },
];

export default function DailyBonusPage() {
  const [credits, setCredits] = useState(1000); // Local mock credits
  const [lastSpinTimestamp, setLastSpinTimestamp] = useState<number | null>(null);
  const [canSpin, setCanSpin] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<Prize | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  const { toast } = useToast();

  const checkCanSpin = useCallback(() => {
    const storedTimestamp = localStorage.getItem(LAST_SPIN_TIMESTAMP_KEY);
    if (storedTimestamp) {
      const lastSpinTime = parseInt(storedTimestamp, 10);
      setLastSpinTimestamp(lastSpinTime);
      const hoursSinceLastSpin = differenceInHours(new Date(), new Date(lastSpinTime));
      if (hoursSinceLastSpin >= SPIN_COOLDOWN_HOURS) {
        setCanSpin(true);
        setTimeRemaining('');
      } else {
        setCanSpin(false);
        const nextSpinTime = addHours(new Date(lastSpinTime), SPIN_COOLDOWN_HOURS);
        setTimeRemaining(formatDistanceToNowStrict(nextSpinTime, { addSuffix: true }));
      }
    } else {
      setCanSpin(true); // Can spin if no timestamp stored
      setTimeRemaining('');
    }
  }, []);

  useEffect(() => {
    checkCanSpin();
    const interval = setInterval(checkCanSpin, 60000); 
    return () => clearInterval(interval);
  }, [checkCanSpin]);

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    setSpinResult(null);

    let currentIndex = 0;
    const animationInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % wheelPrizes.length;
    }, 100);

    setTimeout(() => {
      clearInterval(animationInterval);
      const prizeIndex = nextInt(0, wheelPrizes.length - 1);
      const wonPrize = wheelPrizes[prizeIndex];
      setSpinResult(wonPrize);

      if (wonPrize.type === 'credits' && wonPrize.amount) {
        setCredits(prev => prev + (wonPrize.amount || 0));
        toast({
          title: "You Won Credits!",
          description: `Congratulations! You've won ${wonPrize.amount} Credits.`,
          action: <CheckCircle className="h-5 w-5 text-green-500" />,
        });
      } else if (wonPrize.type === 'item') {
        toast({
          title: "You Won an Item!",
          description: `Congratulations! You've won ${wonPrize.label}. It's been added to your backpack (mock).`,
           action: <CheckCircle className="h-5 w-5 text-green-500" />,
        });
      }

      const now = Date.now();
      localStorage.setItem(LAST_SPIN_TIMESTAMP_KEY, now.toString());
      setLastSpinTimestamp(now);
      setIsSpinning(false);
      checkCanSpin(); 
    }, 2000); 
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className={cn(
        "flex-grow landing-scroll-container pt-[40px]"
      )}>
        <section className="landing-scroll-section">
          <div className="container mx-auto px-4 py-8 sm:py-10 flex flex-col items-center"> {/* Adjusted padding & centering */}
            <header className="mb-8 text-center">
              <Gift className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">Daily Spin to Win!</h1>
              <p className="text-lg text-muted-foreground mt-2">Spin the wheel once a day for free rewards!</p>
            </header>

            <div className="w-full max-w-lg mx-auto mb-6">
              <UserBalanceDisplay credits={credits} />
            </div>

            <Card className="w-full max-w-2xl bg-card border-border shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary font-headline">Spin the Wheel of Fortune</CardTitle>
                {!canSpin && timeRemaining && (
                  <CardDescription className="text-accent flex items-center justify-center">
                    <Hourglass className="mr-2 h-4 w-4" /> Next spin available {timeRemaining}.
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                  {wheelPrizes.map((prize, index) => (
                    <div
                      key={prize.id}
                      className={cn(
                        "p-4 rounded-lg border-2 flex flex-col items-center justify-center aspect-square transition-all duration-300",
                        prize.color || 'bg-muted/30',
                        spinResult && spinResult.id === prize.id ? 'border-primary ring-4 ring-primary shadow-2xl scale-105 z-10' : 'border-border',
                        isSpinning && !spinResult && (index % 2 === 0 ? 'opacity-50 scale-95' : 'opacity-100 scale-100') 
                      )}
                    >
                      {prize.icon}
                      <span className="mt-2 text-sm font-semibold text-foreground text-center">{prize.label}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={handleSpin}
                  disabled={!canSpin || isSpinning}
                  size="lg"
                  className="font-semibold px-8 py-3 text-lg w-full max-w-xs"
                >
                  {isSpinning ? <RotateCw className="mr-2 h-5 w-5 animate-spin" /> : null}
                  {isSpinning ? 'Spinning...' : (canSpin ? 'Spin the Wheel!' : 'Come Back Later')}
                </Button>

                {spinResult && !isSpinning && (
                  <p className="text-xl font-semibold text-primary mt-4">
                    You won: {spinResult.label}!
                  </p>
                )}
              </CardContent>
              <CardFooter className="text-center text-xs text-muted-foreground pt-4">
                <p>Spin once every {SPIN_COOLDOWN_HOURS} hours. Prizes are random. Good luck!</p>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

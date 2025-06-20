
"use client";

// DESIGN NOTE: This gameplay page should ideally fit within a single viewport height.
// Content should be responsive and adjust automatically to different screen ratios and orientations
// to avoid internal scrolling of the main game area.

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UserBalanceDisplay from '@/components/game/CreditDisplay';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import PokerCardComponent from '@/components/game/PokerCard';
import { Card as UICard, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Hand, DollarSign, CheckCircle, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useXp } from '@/contexts/XpContext';
import {
  createDeck,
  shuffleDeck,
  dealCardsFromDeck,
  evaluateHand,
  PAYTABLE,
  type Card,
  type HandRank,
} from '@/lib/poker-logic';

type GameState = "BETTING" | "DEALT" | "GAME_OVER";

const PokerPage: React.FC = () => {
  const [credits, setCredits] = useState(1000);
  const [betAmount, setBetAmount] = useState<number>(5);
  const [deck, setDeck] = useState<Card[]>([]);
  const [hand, setHand] = useState<(Card | null)[]>(Array(5).fill(null));
  const [held, setHeld] = useState<boolean[]>(Array(5).fill(false));
  const [gameState, setGameState] = useState<GameState>("BETTING");
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [evaluatedHandRank, setEvaluatedHandRank] = useState<HandRank | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const { toast } = useToast();
  const { addXp } = useXp();

  const initializeDeck = useCallback(() => {
    setDeck(shuffleDeck(createDeck()));
  }, []);

  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setBetAmount(value);
    } else if (e.target.value === "") {
      setBetAmount(0);
    }
  };

  const handleDealDraw = useCallback(() => {
    if (gameState === "BETTING" || gameState === "GAME_OVER") {
      if (credits < betAmount) { 
        toast({ title: "Not Enough Credits", description: "Your bet is too high for your credits.", variant: "destructive" });
        return;
      }
      if (betAmount <= 0) {
        toast({ title: "Invalid Bet", description: "Please enter a positive bet amount.", variant: "destructive" });
        return;
      }

      setCredits(prev => prev - betAmount);
      addXp(betAmount); 

      let currentDeck = deck;
      if (currentDeck.length < 10) { 
         currentDeck = shuffleDeck(createDeck());
      }

      const newHand = dealCardsFromDeck(currentDeck, 5);
      setDeck(currentDeck); 
      setHand(newHand);
      setHeld(Array(5).fill(false));
      setGameState("DEALT");
      setGameMessage("Hold your cards and click Draw.");
      setEvaluatedHandRank(null);
      setIsWin(null);
      toast({ title: "Cards Dealt", description: `Bet: ${betAmount} credits. Good luck!` });

    } else if (gameState === "DEALT") { 
      let currentDeck = deck;
      const cardsToDraw = held.filter(h => !h).length;

      if (currentDeck.length < cardsToDraw) {
         currentDeck = shuffleDeck(createDeck().filter(cardInDeck =>
            !hand.some(hc => hc?.id === cardInDeck.id)
         ));
      }

      const drawnReplacementCards = dealCardsFromDeck(currentDeck, cardsToDraw);
      setDeck(currentDeck);

      const finalHand: Card[] = [];
      let replacementIndex = 0;
      for(let i = 0; i < 5; i++) {
        if(held[i] && hand[i]) {
          finalHand.push(hand[i]!);
        } else if (replacementIndex < drawnReplacementCards.length) {
            finalHand.push(drawnReplacementCards[replacementIndex++]);
        } else if (hand[i]) {
            console.warn("Not enough replacement cards, reusing old card. This should be rare.");
            finalHand.push(hand[i]!);
        }
      }
      while (finalHand.length < 5 && currentDeck.length > 0) {
        console.warn("Final hand has less than 5 cards after draw logic, dealing more from deck.");
        finalHand.push(dealCardsFromDeck(currentDeck, 1)[0]);
      }
       if (finalHand.length < 5) {
        console.error("Critical error: Could not form a 5 card hand after draw.");
        toast({ title: "Game Error", description: "Could not complete the hand. Resetting.", variant: "destructive"});
        setGameState("GAME_OVER");
        setHand(Array(5).fill(null));
        setEvaluatedHandRank(null);
        initializeDeck();
        return;
      }


      setHand(finalHand);
      const { rank, payoutMultiplier } = evaluateHand(finalHand);
      setEvaluatedHandRank(rank);

      if (payoutMultiplier > 0) {
        const winnings = betAmount * payoutMultiplier;
        setCredits(prev => prev + winnings); 
        setGameMessage(`You got ${rank}! You won ${winnings} credits!`);
        setIsWin(true);
        toast({ title: "You Won!", description: `${rank} - Payout: ${winnings} credits.` });
      } else {
        setGameMessage(`No win this time. Hand: ${rank}. Try again!`);
        setIsWin(false);
        toast({ title: "No Win", description: `Your hand: ${rank}.`, variant: "destructive" });
      }
      setGameState("GAME_OVER");
    }
  }, [gameState, credits, betAmount, deck, hand, held, toast, initializeDeck, addXp]);

  const toggleHold = (index: number) => {
    if (gameState === "DEALT") {
      const newHeld = [...held];
      newHeld[index] = !newHeld[index];
      setHeld(newHeld);
    }
  };

  const getButtonText = () => {
    if (gameState === 'DEALT') return "Draw";
    return "Deal";
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-2 sm:px-4 pb-8 sm:pb-12 pt-[40px] flex flex-col items-center">
        <header className="mb-8 sm:mb-10 text-center">
          <Hand className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-3 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Video Poker</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-2 px-2">Jacks or Better - Get the best hand!</p>
        </header>

        <div className="w-full max-w-lg mx-auto mb-6 sm:mb-8">
          <UserBalanceDisplay credits={credits} />
        </div>

        <UICard className="w-full max-w-lg bg-card border-border shadow-xl mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-primary font-headline text-center">Your Hand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-1 xs:gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
              {hand.map((card, index) => (
                <PokerCardComponent
                  key={card ? card.id : `empty-${index}-${Math.random()}`}
                  card={card}
                  isHeld={held[index]}
                  onToggleHold={() => toggleHold(index)}
                  disabled={gameState !== "DEALT"}
                  isHidden={!card && gameState !== "DEALT" && gameState !== "GAME_OVER"}
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="betAmount" className="text-foreground whitespace-nowrap text-sm sm:text-base">Bet (Credits):</Label>
                <Input
                  id="betAmount"
                  type="number"
                  value={betAmount}
                  onChange={handleBetAmountChange}
                  min="1"
                  className="w-20 sm:w-24 bg-input border-border text-foreground placeholder:text-muted-foreground text-sm sm:text-base"
                  disabled={gameState === "DEALT"}
                />
              </div>
              <Button
                onClick={handleDealDraw}
                disabled={(betAmount <= 0 || credits < betAmount) && (gameState === "BETTING" || gameState === "GAME_OVER")}
                variant="default"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
              >
                {gameState === "DEALT" ? <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/> : <DollarSign className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/>}
                {getButtonText()}
              </Button>
            </div>
             {gameMessage && (
              <div className="mt-4 sm:mt-6">
                <ResultsDisplay
                    message={gameMessage}
                    isWin={isWin}
                />
              </div>
            )}
            {gameState === "GAME_OVER" && evaluatedHandRank && (
                 <p className="text-center text-lg font-semibold text-primary mt-3">
                    Final Hand: <span className="text-foreground">{evaluatedHandRank}</span>
                </p>
            )}
          </CardContent>
        </UICard>

        <UICard className="w-full max-w-md bg-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl text-primary font-headline text-center flex items-center justify-center">
              <Info className="mr-2 h-4 w-4 sm:h-5 sm:w-5"/> Paytable (per credit bet)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm">
            <ul className="space-y-0.5 text-muted-foreground">
              {Object.entries(PAYTABLE)
                .filter(([, payout]) => payout > 0)
                .sort(([, aPayout], [, bPayout]) => bPayout - aPayout)
                .map(([handName, payout], index) => (
                  <li
                    key={handName}
                    className={`flex justify-between items-center p-1.5 sm:p-2 rounded-sm ${index % 2 === 0 ? 'bg-card-foreground/5' : 'bg-transparent'}`}
                  >
                    <span className="text-foreground">{handName}</span>
                    <span className="font-semibold text-primary">{payout}x</span>
                  </li>
              ))}
            </ul>
          </CardContent>
        </UICard>

      </main>
      <Footer />
    </div>
  );
};

export default PokerPage;

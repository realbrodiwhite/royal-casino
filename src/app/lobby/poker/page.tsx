
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CreditDisplay from '@/components/game/CreditDisplay';
import XpDisplay from '@/components/game/XpDisplay';
import ResultsDisplay from '@/components/game/ResultsDisplay';
import PokerCardComponent from '@/components/game/PokerCard';
import { Card as UICard, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Hand, DollarSign, CheckCircle, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
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
  const [experiencePoints, setExperiencePoints] = useState(0);
  const [betAmount, setBetAmount] = useState<number>(5);
  const [deck, setDeck] = useState<Card[]>([]);
  const [hand, setHand] = useState<(Card | null)[]>(Array(5).fill(null));
  const [held, setHeld] = useState<boolean[]>(Array(5).fill(false));
  const [gameState, setGameState] = useState<GameState>("BETTING");
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const { toast } = useToast();

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
        toast({ title: "Not Enough Credits", description: "Your bet is too high.", variant: "destructive" });
        return;
      }
      if (betAmount <= 0) {
        toast({ title: "Invalid Bet", description: "Please enter a positive bet amount.", variant: "destructive" });
        return;
      }

      setCredits(prev => prev - betAmount);
      setExperiencePoints(prevXp => prevXp + betAmount);
      
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
      setIsWin(null);
      toast({ title: "Cards Dealt", description: `Bet: ${betAmount} credits. Good luck!` });

    } else if (gameState === "DEALT") { // Draw new cards
      let currentDeck = deck;
      const cardsToDraw = held.filter(h => !h).length;
      
      if (currentDeck.length < cardsToDraw) {
         currentDeck = shuffleDeck(createDeck().filter(cardInDeck => !hand.find(hc => hc?.id === cardInDeck.id))); 
      }

      const drawnReplacementCards = dealCardsFromDeck(currentDeck, cardsToDraw);
      setDeck(currentDeck);
      
      const finalHand: Card[] = [];
      let replacementIndex = 0;
      for(let i = 0; i < 5; i++) {
        if(held[i] && hand[i]) {
          finalHand.push(hand[i]!);
        } else if(hand[i] && replacementIndex < drawnReplacementCards.length) { 
            finalHand.push(drawnReplacementCards[replacementIndex++]);
        } else if (hand[i]) { 
            finalHand.push(hand[i]!); 
            console.warn("Not enough replacement cards, reusing old card. This should be rare.");
        }
      }
      while (finalHand.length < 5 && currentDeck.length > 0) {
        console.warn("Final hand has less than 5 cards, dealing more from deck.");
        finalHand.push(dealCardsFromDeck(currentDeck, 1)[0]);
      }
      if (finalHand.length < 5) {
        console.error("Critical error: Could not form a 5 card hand after draw.");
        toast({ title: "Game Error", description: "Could not complete the hand. Resetting.", variant: "destructive"});
        setGameState("GAME_OVER");
        setHand(Array(5).fill(null));
        return;
      }

      setHand(finalHand);
      const { rank, payoutMultiplier } = evaluateHand(finalHand);
      
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
  }, [gameState, credits, betAmount, deck, hand, held, toast, initializeDeck]);

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
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-8 sm:py-12 flex flex-col items-center">
        <header className="mb-8 sm:mb-10 text-center">
          <Hand className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-3 sm:mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">Video Poker</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-2 px-2">Jacks or Better - Get the best hand!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mb-6 sm:mb-8">
          <CreditDisplay initialCredits={credits} />
          <XpDisplay experiencePoints={experiencePoints} />
        </div>

        <UICard className="w-full max-w-2xl bg-card border-border shadow-xl mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-primary font-headline text-center">Your Hand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-1 xs:gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
              {hand.map((card, index) => (
                <PokerCardComponent
                  key={card ? card.id : `empty-${index}`}
                  card={card}
                  isHeld={held[index]}
                  onToggleHold={() => toggleHold(index)}
                  disabled={gameState !== "DEALT"}
                  isHidden={!card}
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="betAmount" className="text-foreground whitespace-nowrap text-sm sm:text-base">Bet:</Label>
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
                disabled={betAmount <= 0 && (gameState === "BETTING" || gameState === "GAME_OVER")}
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
                <ResultsDisplay message={gameMessage} isWin={isWin} />
              </div>
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
            <ul className="space-y-1 text-muted-foreground">
              {Object.entries(PAYTABLE)
                .filter(([, payout]) => payout > 0) 
                .sort(([, aPayout], [, bPayout]) => bPayout - aPayout) 
                .map(([handName, payout]) => (
                  <li key={handName} className="flex justify-between items-center p-1 sm:p-1.5 bg-card-foreground/5 rounded-sm">
                    <span>{handName}</span>
                    <span className="font-semibold text-primary">{payout}x</span>
                  </li>
              ))}
            </ul>
          </CardContent>
        </UICard>

      </main>
      <footer className="text-center py-4 sm:py-6 text-xs sm:text-sm text-muted-foreground border-t border-border mt-auto">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
    </div>
  );
};

export default PokerPage;

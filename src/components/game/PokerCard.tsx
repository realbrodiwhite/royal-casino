
"use client";

import React from 'react';
import { type Card as CardType } from '@/lib/poker-logic';
import { cn } from '@/lib/utils';

interface PokerCardProps {
  card: CardType | null;
  isHeld: boolean;
  onToggleHold?: () => void;
  disabled?: boolean; // To disable hold when not in dealing phase
  isHidden?: boolean; // For initial empty slots or face-down cards
}

const PokerCard: React.FC<PokerCardProps> = ({ card, isHeld, onToggleHold, disabled, isHidden }) => {
  const suitColor = card && (card.suit === '♥' || card.suit === '♦') ? 'text-red-500' : 'text-foreground';

  if (isHidden || !card) {
    return (
      <div className="aspect-[2.5/3.5] w-full rounded-md border-2 border-dashed border-border bg-muted/30 flex items-center justify-center">
        {/* Placeholder for an empty or face-down card */}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "aspect-[2.5/3.5] w-full rounded-md border-2 bg-card shadow-lg flex flex-col items-center justify-center p-2 transition-all duration-150 cursor-pointer select-none",
        isHeld ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-border hover:border-primary/70",
        disabled && "cursor-not-allowed opacity-70",
        onToggleHold ? "" : "cursor-default"
      )}
      onClick={!disabled && onToggleHold ? onToggleHold : undefined}
    >
      <div className="flex w-full justify-start">
        <span className={cn("text-xl sm:text-2xl font-bold", suitColor)}>{card.rank}</span>
      </div>
      <div className="flex-grow flex items-center justify-center">
         <span className={cn("text-3xl sm:text-4xl", suitColor)}>{card.suit}</span>
      </div>
       <div className="flex w-full justify-end items-end">
        <span className={cn("text-xl sm:text-2xl font-bold transform rotate-180", suitColor)}>{card.rank}</span>
      </div>
      {onToggleHold && (
         <div className={cn(
            "absolute bottom-1 right-1 text-xs px-1.5 py-0.5 rounded",
            isHeld ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
         )}>
            {isHeld ? "Held" : "Hold"}
        </div>
      )}
    </div>
  );
};

export default PokerCard;

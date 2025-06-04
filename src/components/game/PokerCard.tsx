
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
  const suitColor = card && (card.suit === '♥' || card.suit === '♦') ? 'text-red-500' : 'text-foreground'; // Keep as is, or use theme colors if preferred

  if (isHidden || !card) {
    return (
      <div className="aspect-[2.5/3.5] w-full rounded-md border-2 border-dashed border-border/50 bg-muted/20 flex items-center justify-center shadow-inner">
        {/* Placeholder for an empty or face-down card */}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "aspect-[2.5/3.5] w-full rounded-md border-2 bg-card shadow-lg flex flex-col items-center justify-between p-1.5 sm:p-2 transition-all duration-150 select-none relative overflow-hidden",
        isHeld ? "border-primary ring-2 ring-primary ring-offset-1 ring-offset-background transform scale-105" : "border-border hover:border-primary/60",
        disabled && !isHeld && "cursor-not-allowed opacity-70", // Only apply opacity if not held
        onToggleHold && !disabled ? "cursor-pointer" : "cursor-default"
      )}
      onClick={!disabled && onToggleHold ? onToggleHold : undefined}
    >
      <div className="flex w-full justify-start items-start">
        <span className={cn("text-xl xs:text-2xl sm:text-3xl font-bold leading-none", suitColor)}>{card.rank}</span>
      </div>
      <div className="flex-grow flex items-center justify-center my-1">
         <span className={cn("text-3xl xs:text-4xl sm:text-5xl", suitColor)}>{card.suit}</span>
      </div>
       <div className="flex w-full justify-end items-end">
        <span className={cn("text-xl xs:text-2xl sm:text-3xl font-bold leading-none transform rotate-180", suitColor)}>{card.rank}</span>
      </div>
      {onToggleHold && (
         <div className={cn(
            "absolute bottom-1 right-1 text-[0.6rem] xs:text-xs px-1 sm:px-1.5 py-0.5 rounded-sm font-semibold",
            isHeld ? "bg-primary text-primary-foreground shadow-md" : "bg-muted/70 text-muted-foreground"
         )}>
            {isHeld ? "HELD" : "HOLD"}
        </div>
      )}
    </div>
  );
};

export default PokerCard;

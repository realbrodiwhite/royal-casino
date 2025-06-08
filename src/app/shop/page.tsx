
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import UserBalanceDisplay from '@/components/game/CreditDisplay';
import { ShoppingCart, Gem, Layers, Beer, Cigarette, Zap, Leaf, Ticket, AlertTriangle } from 'lucide-react';
import { allShopItems, type ShopItem, type ItemEffect } from '@/game-data/items';
import { useToast } from "@/hooks/use-toast";

const itemIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Beer: Beer,
  Cigarette: Cigarette,
  Zap: Zap,
  Leaf: Leaf,
  Ticket: Ticket,
  Default: Layers, // Fallback icon
};

const ShopItemCard: React.FC<{ 
  item: ShopItem;
  onBuy: (item: ShopItem) => void; 
  canAfford: boolean;
}> = ({ item, onBuy, canAfford }) => {
  const IconComponent = itemIconMap[item.icon] || itemIconMap.Default;

  const formatEffect = (effect: ItemEffect): string => {
    let effectDesc = "";
    switch (effect.type) {
      case 'RTP_BOOST':
        effectDesc = `+${(effect.value * 100).toFixed(1)}% RTP`;
        break;
      case 'JACKPOT_CHANCE_BOOST':
        effectDesc = `+${(effect.value * 100).toFixed(1)}% Jackpot Chance`;
        break;
      case 'BONUS_TRIGGER_BOOST':
        effectDesc = `+${(effect.value * 100).toFixed(1)}% Bonus Trigger`;
        break;
      case 'XP_MULTIPLIER':
        effectDesc = `${effect.value}x XP`;
        break;
      case 'FREE_SPINS':
        effectDesc = `${effect.value} Free Spins`;
        break;
      case 'BET_INSURANCE':
         effectDesc = `Bet Insurance (up to ${effect.value} credits)`;
        break;
      default:
        effectDesc = `Unknown Effect (${effect.type})`;
    }
    if (effect.durationMinutes) {
      effectDesc += ` for ${effect.durationMinutes} min`;
    }
    if (effect.appliesToGameType && effect.appliesToGameType.length > 0) {
      effectDesc += ` (on ${effect.appliesToGameType.join('/')})`;
    }
    return effectDesc;
  };

  return (
    <Card className="bg-card border-border shadow-lg hover:shadow-primary/30 transition-shadow duration-300 flex flex-col">
      <CardHeader className="items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-2 inline-block">
          <IconComponent className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-lg font-headline text-primary">{item.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground min-h-[3em]">{item.flavorText || item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow text-sm space-y-1">
        <p><strong>Category:</strong> <span className="capitalize">{item.category}</span></p>
        <p><strong>Effects:</strong></p>
        <ul className="list-disc list-inside pl-2 text-muted-foreground text-xs">
          {item.effects.map((effect, index) => (
            <li key={index}>{formatEffect(effect)}</li>
          ))}
        </ul>
        <p className="text-xs"><strong>Type:</strong> {item.isConsumable ? 'Consumable' : 'Permanent'}</p>
        {item.stackable && <p className="text-xs"><strong>Max Stack:</strong> {item.maxStack}</p>}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <Gem className="h-4 w-4 text-accent mr-1" />
          <span className="text-lg font-bold text-accent">{item.cost}</span>
        </div>
        <Button onClick={() => onBuy(item)} variant="default" className="w-full" disabled={!canAfford}>
          {canAfford ? 'Buy Item' : 'Not Enough Coins'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function ShopPage() {
  // Mock premium currency balance for now. In a real app, this would come from user context/backend.
  const [premiumCoins, setPremiumCoins] = useState(250); 
  const [standardCredits, setStandardCredits] = useState(1000); // Keep for UserBalanceDisplay consistency
  const { toast } = useToast();

  const handleBuyItem = (item: ShopItem) => {
    if (premiumCoins >= item.cost) {
      setPremiumCoins(prevCoins => prevCoins - item.cost);
      // In a real app, you would add this item to the user's inventory in the backend.
      console.log(`Bought ${item.name} for ${item.cost} premium coins.`);
      console.log(`Mock: Adding ${item.name} to user's backpack.`);
      toast({
        title: "Purchase Successful!",
        description: `You bought ${item.name} for ${item.cost} premium coins. Check your backpack!`,
      });
    } else {
      console.log(`Not enough premium coins to buy ${item.name}.`);
      toast({
        title: "Insufficient Funds",
        description: `You need ${item.cost - premiumCoins} more premium coins to buy ${item.name}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-8 pt-[88px] sm:pt-[92px]">
        <header className="mb-8 sm:mb-10 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-3 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Item Shop</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-1 px-2">
            Spend your Premium Coins on powerful consumables and charms!
          </p>
        </header>
        
        <div className="w-full max-w-md mx-auto mb-6 sm:mb-8">
          <UserBalanceDisplay standardCredits={standardCredits} premiumCoins={premiumCoins} />
        </div>

        {allShopItems.length === 0 ? (
          <Card className="bg-card border-border shadow-lg text-center py-10">
            <CardHeader>
              <CardTitle className="text-xl text-muted-foreground">The Shop is Empty!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No items available for purchase at the moment. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allShopItems.map((item) => (
              <ShopItemCard 
                key={item.id} 
                item={item} 
                onBuy={handleBuyItem} 
                canAfford={premiumCoins >= item.cost}
              />
            ))}
          </div>
        )}
      </main>
      <footer className="text-center py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground border-t border-border mt-auto">
        <p>&copy; 2025 Royal Casino. All Rights Reserved. Built By Brodi Inc.</p>
      </footer>
    </div>
  );
}

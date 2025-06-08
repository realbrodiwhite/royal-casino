
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import UserBalanceDisplay from '@/components/game/CreditDisplay';
import { ShoppingCart, Gem, Layers, Beer, Cigarette, Zap, Leaf, Ticket, Package } from 'lucide-react';
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
  onBuy: (item: ShopItem, quantity: number, totalCost: number) => void; 
  currentPremiumCoins: number;
}> = ({ item, onBuy, currentPremiumCoins }) => {
  const IconComponent = itemIconMap[item.icon] || itemIconMap.Default;
  const costForOne = item.cost;
  const costForSix = item.cost * 6; // Assuming no discount for now

  const canAffordOne = currentPremiumCoins >= costForOne;
  const canAffordSix = currentPremiumCoins >= costForSix;


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
      <CardFooter className="flex flex-col items-stretch gap-2">
         <Button 
            onClick={() => onBuy(item, 1, costForOne)} 
            variant="outline" 
            size="sm"
            disabled={!canAffordOne}
        >
            Buy 1 <Gem className="ml-1.5 mr-0.5 h-3 w-3 text-accent" /> {costForOne}
        </Button>
        {item.isConsumable && item.stackable && ( // Only show 6-pack for stackable consumables
            <Button 
                onClick={() => onBuy(item, 6, costForSix)} 
                variant="default"
                size="sm"
                disabled={!canAffordSix}
            >
                <Package className="mr-1.5 h-4 w-4" /> Buy 6-Pack <Gem className="ml-1.5 mr-0.5 h-3 w-3 text-accent" /> {costForSix}
            </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default function ShopPage() {
  const [premiumCoins, setPremiumCoins] = useState(250); 
  const [standardCredits, setStandardCredits] = useState(1000);
  const { toast } = useToast();
  const mockDiamondUserCount = 1234; // Mock data for new display

  const handleBuyItem = (item: ShopItem, quantity: number, totalCost: number) => {
    if (premiumCoins >= totalCost) {
      setPremiumCoins(prevCoins => prevCoins - totalCost);
      console.log(`Bought ${quantity}x ${item.name} for ${totalCost} premium coins.`);
      console.log(`Mock: Adding ${quantity}x ${item.name} to user's backpack.`);
      toast({
        title: "Purchase Successful!",
        description: `You bought ${quantity}x ${item.name} for ${totalCost} premium coins. Check your backpack!`,
      });
    } else {
      console.log(`Not enough premium coins to buy ${quantity}x ${item.name}.`);
      toast({
        title: "Insufficient Funds",
        description: `You need ${totalCost - premiumCoins} more premium coins to buy ${quantity}x ${item.name}.`,
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
        
        <div className="w-full max-w-lg mx-auto mb-6 sm:mb-8"> {/* Adjusted max-width for 3 cards */}
          <UserBalanceDisplay standardCredits={standardCredits} premiumCoins={premiumCoins} diamondUserCount={mockDiamondUserCount} />
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
                currentPremiumCoins={premiumCoins}
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


"use client";

// DESIGN NOTE: This page's content should ideally fit within a single viewport height
// when sectional scrolling is active, to avoid internal page scrolling within a section.
// If the number of shop items or credit packs grows significantly,
// consider pagination or a more compact layout for item cards.

import React, { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import UserBalanceDisplay from '@/components/game/CreditDisplay';
import { ShoppingCart, Coins, Layers, Beer, Cigarette, Zap, Leaf, Ticket, Package, DollarSign, Sparkles } from 'lucide-react';
import { allShopItems, type ShopItem, type ItemEffect } from '@/game-data/items';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const itemIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Beer: Beer,
  Cigarette: Cigarette,
  Zap: Zap,
  Leaf: Leaf,
  Ticket: Ticket,
  Sparkles: Sparkles, 
  Default: Layers,
};

const ShopItemCard: React.FC<{ 
  item: ShopItem;
  onBuy: (item: ShopItem, quantity: number, totalCost: number) => void; 
  currentCredits: number;
}> = ({ item, onBuy, currentCredits }) => {
  const IconComponent = itemIconMap[item.icon] || itemIconMap.Default;
  const costForOne = item.cost;
  const costForSix = item.cost * 6;

  const canAffordOne = currentCredits >= costForOne;
  const canAffordSix = currentCredits >= costForSix;


  const formatEffect = (effect: ItemEffect): string => {
    let effectDesc = "";
    switch (effect.type) {
      case 'WIN_MULTIPLIER_BOOST':
        effectDesc = `+${((effect.value - 1) * 100).toFixed(0)}% Credit Wins`; 
        break;
      case 'JACKPOT_CHANCE_BOOST':
        effectDesc = `+${(effect.value * 100).toFixed(1)}% Jackpot Chance (Credits)`;
        break;
      case 'BONUS_TRIGGER_BOOST':
        effectDesc = `+${(effect.value * 100).toFixed(1)}% Bonus Trigger`;
        break;
      case 'XP_MULTIPLIER':
        effectDesc = `${effect.value}x XP`;
        break;
      case 'FREE_SPINS':
        effectDesc = `${effect.value} Free Plays (Credits)`;
        break;
      case 'BET_INSURANCE':
         effectDesc = `Bet Insurance (up to ${effect.value} credits)`;
        break;
      case 'SYMBOL_WEIGHT_BOOST':
        effectDesc = `Boosts ${effect.symbolId || 'specific symbol'} appearance`;
        if(effect.value) effectDesc += ` (weight +${effect.value})`;
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
            Buy 1 <Coins className="ml-1.5 mr-0.5 h-3 w-3 text-primary" /> {costForOne.toLocaleString()}
        </Button>
        {item.isConsumable && item.stackable && (
            <Button 
                onClick={() => onBuy(item, 6, costForSix)} 
                variant="default"
                size="sm"
                disabled={!canAffordSix}
            >
                <Package className="mr-1.5 h-4 w-4" /> Buy 6-Pack <Coins className="ml-1.5 mr-0.5 h-3 w-3 text-primary" /> {costForSix.toLocaleString()}
            </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface CreditPack {
  id: string;
  amount: number;
  displayName: string;
  priceUSD?: number; // Optional: for displaying mock price
}

const creditPacks: CreditPack[] = [
  { id: 'pack1', amount: 5000, displayName: "5,000 Credits", priceUSD: 4.99 },
  { id: 'pack2', amount: 12000, displayName: "12,000 Credits", priceUSD: 9.99 },
  { id: 'pack3', amount: 30000, displayName: "30,000 Credits", priceUSD: 19.99 },
  { id: 'pack4', amount: 75000, displayName: "75,000 Credits", priceUSD: 49.99 },
];


export default function ShopPage() {
  const [credits, setCredits] = useState(5000); 
  const { toast } = useToast();

  const handleBuyItem = (item: ShopItem, quantity: number, totalCost: number) => {
    if (credits >= totalCost) {
      setCredits(prevCredits => prevCredits - totalCost);
      console.log(`Bought ${quantity}x ${item.name} for ${totalCost} Credits.`);
      console.log(`Mock: Adding ${quantity}x ${item.name} to user's backpack.`);
      toast({
        title: "Purchase Successful!",
        description: `You bought ${quantity}x ${item.name} for ${totalCost} Credits. Check your backpack!`,
      });
    } else {
      console.log(`Not enough Credits to buy ${quantity}x ${item.name}.`);
      toast({
        title: "Insufficient Credits",
        description: `You need ${totalCost - credits} more Credits to buy ${quantity}x ${item.name}.`,
        variant: "destructive",
      });
    }
  };

  const handleBuyCreditPack = (pack: CreditPack) => {
    // This is a mock purchase. In a real app, this would trigger a payment flow.
    setCredits(prevCredits => prevCredits + pack.amount);
    toast({
      title: "Credits Purchased! (Mock)",
      description: `Successfully added ${pack.amount.toLocaleString()} Credits to your balance.`,
    });
    console.log(`Mock purchase of ${pack.displayName} for $${pack.priceUSD || 'N/A'}`);
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className={cn(
        "flex-grow landing-scroll-container pt-[64px] sm:pt-[68px]"
      )}>
        <section className="landing-scroll-section">
          <div className="container mx-auto px-4 py-8 sm:py-10"> {/* Adjusted padding */}
            <header className="mb-8 sm:mb-10 text-center">
              <ShoppingCart className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-3 sm:mb-4" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">The Royal Emporium</h1>
              <p className="text-md sm:text-lg text-muted-foreground mt-1 px-2">
                Spend Credits on consumables, charms, or purchase more Credits!
              </p>
            </header>
            
            <div className="w-full max-w-lg mx-auto mb-6 sm:mb-8">
              <UserBalanceDisplay credits={credits} />
            </div>

            {/* Purchase Credits Section */}
            <Card className="mb-8 sm:mb-10 bg-card border-border shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-primary font-headline text-center flex items-center justify-center">
                  <DollarSign className="mr-2 h-6 w-6" /> Purchase Credits
                </CardTitle>
                <CardDescription className="text-center text-muted-foreground text-sm">
                  Need more Credits? Get them here! (Mock real money transactions)
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {creditPacks.map((pack) => (
                  <Button
                    key={pack.id}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-auto p-3 sm:p-4 hover:bg-primary/10 hover:border-primary"
                    onClick={() => handleBuyCreditPack(pack)}
                  >
                    <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1" />
                    <span className="text-sm sm:text-base font-semibold text-foreground">{pack.displayName}</span>
                    {pack.priceUSD && <span className="text-xs text-muted-foreground mt-0.5">${pack.priceUSD.toFixed(2)}</span>}
                  </Button>
                ))}
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground text-center pt-3">
                Purchases are simulated and do not involve real money.
              </CardFooter>
            </Card>

            {/* Items for Credits Section */}
            <h2 className="text-xl sm:text-2xl font-bold font-headline text-primary mb-4 sm:mb-6 text-center">Items for Credits</h2>
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
                    currentCredits={credits}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

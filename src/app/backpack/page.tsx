
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BackpackIcon as PageBackpackIcon, Layers, AlertTriangle, ShoppingCart, Zap, Leaf, Beer, Cigarette, Ticket, Sparkles } from 'lucide-react';
import { allShopItems, getItemById } from '@/game-data/items';
import type { ShopItem, BackpackItem as BackpackItemType, ItemEffect } from '@/types/inventory';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Mock user inventory - in a real app, this would come from a backend or user context
const mockUserBackpack: BackpackItemType[] = [
  { itemId: 'beer_rtp_boost', quantity: 3 }, 
  { itemId: 'cigar_jackpot_boost', quantity: 1 },
  { itemId: 'energy_drink_xp', quantity: 5 },
  { itemId: 'four_leaf_clover', quantity: 1 },
  { itemId: 'cherry_magnet_charm', quantity: 1}, // Added new charm
];

const itemIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Beer: Beer,
  Cigarette: Cigarette,
  Zap: Zap,
  Leaf: Leaf,
  Ticket: Ticket,
  Sparkles: Sparkles, 
  Default: Layers,
};

const ItemCard: React.FC<{ backpackItem: BackpackItemType; itemDetails: ShopItem | undefined }> = ({ backpackItem, itemDetails }) => {
  const { toast } = useToast();

  if (!itemDetails) {
    return (
      <Card className="bg-card border-destructive shadow-md flex flex-col">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" /> Error!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Item details not found for ID: {backpackItem.itemId}.</p>
        </CardContent>
      </Card>
    );
  }

  const IconComponent = itemIconMap[itemDetails.icon] || itemIconMap.Default;

  const handleUseItem = () => {
    console.log(`Attempting to use ${itemDetails.name} (ID: ${itemDetails.id})`);
    toast({
      title: `Used ${itemDetails.name}! (Mock)`,
      description: `${itemDetails.description}. Effects would apply now.`,
    });
  };

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
        <CardTitle className="text-lg font-headline text-primary">{itemDetails.name} (x{backpackItem.quantity})</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">{itemDetails.flavorText || itemDetails.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow text-sm space-y-1">
        <p><strong>Category:</strong> <span className="capitalize">{itemDetails.category}</span></p>
        <p><strong>Effects:</strong></p>
        <ul className="list-disc list-inside pl-2 text-muted-foreground text-xs">
          {itemDetails.effects.map((effect, index) => (
            <li key={index}>{formatEffect(effect)}</li>
          ))}
        </ul>
        <p className="text-xs"><strong>{itemDetails.isConsumable ? 'Consumable' : 'Permanent'}</strong></p>
      </CardContent>
      <CardFooter>
        {itemDetails.isConsumable && (
          <Button onClick={handleUseItem} variant="default" className="w-full">
            Use Item
          </Button>
        )}
        {!itemDetails.isConsumable && (
           <p className="text-xs text-accent text-center w-full">This item is always active.</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default function BackpackPage() {
  const [backpackItems, setBackpackItems] = useState<BackpackItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setBackpackItems(mockUserBackpack);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen text-foreground flex flex-col">
        <Navbar />
        <main className={cn("flex-grow landing-scroll-container pt-[64px] sm:pt-[68px]")}>
          <section className="landing-scroll-section">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
              <p className="mt-4 text-lg text-primary">Loading your backpack...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className={cn(
        "flex-grow landing-scroll-container pt-[64px] sm:pt-[68px]"
      )}>
        <section className="landing-scroll-section">
          <div className="container mx-auto px-4 py-8 sm:py-10"> {/* Adjusted padding */}
            <header className="mb-8 sm:mb-10 text-center">
              <PageBackpackIcon className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-3 sm:mb-4" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Your Backpack</h1>
              <p className="text-md sm:text-lg text-muted-foreground mt-1 px-2">
                View and use your collected consumables and charms.
              </p>
            </header>

            {backpackItems.length === 0 ? (
              <Card className="bg-card border-border shadow-lg text-center py-10">
                <CardHeader>
                    <CardTitle className="text-xl text-muted-foreground">Your Backpack is Empty!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Looks like you haven't collected any items yet.</p>
                    <Button asChild variant="default">
                        <a href="/shop">
                            <ShoppingCart className="mr-2 h-5 w-5" /> Visit the Shop
                        </a>
                    </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {backpackItems.map((bpItem) => {
                  const itemDetails = getItemById(bpItem.itemId);
                  return <ItemCard key={bpItem.itemId} backpackItem={bpItem} itemDetails={itemDetails} />;
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

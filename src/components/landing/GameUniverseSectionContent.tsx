
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Globe, Sparkles } from 'lucide-react';
import SlotsCategoryIcon from '@/components/game/category-icons/SlotsCategoryIcon';
import PokerCategoryIcon from '@/components/game/category-icons/PokerCategoryIcon';
import BingoCategoryIcon from '@/components/game/category-icons/BingoCategoryIcon';
import ScratchersCategoryIcon from '@/components/game/category-icons/ScratchersCategoryIcon';
import CoinFlipCategoryIcon from '@/components/game/category-icons/CoinFlipCategoryIcon';
import { useToast } from "@/hooks/use-toast";

interface GameTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string; // Made optional
  disabled?: boolean;
  footerContent?: React.ReactNode; // New prop for custom footer
}

const GameTypeCard: React.FC<GameTypeCardProps> = ({ icon, title, description, href, disabled, footerContent }) => (
  <Card className="bg-card border-border shadow-lg hover:shadow-primary/30 transition-shadow duration-300 flex flex-col text-center">
    <CardHeader className="items-center pt-6 sm:pt-8">
      <div className="p-3 sm:p-4 bg-primary/20 rounded-full mb-3 sm:mb-4 inline-block">
        {React.cloneElement(icon as React.ReactElement, { className: "h-16 w-16 sm:h-20 sm:w-20 text-primary" })}
      </div>
      <CardTitle className="text-lg sm:text-xl font-headline text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow px-4 pb-4 sm:px-6 sm:pb-6">
      <CardDescription className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 min-h-[3.5rem]">{description}</CardDescription>
    </CardContent>
    <CardFooter className="mt-auto px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
      {footerContent ? footerContent : (
        href && (
          <Link href={disabled ? "#" : href} passHref className="w-full">
            <Button variant={disabled ? "outline" : "default"} className="w-full text-sm sm:text-base" disabled={disabled}>
              {disabled ? "Coming Soon" : "Play Now"}
            </Button>
          </Link>
        )
      )}
    </CardFooter>
  </Card>
);

export default function GameUniverseSectionContent() {
  const [reminderEmail, setReminderEmail] = useState('');
  const { toast } = useToast();

  const handleReminderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reminderEmail) {
      toast({ title: "Email Required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(reminderEmail)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    toast({
      title: "You're on the list!",
      description: `We'll notify you at ${reminderEmail} when new games arrive. (Mock action)`,
    });
    setReminderEmail('');
  };

  const games = [
    {
      icon: <SlotsCategoryIcon aria-hidden="true" />,
      title: "Dazzling Slots",
      description: "Spin through worlds of wonder with vibrant themes, captivating stories, and exhilarating bonus features designed to thrill.",
      href: "/games/slots"
    },
    {
      icon: <PokerCategoryIcon aria-hidden="true" />,
      title: "Masterful Poker",
      description: "Sharpen your skills and outwit opponents at our Video Poker tables. Aim for the Royal Flush!",
      href: "/lobby/poker"
    },
    {
      icon: <BingoCategoryIcon aria-hidden="true" />,
      title: "Lively Bingo",
      description: "Daub your way to victory in our buzzing bingo rooms. Feel the rush as your numbers are called!",
      href: "/lobby/bingo"
    },
    {
      icon: <ScratchersCategoryIcon aria-hidden="true" />,
      title: "Instant Scratchers",
      description: "Uncover instant prizes and thrilling surprises with a quick scratch. Fast fun, big excitement!",
      href: "/lobby/scratchers"
    },
    {
      icon: <CoinFlipCategoryIcon aria-hidden="true" />,
      title: "Classic Coin Flip",
      description: "Heads or Tails? A pure game of chance for quick bets and instant gratification. Double up if you dare!",
      href: "/lobby/coin-flip"
    },
    {
      icon: <Sparkles aria-hidden="true" />,
      title: "More Adventures Coming Soon!",
      description: "Get ready! Craps, Roulette, Keno, and Lottery games are on their way to expand your royal playground!",
      footerContent: (
        <form onSubmit={handleReminderSubmit} className="w-full space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={reminderEmail}
            onChange={(e) => setReminderEmail(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
            aria-label="Email for game reminders"
          />
          <Button type="submit" variant="default" className="w-full text-sm sm:text-base">
            Remind Me
          </Button>
        </form>
      )
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <Globe aria-hidden="true" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-4 text-center">A Universe of Thrilling Games Awaits Your Command!</h2>
        <p className="text-lg text-muted-foreground mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
          From dazzling slots and strategic poker to lively bingo and instant-win scratchers, your next favorite game is here. Explore diverse themes and chase epic virtual jackpots!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {games.map((game, index) => (
            <GameTypeCard
              key={index}
              icon={game.icon}
              title={game.title}
              description={game.description}
              href={game.href}
              footerContent={game.footerContent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

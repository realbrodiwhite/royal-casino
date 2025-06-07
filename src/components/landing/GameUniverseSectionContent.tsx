
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Globe, Sparkles, Crown } from 'lucide-react';
import SlotsCategoryIcon from '@/components/game/category-icons/SlotsCategoryIcon';
import PokerCategoryIcon from '@/components/game/category-icons/PokerCategoryIcon';
import BingoCategoryIcon from '@/components/game/category-icons/BingoCategoryIcon';
import ScratchersCategoryIcon from '@/components/game/category-icons/ScratchersCategoryIcon';
import CoinFlipCategoryIcon from '@/components/game/category-icons/CoinFlipCategoryIcon';
import CrapsCategoryIcon from '@/components/game/category-icons/CrapsCategoryIcon'; // For Rollin' Dice
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils'; // Added missing import

interface GameTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  disabled?: boolean;
  footerContent?: React.ReactNode;
  className?: string;
}

const GameTypeCard: React.FC<GameTypeCardProps> = ({ icon, title, description, href, disabled, footerContent, className }) => (
  <Card className={cn("bg-card border-border shadow-lg hover:shadow-primary/30 transition-shadow duration-300 flex flex-col text-center", className)}>
    <CardHeader className="items-center pt-6 sm:pt-8">
      <div className="p-3 sm:p-4 bg-primary/20 rounded-full mb-3 sm:mb-4 inline-block">
        {React.cloneElement(icon as React.ReactElement, { className: "h-16 w-16 sm:h-20 sm:w-20 text-primary" })}
      </div>
      <CardTitle className="text-lg sm:text-xl font-headline text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow px-4 pb-4 sm:px-6 sm:pb-6">
      <CardDescription className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 min-h-[3.5rem] sm:min-h-[5rem]">{description}</CardDescription>
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

  const topGames = [
    {
      icon: <SlotsCategoryIcon aria-hidden="true" />,
      title: "Dazzling Slots",
      description: "Spin to win with Royal Casino's Dazzling Slots! Explore a universe of online slot games, from classic fruit machines to modern video slots with thrilling bonus features and massive virtual jackpots. Your next big win awaits!",
      href: "/games/slots"
    },
    {
      icon: <PokerCategoryIcon aria-hidden="true" />,
      title: "Masterful Poker",
      description: "Challenge yourself with Masterful Video Poker at Royal Casino. Test your poker strategy and skill in our Jacks or Better games. Aim for the coveted Royal Flush and play like a pro in a premium online poker environment.",
      href: "/lobby/poker"
    },
    {
      icon: <BingoCategoryIcon aria-hidden="true" />,
      title: "Lovely Bingo",
      description: "Join the fun in Royal Casino's Lovely Bingo rooms! Experience the excitement of online bingo games, daub your way to victory with classic and unique patterns, and connect with a vibrant community of players. It’s easy to play and always a great time!",
      href: "/lobby/bingo"
    },
    {
      icon: <ScratchersCategoryIcon aria-hidden="true" />,
      title: "Instant Scratchers",
      description: "Win in an instant with Royal Casino's exciting Scratchers! Discover a wide variety of online scratch cards offering quick thrills and big virtual prizes. If you love instant win lottery games, our scratch tickets are for you!",
      href: "/lobby/scratchers"
    },
    {
      icon: <CoinFlipCategoryIcon aria-hidden="true" />,
      title: "Classic Coin Flip",
      description: "Take a chance with Royal Casino's Classic Coin Flip! It’s the ultimate simple bet – heads or tails? Enjoy this fast-paced 50/50 online casino game for quick decisions and instant results. Double your virtual stake if you dare!",
      href: "/lobby/coin-flip"
    },
    {
      icon: <CrapsCategoryIcon aria-hidden="true" />,
      title: "Rollin' Dice (Craps)",
      description: "Experience the electrifying thrill of the dice with Rollin' Dice (Craps) at Royal Casino! Get ready for this iconic casino game, learn the pass line, and feel the rush of every roll. The excitement of online craps is coming soon!",
      href: "#",
      disabled: true,
    }
  ];

  const comingSoonGame = {
      icon: <Sparkles aria-hidden="true" />,
      title: "More Adventures Incoming!",
      description: "Get ready! Keno, Roulette, and exciting Lottery games are on their way to expand your royal playground! Enter your email to be notified.",
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
    };

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <Globe aria-hidden="true" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-4 text-center">A Universe of Thrilling Games Awaits Your Command!</h2>
        <p className="text-lg text-muted-foreground mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
          From dazzling slots and strategic poker to lively bingo and instant-win scratchers, your next favorite game is here. Explore diverse themes and chase epic virtual jackpots!
        </p>
        
        {/* Top 6 Games in a 2x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {topGames.map((game, index) => (
            <GameTypeCard
              key={index}
              icon={game.icon}
              title={game.title}
              description={game.description}
              href={game.href}
              disabled={game.disabled}
              footerContent={game.footerContent}
            />
          ))}
        </div>

        {/* "More Adventures Coming Soon!" Card - Full width below the grid */}
        <div className="mt-10 sm:mt-12">
            <GameTypeCard
                icon={comingSoonGame.icon}
                title={comingSoonGame.title}
                description={comingSoonGame.description}
                footerContent={comingSoonGame.footerContent}
                className="lg:col-span-3" 
            />
        </div>

        {/* New Welcome Card - Full width below */}
        <div className="mt-10 sm:mt-12">
            <Card className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-border shadow-xl text-center">
                <CardHeader className="items-center pt-6 sm:pt-8">
                    <div className="p-3 sm:p-4 bg-primary/20 rounded-full mb-3 sm:mb-4 inline-block">
                        <Crown className="h-16 w-16 sm:h-20 sm:w-20 text-primary" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-headline text-primary">Welcome to the Kingdom!</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <CardDescription className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-xl mx-auto">
                        Your royal adventure starts now! Explore our vast selection of games, connect with fellow players, and discover why Royal Casino is the ultimate social gaming destination.
                    </CardDescription>
                </CardContent>
                <CardFooter className="justify-center mt-auto px-4 pb-6 sm:px-6 sm:pb-8 pt-0">
                    <Link href="/lobby" passHref>
                        <Button variant="default" size="lg" className="font-semibold px-8 py-3 text-lg">
                            Explore All Games
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>

      </div>
    </section>
  );
}


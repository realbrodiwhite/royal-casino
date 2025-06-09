
// src/app/lobby/page.tsx
"use client";

// DESIGN NOTE: This page's content should ideally fit within a single viewport height
// when sectional scrolling is active, to avoid internal page scrolling within a section.
// If the number of games grows significantly, consider pagination or a more compact layout for game cards.

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Import new SVG category icons
import SlotsCategoryIcon from '@/components/game/category-icons/SlotsCategoryIcon';
import PokerCategoryIcon from '@/components/game/category-icons/PokerCategoryIcon';
import BingoCategoryIcon from '@/components/game/category-icons/BingoCategoryIcon';
import ScratchersCategoryIcon from '@/components/game/category-icons/ScratchersCategoryIcon';
import CoinFlipCategoryIcon from '@/components/game/category-icons/CoinFlipCategoryIcon';
import CrapsCategoryIcon from '@/components/game/category-icons/CrapsCategoryIcon';
import KenoCategoryIcon from '@/components/game/category-icons/KenoCategoryIcon';
import RouletteCategoryIcon from '@/components/game/category-icons/RouletteCategoryIcon';
import LotteryCategoryIcon from '@/components/game/category-icons/LotteryCategoryIcon';


interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  imageUrl?: string;
  disabled?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, icon, href, imageUrl, disabled = false }) => {
  return (
    <Card className="bg-card border-border shadow-xl hover:shadow-primary/50 transition-all duration-300 flex flex-col">
      <CardHeader className="items-center text-center">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} width={150} height={100} className="rounded-md mb-4 object-cover h-32 w-full" />
        ) : (
          <div className="p-4 bg-primary/20 rounded-full mb-4 inline-block">
            {React.cloneElement(icon as React.ReactElement, { className: "h-28 w-28 sm:h-32 sm:w-32 text-primary" })}
          </div>
        )}
        <CardTitle className="text-xl sm:text-2xl font-headline text-primary">{title}</CardTitle>
        <CardDescription className="text-muted-foreground min-h-[3.5rem] overflow-hidden text-ellipsis">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <Link href={disabled ? '#' : href} passHref>
          <Button
            variant="default"
            className="w-full mt-4"
            disabled={disabled}
          >
            {disabled ? 'Coming Soon' : 'Play Now'}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default function LobbyPage() {
  const games = [
    { title: "Slots", description: "Spin the reels for exciting wins! Choose your theme.", icon: <SlotsCategoryIcon />, href: "/games/slots", imageUrl: "/images/lobby-art/slots-game.svg"},
    { title: "Poker", description: "Test your skills at video poker.", icon: <PokerCategoryIcon />, href: "/lobby/poker", imageUrl: "/images/lobby-art/poker-game.svg", disabled: false },
    { title: "Bingo", description: "Daub your way to victory!", icon: <BingoCategoryIcon />, href: "/lobby/bingo", imageUrl: "/images/lobby-art/bingo-game.svg", disabled: false },
    { title: "Scratchers", description: "Instant win lottery tickets.", icon: <ScratchersCategoryIcon />, href: "/lobby/scratchers", imageUrl: "/images/lobby-art/scratchers-game.svg", disabled: false },
    { title: "Coin Flip", description: "A simple game of chance. Heads or tails?", icon: <CoinFlipCategoryIcon />, href: "/lobby/coin-flip", imageUrl: "/images/lobby-art/coin-flip-game.svg", disabled: false },
    { title: "Craps", description: "Roll the dice in this classic casino game.", icon: <CrapsCategoryIcon />, href: "#", imageUrl: "/images/lobby-art/craps-game.svg", disabled: true },
    { title: "Keno", description: "Pick your lucky numbers for a chance to win big!", icon: <KenoCategoryIcon />, href: "#", imageUrl: "/images/lobby-art/keno-game.svg", disabled: true },
    { title: "Roulette", description: "Place your bets and spin the iconic wheel.", icon: <RouletteCategoryIcon />, href: "#", imageUrl: "/images/lobby-art/roulette-game.svg", disabled: true },
    { title: "Lottery Draw", description: "Match numbers for a chance at huge jackpots!", icon: <LotteryCategoryIcon />, href: "#", imageUrl: "/images/lobby-art/lottery-game.svg", disabled: true },
  ];

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className={cn(
        "flex-grow landing-scroll-container" 
      )}>
        <section className="landing-scroll-section">
          <div className="container mx-auto px-4 py-8 sm:py-10"> {/* Adjusted padding for scroll section */}
            <header className="mb-10 sm:mb-12 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Game Lobby</h1>
              <p className="text-lg sm:text-xl text-muted-foreground mt-2">Choose your game and let the fun begin!</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {games.map((game) => (
                <GameCard
                  key={game.title}
                  title={game.title}
                  description={game.description}
                  icon={game.icon}
                  href={game.href}
                  imageUrl={game.imageUrl}
                  disabled={game.disabled}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground border-t border-border">
        <p>&copy; 2025 Royal Casino. All Rights Reserved. Built By Brodi Inc.</p>
      </footer>
    </div>
  );
}

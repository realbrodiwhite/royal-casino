
// src/app/lobby/page.tsx
"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dice5, AppWindow, Ticket, CircleDollarSign, Rows, Dice6, ListChecks, Disc3 } from 'lucide-react';
import Image from 'next/image';

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  imageUrl?: string;
  dataAiHint?: string;
  disabled?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, icon, href, imageUrl, dataAiHint, disabled = false }) => {
  return (
    <Card className="bg-card border-border shadow-xl hover:shadow-primary/50 transition-all duration-300 flex flex-col">
      <CardHeader className="items-center text-center">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} width={150} height={100} className="rounded-md mb-4 object-cover h-32 w-full" data-ai-hint={dataAiHint || `${title.toLowerCase()} game`} />
        ) : (
          <div className="p-4 bg-primary/20 rounded-full mb-4 inline-block">
            {React.cloneElement(icon as React.ReactElement, { className: "h-10 w-10 text-primary" })}
          </div>
        )}
        <CardTitle className="text-2xl font-headline text-primary">{title}</CardTitle>
        <CardDescription className="text-muted-foreground h-12 overflow-hidden text-ellipsis">{description}</CardDescription>
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
    { title: "Slots", description: "Spin the reels for exciting wins! Choose your theme.", icon: <Dice5 />, href: "/games/slots", imageUrl: "https://placehold.co/300x200.png?text=Slots" , dataAiHint: "slot machine casino"},
    { title: "Poker", description: "Test your skills at video poker.", icon: <Rows />, href: "/lobby/poker", imageUrl: "https://placehold.co/300x200.png?text=Poker", dataAiHint: "poker cards casino", disabled: false },
    { title: "Bingo", description: "Daub your way to victory!", icon: <AppWindow />, href: "/lobby/bingo", imageUrl: "https://placehold.co/300x200.png?text=Bingo", dataAiHint: "bingo card game", disabled: false },
    { title: "Scratchers", description: "Instant win lottery tickets.", icon: <Ticket />, href: "/lobby/scratchers", imageUrl: "https://placehold.co/300x200.png?text=Scratchers", dataAiHint: "lottery scratch ticket", disabled: false },
    { title: "Coin Flip", description: "A simple game of chance. Heads or tails?", icon: <CircleDollarSign />, href: "/lobby/coin-flip", imageUrl: "https://placehold.co/300x200.png?text=Coin+Flip", dataAiHint: "coin flip chance", disabled: false },
    { title: "Craps", description: "Roll the dice in this classic casino game.", icon: <Dice6 />, href: "#", imageUrl: "https://placehold.co/300x200.png?text=Craps", dataAiHint: "craps dice game", disabled: true },
    { title: "Keno", description: "Pick your lucky numbers for a chance to win big!", icon: <ListChecks />, href: "#", imageUrl: "https://placehold.co/300x200.png?text=Keno", dataAiHint: "keno numbers game", disabled: true },
    { title: "Roulette", description: "Place your bets and spin the iconic wheel.", icon: <Disc3 />, href: "#", imageUrl: "https://placehold.co/300x200.png?text=Roulette", dataAiHint: "roulette wheel casino", disabled: true },
    { title: "Lottery Draw", description: "Match numbers for a chance at huge jackpots!", icon: <Ticket />, href: "#", imageUrl: "https://placehold.co/300x200.png?text=Lottery", dataAiHint: "lottery balls draw", disabled: true },
  ];

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold font-headline text-primary">Game Lobby</h1>
          <p className="text-xl text-muted-foreground mt-2">Choose your game and let the fun begin!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard
              key={game.title}
              title={game.title}
              description={game.description}
              icon={game.icon}
              href={game.href}
              imageUrl={game.imageUrl}
              dataAiHint={game.dataAiHint}
              disabled={game.disabled}
            />
          ))}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
      </footer>
    </div>
  );
}

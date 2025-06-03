
// src/app/lobby/page.tsx
"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dice5, Puzzle, Ticket, CircleDollarSign, Rows } from 'lucide-react';
import Image from 'next/image';

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  imageUrl?: string;
  themeColor?: string; // e.g., 'bg-red-500'
  disabled?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, icon, href, imageUrl, themeColor = 'bg-silver/10', disabled = false }) => {
  return (
    <Card className={`${themeColor} border-gold shadow-xl hover:shadow-gold/50 transition-all duration-300 flex flex-col`}>
      <CardHeader className="items-center text-center">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} width={150} height={100} className="rounded-md mb-4 object-cover h-32 w-full" data-ai-hint={`${title.toLowerCase()} game`} />
        ) : (
          <div className="p-4 bg-gold/20 rounded-full mb-4 inline-block">
            {React.cloneElement(icon as React.ReactElement, { className: "h-10 w-10 text-gold" })}
          </div>
        )}
        <CardTitle className="text-2xl font-headline text-gold">{title}</CardTitle>
        <CardDescription className="text-silver/80 h-12 overflow-hidden text-ellipsis">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <Link href={disabled ? '#' : href} passHref>
          <Button
            className={`w-full mt-4 ${disabled ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-gold text-deep-purple hover:bg-gold/90'}`}
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
    { title: "Slots", description: "Spin the reels for exciting wins!", icon: <Dice5 />, href: "/lobby/slots", imageUrl: "https://placehold.co/300x200.png?text=Slots" , dataAiHint: "slot machine casino"},
    { title: "Poker", description: "Test your skills at the poker table.", icon: <Rows />, href: "/lobby/poker", imageUrl: "https://placehold.co/300x200.png?text=Poker", dataAiHint: "poker cards casino", disabled: true },
    { title: "Bingo", description: "Daub your way to victory!", icon: <Puzzle />, href: "/lobby/bingo", imageUrl: "https://placehold.co/300x200.png?text=Bingo", dataAiHint: "bingo balls cards", disabled: true },
    { title: "Scratchers", description: "Instant win lottery tickets.", icon: <Ticket />, href: "/lobby/scratchers", imageUrl: "https://placehold.co/300x200.png?text=Scratchers", dataAiHint: "lottery scratch ticket", disabled: true },
    { title: "Coin Flip", description: "A simple game of chance. Heads or tails?", icon: <CircleDollarSign />, href: "/lobby/coin-flip", imageUrl: "https://placehold.co/300x200.png?text=Coin+Flip", dataAiHint: "coin flip chance", disabled: false },
  ];

  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold font-headline text-gold">Game Lobby</h1>
          <p className="text-xl text-silver mt-2">Choose your game and let the fun begin!</p>
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
              disabled={game.disabled}
            />
          ))}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-silver/70 border-t border-gold/20">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
      </footer>
    </div>
  );
}

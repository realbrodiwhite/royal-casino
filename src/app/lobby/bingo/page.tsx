
// src/app/lobby/bingo/page.tsx
"use client";

import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Puzzle } from 'lucide-react'; // Placeholder icon

export default function BingoPage() {
  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <Puzzle className="h-24 w-24 text-gold mb-6" />
        <h1 className="text-5xl font-bold font-headline text-gold mb-4">Bingo Hall</h1>
        <p className="text-xl text-silver mb-8">
          The Bingo Hall is getting ready for its grand opening. Please visit again soon!
        </p>
        <Link href="/lobby">
          <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
            Back to Game Lobby
          </Button>
        </Link>
      </main>
      <footer className="text-center py-6 text-sm text-silver/70 border-t border-gold/20">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
    </div>
  );
}

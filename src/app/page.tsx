
"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Crown, Gem, ShieldCheck, Coins } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-20 text-center bg-gradient-to-b from-deep-purple via-purple-800 to-deep-purple">
          <div className="container mx-auto px-4">
            <Crown className="mx-auto h-24 w-24 text-gold mb-6" />
            <h1 className="text-6xl font-bold font-headline text-gold mb-6">
              Welcome to Royal Casino
            </h1>
            <p className="text-2xl text-silver mb-10">
              Experience the thrill of exclusive social gaming. Your ultimate destination for fun and fortune!
            </p>
            <div className="space-x-4">
              <Link href="/signup">
                <Button size="lg" className="bg-gold text-deep-purple hover:bg-gold/90 font-semibold px-8 py-3">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/10 font-semibold px-8 py-3">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-deep-purple/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold font-headline text-gold mb-12 text-center">
              Why Choose Royal Casino?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-silver/10 rounded-lg shadow-xl border border-gold/50">
                <Gem className="h-12 w-12 text-gold mb-4" />
                <h3 className="text-2xl font-semibold text-gold mb-2">Exclusive Games</h3>
                <p className="text-silver/90">
                  Dive into a wide variety of unique slots, poker, bingo, and more!
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-silver/10 rounded-lg shadow-xl border border-gold/50">
                <ShieldCheck className="h-12 w-12 text-gold mb-4" />
                <h3 className="text-2xl font-semibold text-gold mb-2">Safe & Secure</h3>
                <p className="text-silver/90">
                  Enjoy a fair and secure social gaming environment.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-silver/10 rounded-lg shadow-xl border border-gold/50">
                <Coins className="h-12 w-12 text-gold mb-4" />
                <h3 className="text-2xl font-semibold text-gold mb-2">Daily Bonuses</h3>
                <p className="text-silver/90">
                  Get free credits daily and enjoy exciting promotions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-silver/10 rounded-lg shadow-xl border border-gold/50">
                <Image src="https://placehold.co/300x200.png" alt="Luxury Casino Experience" width={300} height={200} className="rounded-md mb-4" data-ai-hint="casino games" />
                <h3 className="text-2xl font-semibold text-gold mb-2">Luxury Experience</h3>
                <p className="text-silver/90">
                  Immerse yourself in our opulent casino atmosphere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold font-headline text-gold mb-6">
              Ready to Play?
            </h2>
            <p className="text-xl text-silver mb-8">
              Join thousands of players and climb the leaderboards!
            </p>
            <Link href="/lobby">
              <Button size="lg" className="bg-gold text-deep-purple hover:bg-gold/90 font-semibold px-10 py-4 text-lg">
                Explore Games
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="text-center py-6 text-sm text-silver/70 border-t border-gold/20">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
        <p>For entertainment purposes only. Play responsibly.</p>
      </footer>
    </div>
  );
}

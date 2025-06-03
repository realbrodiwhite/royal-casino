
"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Crown, Gem, ShieldCheck, Coins, DollarSign, Dice5, Rows, Puzzle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-deep-purple via-purple-800 to-deep-purple">
          <div className="container mx-auto px-4">
            <Crown className="mx-auto h-20 w-20 md:h-24 md:w-24 text-gold mb-6 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold font-headline text-gold mb-4">
              Welcome to Royal Casino
            </h1>
            <p className="text-xl md:text-2xl text-silver mb-8 max-w-3xl mx-auto">
              Your ultimate destination for exclusive social gaming thrills and fortune!
            </p>
            <div className="mb-10 p-6 bg-gold/10 border border-gold rounded-lg inline-block shadow-xl">
                <h2 className="text-2xl md:text-3xl font-headline text-gold flex items-center justify-center">
                    <DollarSign className="h-8 w-8 md:h-10 md:w-10 mr-3 text-gold" /> New Player Offer!
                </h2>
                <p className="text-lg md:text-xl text-silver mt-2">Double Your First Credit Purchase <span className="font-bold text-gold">Up To $20!</span></p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/signup" passHref>
                <Button size="lg" className="bg-gold text-deep-purple hover:bg-gold/90 font-semibold px-8 py-3 text-lg w-full sm:w-auto">
                  Sign Up & Claim Offer
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/10 font-semibold px-8 py-3 text-lg w-full sm:w-auto">
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
              <FeatureCard
                icon={<Gem className="h-12 w-12 text-gold mb-4" />}
                title="Exclusive Games"
                description="Discover a curated selection of unique slots, classic table games, and thrilling instant wins!"
              />
              <FeatureCard
                icon={<ShieldCheck className="h-12 w-12 text-gold mb-4" />}
                title="Fair & Secure Play"
                description="Enjoy peace of mind in our secure social gaming environment, committed to fair play."
              />
              <FeatureCard
                icon={<Coins className="h-12 w-12 text-gold mb-4" />}
                title="Generous Rewards"
                description="Boost your play with daily free credits, exciting promotions, and loyalty bonuses."
              />
              <FeatureCard
                image={{ src: "https://placehold.co/600x400.png", alt: "Luxury Casino Experience", "data-ai-hint": "casino lounge" }}
                title="Luxury Experience"
                description="Immerse yourself in our opulent casino atmosphere, designed for premium entertainment."
              />
            </div>
          </div>
        </section>

        {/* Explore Our Games Section */}
        <section className="py-16 bg-deep-purple">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold font-headline text-gold mb-12 text-center">Step Into Our World of Games</h2>
            <p className="text-xl text-silver mb-10 text-center max-w-2xl mx-auto">
              From the fast-paced thrill of the slots to the strategic depths of table games, your next favorite game awaits.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <GameTypeCard
                icon={<Dice5 className="h-10 w-10 text-gold" />}
                title="Thrilling Slots"
                description="Spin the reels on a variety of themed slot machines with unique features and big win potential."
                href="/lobby/slots"
              />
              <GameTypeCard
                icon={<Rows className="h-10 w-10 text-gold" />}
                title="Classic Poker"
                description="Test your skills and strategy at our virtual poker tables. (Coming Soon)"
                href="/lobby/poker"
                disabled
              />
              <GameTypeCard
                icon={<Puzzle className="h-10 w-10 text-gold" />}
                title="Exciting Bingo"
                description="Join the fun in our bingo halls and daub your way to victory. (Coming Soon)"
                href="/lobby/bingo"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 text-center bg-gradient-to-t from-deep-purple via-purple-800 to-deep-purple">
          <div className="container mx-auto px-4">
            <Sparkles className="mx-auto h-16 w-16 text-gold mb-6" />
            <h2 className="text-4xl font-bold font-headline text-gold mb-6">
              Ready to Experience Royalty?
            </h2>
            <p className="text-xl text-silver mb-8 max-w-2xl mx-auto">
              Join thousands of players, compete on the leaderboards, and discover your new favorite games!
            </p>
            <Link href="/lobby" passHref>
              <Button size="lg" className="bg-gold text-deep-purple hover:bg-gold/90 font-semibold px-10 py-4 text-lg">
                Explore the Game Lobby
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

interface FeatureCardProps {
  icon?: React.ReactNode;
  image?: { src: string; alt: string; "data-ai-hint": string };
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, image, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-silver/5 rounded-lg shadow-xl border border-gold/30 hover:border-gold hover:shadow-gold/20 transition-all duration-300">
    {icon && <div className="mb-4 p-3 rounded-full bg-gold/10">{icon}</div>}
    {image && (
      <Image
        src={image.src}
        alt={image.alt}
        width={300}
        height={200}
        className="rounded-md mb-4 object-cover w-full h-40"
        data-ai-hint={image['data-ai-hint']}
      />
    )}
    <h3 className="text-2xl font-semibold text-gold mb-2 font-headline">{title}</h3>
    <p className="text-silver/90 text-sm leading-relaxed">{description}</p>
  </div>
);

interface GameTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  disabled?: boolean;
}

const GameTypeCard: React.FC<GameTypeCardProps> = ({ icon, title, description, href, disabled }) => (
  <Card className="bg-silver/10 border-gold shadow-lg hover:shadow-gold/30 transition-shadow duration-300 flex flex-col text-center">
    <CardHeader className="items-center">
      <div className="p-3 bg-gold/20 rounded-full mb-3 inline-block">
        {icon}
      </div>
      <CardTitle className="text-xl font-headline text-gold">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <CardDescription className="text-silver/80 text-sm mb-4">{description}</CardDescription>
    </CardContent>
    <CardContent>
       <Link href={disabled ? "#" : href} passHref>
        <Button variant={disabled ? "outline" : "default"} className={`w-full ${disabled ? 'border-silver/50 text-silver/70 cursor-not-allowed hover:bg-silver/10' : 'bg-gold text-deep-purple hover:bg-gold/90'}`} disabled={disabled}>
          {disabled ? "Coming Soon" : "Play Now"}
        </Button>
      </Link>
    </CardContent>
  </Card>
);

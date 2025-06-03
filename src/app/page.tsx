
"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Crown, Gem, ShieldCheck, Coins, DollarSign, Dice5, Rows, Puzzle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-background via-purple-800/30 to-background">
          <div className="container mx-auto px-4">
            <Crown className="mx-auto h-20 w-20 md:h-24 md:w-24 text-primary mb-6 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary mb-4">
              Welcome to Royal Casino
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto">
              Your ultimate destination for exclusive social gaming thrills and fortune!
            </p>
            <div className="mb-10 p-6 bg-primary/10 border border-primary rounded-lg inline-block shadow-xl">
                <h2 className="text-2xl md:text-3xl font-headline text-primary flex items-center justify-center">
                    <DollarSign className="h-8 w-8 md:h-10 md:w-10 mr-3 text-primary" /> New Player Offer!
                </h2>
                <p className="text-lg md:text-xl text-foreground mt-2">Double Your First Credit Purchase <span className="font-bold text-primary">Up To $20!</span></p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/signup" passHref>
                <Button size="lg" variant="default" className="font-semibold px-8 py-3 text-lg w-full sm:w-auto">
                  Sign Up & Claim Offer
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button variant="outline" size="lg" className="font-semibold px-8 py-3 text-lg w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold font-headline text-primary mb-12 text-center">
              Why Choose Royal Casino?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Gem className="h-12 w-12 text-primary mb-4" />}
                title="Exclusive Games"
                description="Discover a curated selection of unique slots, classic table games, and thrilling instant wins!"
              />
              <FeatureCard
                icon={<ShieldCheck className="h-12 w-12 text-primary mb-4" />}
                title="Fair & Secure Play"
                description="Enjoy peace of mind in our secure social gaming environment, committed to fair play."
              />
              <FeatureCard
                icon={<Coins className="h-12 w-12 text-primary mb-4" />}
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

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold font-headline text-primary mb-12 text-center">Step Into Our World of Games</h2>
            <p className="text-xl text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
              From the fast-paced thrill of the slots to the strategic depths of table games, your next favorite game awaits.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <GameTypeCard
                icon={<Dice5 className="h-10 w-10 text-primary" />}
                title="Thrilling Slots"
                description="Spin the reels on a variety of themed slot machines with unique features and big win potential."
                href="/lobby/slots"
              />
              <GameTypeCard
                icon={<Rows className="h-10 w-10 text-primary" />}
                title="Classic Poker"
                description="Test your skills and strategy at our virtual poker tables. (Coming Soon)"
                href="/lobby/poker"
                disabled
              />
              <GameTypeCard
                icon={<Puzzle className="h-10 w-10 text-primary" />}
                title="Exciting Bingo"
                description="Join the fun in our bingo halls and daub your way to victory. (Coming Soon)"
                href="/lobby/bingo"
                disabled
              />
            </div>
          </div>
        </section>

        <section className="py-20 text-center bg-gradient-to-t from-background via-purple-800/30 to-background">
          <div className="container mx-auto px-4">
            <Sparkles className="mx-auto h-16 w-16 text-primary mb-6" />
            <h2 className="text-4xl font-bold font-headline text-primary mb-6">
              Ready to Experience Royalty?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of players, compete on the leaderboards, and discover your new favorite games!
            </p>
            <Link href="/lobby" passHref>
              <Button size="lg" variant="default" className="font-semibold px-10 py-4 text-lg">
                Explore the Game Lobby
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
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
  <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-xl border border-border hover:border-primary/70 hover:shadow-primary/20 transition-all duration-300">
    {icon && <div className="mb-4 p-3 rounded-full bg-primary/10">{icon}</div>}
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
    <h3 className="text-2xl font-semibold text-primary mb-2 font-headline">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
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
  <Card className="bg-card border-border shadow-lg hover:shadow-primary/30 transition-shadow duration-300 flex flex-col text-center">
    <CardHeader className="items-center">
      <div className="p-3 bg-primary/20 rounded-full mb-3 inline-block">
        {icon}
      </div>
      <CardTitle className="text-xl font-headline text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <CardDescription className="text-muted-foreground text-sm mb-4">{description}</CardDescription>
    </CardContent>
    <CardContent>
       <Link href={disabled ? "#" : href} passHref>
        <Button variant={disabled ? "outline" : "default"} className="w-full" disabled={disabled}>
          {disabled ? "Coming Soon" : "Play Now"}
        </Button>
      </Link>
    </CardContent>
  </Card>
);

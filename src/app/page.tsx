
"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Crown, Gem, ShieldCheck, Coins, DollarSign, Sparkles, Globe } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import LuxuryExperienceIcon from '@/components/game/category-icons/LuxuryExperienceIcon';

// Import specific game category icons
import SlotsCategoryIcon from '@/components/game/category-icons/SlotsCategoryIcon';
import PokerCategoryIcon from '@/components/game/category-icons/PokerCategoryIcon';
import BingoCategoryIcon from '@/components/game/category-icons/BingoCategoryIcon';

export default function LandingPage() {
  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="pt-10 pb-8 sm:pt-12 sm:pb-10 md:pt-16 md:pb-12 text-center bg-gradient-to-b from-background via-purple-800/30 to-background">
          <div className="container mx-auto px-4">
            {/* Triple King's Coin Logo for Hero */}
            <div className="relative flex justify-center items-center mb-4 sm:mb-6 h-24 sm:h-32 md:h-36">

              {/* Left Side Coin (behind) */}
              <div className="relative z-0 transform scale-90 
                              mr-[-19px] sm:mr-[-26px] md:mr-[-29px]">
                <div className="border-4 border-primary rounded-full bg-transparent 
                                flex items-center justify-center 
                                w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
                  <Crown className="text-primary h-12 w-12 sm:h-16 sm:h-16 md:h-18 md:w-18" aria-hidden="true" />
                </div>
              </div>

              {/* Central Coin (front) */}
              <div className="relative z-10 
                              border-4 border-primary rounded-full bg-background 
                              flex items-center justify-center 
                              w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
                <Crown className="text-primary h-12 w-12 sm:h-16 sm:h-16 md:h-18 md:w-18" aria-hidden="true" />
              </div>

              {/* Right Side Coin (behind) */}
              <div className="relative z-0 transform scale-90 
                              ml-[-19px] sm:ml-[-26px] md:ml-[-29px]">
                <div className="border-4 border-primary rounded-full bg-transparent 
                                flex items-center justify-center 
                                w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
                  <Crown className="text-primary h-12 w-12 sm:h-16 sm:h-16 md:h-18 md:w-18" aria-hidden="true" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-primary mb-3 sm:mb-4">
              Welcome to Royal Casino
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground mb-6 sm:mb-8 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-2">
              Your ultimate destination for exclusive social gaming thrills and fortune!
            </p>
            <div className="mb-8 sm:mb-10 p-4 sm:p-6 bg-primary/10 border border-primary rounded-lg inline-block shadow-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-headline text-primary flex items-center justify-center">
                    <DollarSign aria-hidden="true" className="h-6 w-6 sm:h-8 md:h-10 mr-2 sm:mr-3 text-primary" /> New Player Offer!
                </h2>
                <p className="text-md sm:text-lg md:text-xl text-foreground mt-1 sm:mt-2">Double Your First Credit Purchase <span className="font-bold text-primary">Up To $20!</span></p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Link href="/signup" passHref>
                <Button size="lg" variant="default" className="font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-md sm:text-lg w-full sm:w-auto">
                  Sign Up & Claim Offer
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button variant="outline" size="lg" className="font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-md sm:text-lg w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="pt-8 pb-12 sm:pt-10 sm:pb-16 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="border-4 border-primary rounded-full bg-background flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 mx-auto">
              <Crown aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-10 sm:mb-12 text-center">
              Why Choose Royal Casino?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <FeatureCard
                icon={<Gem aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />}
                title="Exclusive Games"
                description="Discover a curated selection of unique slots, classic table games, and thrilling instant wins!"
              />
              <FeatureCard
                icon={<ShieldCheck aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />}
                title="Fair & Secure Play"
                description="Enjoy peace of mind in our secure social gaming environment, committed to fair play."
              />
              <FeatureCard
                icon={<Coins aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />}
                title="Generous Rewards"
                description="Boost your play with daily free credits, exciting promotions, and loyalty bonuses."
              />
              <FeatureCard
                icon={<LuxuryExperienceIcon aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />}
                title="Luxury Experience"
                description="Immerse yourself in our opulent casino atmosphere, designed for premium entertainment."
              />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <Globe aria-hidden="true" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-10 sm:mb-12 text-center">Step Into Our World of Games</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 text-center max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-2">
              From the fast-paced thrill of the slots to the strategic depths of table games, your next favorite game awaits.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <GameTypeCard
                icon={<SlotsCategoryIcon aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />}
                title="Thrilling Slots"
                description="Spin the reels on a variety of themed slot machines with unique features and big win potential."
                href="/games/slots"
              />
              <GameTypeCard
                icon={<PokerCategoryIcon aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />}
                title="Classic Poker"
                description="Test your skills and strategy at our virtual poker tables."
                href="/lobby/poker"
              />
              <GameTypeCard
                icon={<BingoCategoryIcon aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />}
                title="Exciting Bingo"
                description="Join the fun in our bingo halls and daub your way to victory."
                href="/lobby/bingo"
                disabled={false} 
              />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 text-center bg-gradient-to-t from-background via-purple-800/30 to-background">
          <div className="container mx-auto px-4">
            <Sparkles aria-hidden="true" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-4 sm:mb-6">
              Ready to Experience Royalty?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-2">
              Join thousands of players, compete on the leaderboards, and discover your new favorite games!
            </p>
            <Link href="/lobby" passHref>
              <Button size="lg" variant="default" className="font-semibold px-8 sm:px-10 py-3 sm:py-4 text-md sm:text-lg">
                Explore the Game Lobby
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All Rights Reserved.</p>
        <p>For entertainment purposes only. Play responsibly.</p>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon?: React.ReactNode;
  image?: { src: string; alt: string; };
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, image, title, description }) => (
  <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-card rounded-lg shadow-xl border border-border hover:border-primary/70 hover:shadow-primary/20 transition-all duration-300">
    {icon && <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-full bg-primary/10">{icon}</div>}
    {image && (
      <Image
        src={image.src}
        alt={image.alt}
        width={300}
        height={200}
        className="rounded-md mb-3 sm:mb-4 object-cover w-full h-32 sm:h-40"
        data-ai-hint="casino game feature" 
      />
    )}
    <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-1 sm:mb-2 font-headline">{title}</h3>
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
    <CardHeader className="items-center pt-6 sm:pt-8">
      <div className="p-3 sm:p-4 bg-primary/20 rounded-full mb-3 sm:mb-4 inline-block">
        {icon}
      </div>
      <CardTitle className="text-lg sm:text-xl font-headline text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow px-4 pb-4 sm:px-6 sm:pb-6">
      <CardDescription className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{description}</CardDescription>
    </CardContent>
    <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
       <Link href={disabled ? "#" : href} passHref>
        <Button variant={disabled ? "outline" : "default"} className="w-full text-sm sm:text-base" disabled={disabled}>
          {disabled ? "Coming Soon" : "Play Now"}
        </Button>
      </Link>
    </CardContent>
  </Card>
);


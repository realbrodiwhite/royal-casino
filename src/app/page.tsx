
"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Crown, Gem, ShieldCheck, Coins, Sparkles, Globe, Users, Trophy, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import LuxuryExperienceIcon from '@/components/game/category-icons/LuxuryExperienceIcon';

// Import specific game category icons
import SlotsCategoryIcon from '@/components/game/category-icons/SlotsCategoryIcon';
import PokerCategoryIcon from '@/components/game/category-icons/PokerCategoryIcon';
import BingoCategoryIcon from '@/components/game/category-icons/BingoCategoryIcon';
import ScratchersCategoryIcon from '@/components/game/category-icons/ScratchersCategoryIcon';
import CoinFlipCategoryIcon from '@/components/game/category-icons/CoinFlipCategoryIcon';

export default function LandingPage() {
  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pb-8 sm:pb-10 md:pb-12 text-center bg-gradient-to-b from-background via-purple-800/30 to-background pt-[88px] sm:pt-[92px]">
          <div className="container mx-auto px-4">
            {/* Triple King's Coin Logo */}
             <div className="relative flex justify-center items-center mb-4 sm:mb-6 h-24 sm:h-32 md:h-36">
              {/* Left Side Coin */}
              <div className="absolute top-1/2 left-1/2 z-0 transform scale-90 -translate-y-1/2 translate-x-[-115px] sm:translate-x-[-154px] md:translate-x-[-173px]">
                <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
                  <Crown aria-hidden="true" className="h-12 w-12 sm:h-16 sm:h-16 md:h-18 md:w-18 text-primary" />
                </div>
              </div>
              {/* Central Coin (Front) */}
              <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 border-4 border-primary rounded-full bg-background flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
                <Crown aria-hidden="true" className="h-12 w-12 sm:h-16 sm:h-16 md:h-18 md:w-18 text-primary" />
              </div>
              {/* Right Side Coin */}
              <div className="absolute top-1/2 left-1/2 z-0 transform scale-90 -translate-y-1/2 translate-x-[29px] sm:translate-x-[38px] md:translate-x-[43px]">
                <div className="border-4 border-primary rounded-full bg-transparent flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
                  <Crown aria-hidden="true" className="h-12 w-12 sm:h-16 sm:h-16 md:h-18 md:w-18 text-primary" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-primary mb-3 sm:mb-4">
              Step into a Realm of Royal Entertainment!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground mb-6 sm:mb-8 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-2">
              Experience the pinnacle of social casino gaming, where every play is a new adventure. Connect, compete, and celebrate your wins!
            </p>
            <div className="mb-8 sm:mb-10 p-4 sm:p-6 bg-primary/10 border border-primary rounded-lg inline-block animate-glow">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-headline text-primary flex items-center justify-center">
                    <Coins aria-hidden="true" className="h-6 w-6 sm:h-8 md:h-10 mr-2 sm:mr-3 text-primary" /> New Player Offer!
                </h2>
                <p className="text-md sm:text-lg md:text-xl text-foreground mt-1 sm:mt-2">Double Your First Credit Purchase <span className="font-bold text-primary">Up To $20 Equivalent in Credits!</span></p>
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

        {/* Discover the Royal Difference Section */}
        <section className="py-12 sm:py-16 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <Users className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-6">
              Discover the Royal Difference: Your Premier Social Casino!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Welcome to Royal Casino, where the thrill of the casino floor meets the joy of social connection! Play your favorite games purely for fun, challenge friends, climb leaderboards, and enjoy a world-class gaming experience without the pressure of real-money stakes. It's all about entertainment, community, and celebrating those winning moments together.
            </p>
          </div>
        </section>

        {/* A Universe of Thrilling Games Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <Globe aria-hidden="true" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-4 text-center">A Universe of Thrilling Games Awaits Your Command!</h2>
            <p className="text-lg text-muted-foreground mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
              From dazzling slots and strategic poker to lively bingo and instant-win scratchers, your next favorite game is here. Explore diverse themes and chase epic virtual jackpots!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <GameTypeCard
                icon={<SlotsCategoryIcon aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />}
                title="Dazzling Slots"
                description="Spin through worlds of wonder with vibrant themes, captivating stories, and exhilarating bonus features designed to thrill."
                href="/games/slots"
              />
              <GameTypeCard
                icon={<PokerCategoryIcon aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />}
                title="Masterful Poker"
                description="Sharpen your skills and outwit opponents at our Video Poker tables. Aim for the Royal Flush!"
                href="/lobby/poker"
              />
              <GameTypeCard
                icon={<BingoCategoryIcon aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />}
                title="Lively Bingo"
                description="Daub your way to victory in our buzzing bingo rooms. Feel the rush as your numbers are called!"
                href="/lobby/bingo"
              />
              <GameTypeCard
                icon={<ScratchersCategoryIcon aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />}
                title="Instant Scratchers"
                description="Uncover instant prizes and thrilling surprises with a quick scratch. Fast fun, big excitement!"
                href="/lobby/scratchers"
              />
              <GameTypeCard
                icon={<CoinFlipCategoryIcon aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />}
                title="Classic Coin Flip"
                description="Heads or Tails? A pure game of chance for quick bets and instant gratification. Double up if you dare!"
                href="/lobby/coin-flip"
              />
              <GameTypeCard
                icon={<Sparkles aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />}
                title="More Adventures Coming Soon!"
                description="Get ready! Craps, Roulette, Keno, and Lottery games are on their way to expand your royal playground!"
                href="#"
                disabled={true}
              />
            </div>
          </div>
        </section>

        {/* Experience the Royal Treatment Section */}
        <section className="py-12 sm:py-16 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="border-4 border-primary rounded-full bg-background flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 mx-auto">
              <Crown aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-10 sm:mb-12 text-center">
              Experience the Royal Treatment: Features Fit for Royalty!
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard
                icon={<Gem aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />}
                title="Unrivaled Game Selection"
                description="Explore a vast library of exclusive titles and beloved casino classics, meticulously designed for your premium entertainment."
              />
              <FeatureCard
                icon={<Coins aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />}
                title="Daily Treasures & Promotions"
                description="Your loyalty is rewarded! Claim daily free credits, spin bonus wheels, and participate in exciting promotions to boost your play."
              />
              <FeatureCard
                icon={<Trophy aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />}
                title="Compete & Conquer"
                description="Rise through the ranks on our global leaderboards. Showcase your skills, earn bragging rights, and become a Royal Casino legend!"
              />
              <FeatureCard
                icon={<Users aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />}
                title="Vibrant Social Hub"
                description="Connect with friends, send gifts, celebrate big wins together, and forge new rivalries. Gaming is better with company!"
              />
               <FeatureCard
                icon={<ShieldCheck aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />}
                title="Safe, Secure & Fair Play"
                description="Your enjoyment and security are paramount. Play with confidence in a fair, transparent, and responsible social gaming environment."
              />
              <FeatureCard
                icon={<LuxuryExperienceIcon aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />}
                title="A Touch of Luxury"
                description="Immerse yourself in an opulent casino atmosphere, with stunning graphics and captivating soundscapes, all from the comfort of home."
              />
            </div>
          </div>
        </section>

        {/* Begin Your Royal Journey Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <UserPlus className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-8">
              Begin Your Royal Journey in Moments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-10">
              <StepCard
                stepNumber="1"
                title="Sign Up Free"
                description="Create your account in seconds – it's quick, easy, and completely free."
              />
              <StepCard
                stepNumber="2"
                title="Claim Your Bonus"
                description="Instantly receive your new player offer to kickstart your adventure with extra credits."
              />
              <StepCard
                stepNumber="3"
                title="Explore & Play!"
                description="Dive into our world of games, discover your favorites, and start winning!"
              />
            </div>
            <Link href="/signup" passHref>
              <Button size="lg" variant="default" className="font-semibold px-8 py-3 text-lg">
                Join the Elite - Sign Up Now!
              </Button>
            </Link>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 sm:py-20 text-center bg-gradient-to-t from-background via-purple-800/30 to-background">
          <div className="container mx-auto px-4">
            <Sparkles aria-hidden="true" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-4 sm:mb-6">
              Your Throne Awaits at Royal Casino!
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto px-2">
              Don't just play, reign. The ultimate social casino experience is just a click away. Sign up today, claim your bonus, and let the royal games begin!
            </p>
            <Link href="/lobby" passHref>
              <Button size="lg" variant="default" className="font-semibold px-10 py-4 text-xl">
                Enter the Kingdom - Play Now!
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
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-card rounded-lg shadow-xl border border-border hover:border-primary/70 hover:shadow-primary/20 transition-all duration-300">
    {icon && <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-full bg-primary/10">{icon}</div>}
    <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-2 font-headline">{title}</h3>
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
      <CardDescription className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 min-h-[3.5rem]">{description}</CardDescription>
    </CardContent>
    <CardFooter className="mt-auto px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
       <Link href={disabled ? "#" : href} passHref className="w-full">
        <Button variant={disabled ? "outline" : "default"} className="w-full text-sm sm:text-base" disabled={disabled}>
          {disabled ? "Coming Soon" : "Play Now"}
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

interface StepCardProps {
  stepNumber: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description }) => (
  <Card className="bg-card border-border text-center p-4 sm:p-6 h-full flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow">
    <CardHeader className="items-center pb-3 pt-2">
      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg sm:text-xl mb-3">
        {stepNumber}
      </div>
      <CardTitle className="text-md sm:text-lg font-headline text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

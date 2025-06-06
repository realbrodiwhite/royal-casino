
import React from 'react';
import { Crown, Gem, Coins, Trophy, Users, ShieldCheck } from 'lucide-react';
import LuxuryExperienceIcon from '@/components/game/category-icons/LuxuryExperienceIcon';

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-card rounded-lg shadow-xl border border-border hover:border-primary/70 hover:shadow-primary/20 transition-all duration-300">
    {icon && <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-full bg-primary/10">{React.cloneElement(icon as React.ReactElement, { className: "h-10 w-10 sm:h-12 sm:w-12 text-primary" })}</div>}
    <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-2 font-headline">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </div>
);

export default function RoyalTreatmentSectionContent() {
  return (
    <section className="py-12 sm:py-16 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="border-4 border-primary rounded-full bg-background flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 mx-auto">
          <Crown aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-10 sm:mb-12 text-center">
          Experience the Royal Treatment: Features Fit for Royalty!
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <FeatureCard
            icon={<Gem aria-hidden="true" />}
            title="Unrivaled Game Selection"
            description="Explore a vast library of exclusive titles and beloved casino classics, meticulously designed for your premium entertainment."
          />
          <FeatureCard
            icon={<Coins aria-hidden="true" />}
            title="Daily Treasures & Promotions"
            description="Your loyalty is rewarded! Claim daily free credits, spin bonus wheels, and participate in exciting promotions to boost your play."
          />
          <FeatureCard
            icon={<Trophy aria-hidden="true" />}
            title="Compete & Conquer"
            description="Rise through the ranks on our global leaderboards. Showcase your skills, earn bragging rights, and become a Royal Casino legend!"
          />
          <FeatureCard
            icon={<Users aria-hidden="true" />}
            title="Vibrant Social Hub"
            description="Connect with friends, send gifts, celebrate big wins together, and forge new rivalries. Gaming is better with company!"
          />
          <FeatureCard
            icon={<ShieldCheck aria-hidden="true" />}
            title="Safe, Secure & Fair Play"
            description="Your enjoyment and security are paramount. Play with confidence in a fair, transparent, and responsible social gaming environment."
          />
          <FeatureCard
            icon={<LuxuryExperienceIcon aria-hidden="true" />}
            title="A Touch of Luxury"
            description="Immerse yourself in an opulent casino atmosphere, with stunning graphics and captivating soundscapes, all from the comfort of home."
          />
        </div>
      </div>
    </section>
  );
}


import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

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

export default function RoyalJourneySectionContent() {
  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <UserPlus aria-hidden="true" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
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
  );
}

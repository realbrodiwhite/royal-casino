
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

// This component's parent (AnimatedSection) will have 'landing-scroll-section'
export default function FinalCtaSectionContent() {
  return (
    <section className="w-full text-center bg-gradient-to-t from-background via-purple-800/30 to-background flex flex-col flex-grow items-center justify-center">
      <div className="container mx-auto px-4 py-16 sm:py-20">
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
  );
}

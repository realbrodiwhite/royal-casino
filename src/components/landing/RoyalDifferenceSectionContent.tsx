
import React from 'react';
import { Users } from 'lucide-react';

// This component's parent (AnimatedSection) will have 'landing-scroll-section'
// So this component should just define its own content structure.
export default function RoyalDifferenceSectionContent() {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4 py-12 sm:py-16 text-center">
        <Users aria-hidden="true" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary mb-6">
          Discover the Royal Difference: Your Premier Social Casino!
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Welcome to Royal Casino, where the thrill of the casino floor meets the joy of social connection! Play your favorite games purely for fun, challenge friends, climb leaderboards, and enjoy a world-class gaming experience without the pressure of real-money stakes. It's all about entertainment, community, and celebrating those winning moments together.
        </p>
      </div>
    </section>
  );
}

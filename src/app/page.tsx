
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/navbar';
import AnimatedSection from '@/components/utils/AnimatedSection'; // Ensure this path is correct

// Static import for HeroContent as it's above the fold and critical
import HeroContent from '@/components/landing/HeroContent';

// Dynamic imports for sections below the fold
const RoyalDifferenceSectionContent = dynamic(() => import('@/components/landing/RoyalDifferenceSectionContent'));
const GameUniverseSectionContent = dynamic(() => import('@/components/landing/GameUniverseSectionContent'));
const RoyalTreatmentSectionContent = dynamic(() => import('@/components/landing/RoyalTreatmentSectionContent'));
const RoyalJourneySectionContent = dynamic(() => import('@/components/landing/RoyalJourneySectionContent'));
const FinalCtaSectionContent = dynamic(() => import('@/components/landing/FinalCtaSectionContent'));

export default function LandingPage() {
  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <HeroContent />

        <AnimatedSection>
          <RoyalDifferenceSectionContent />
        </AnimatedSection>

        <AnimatedSection delay="delay-150">
          <GameUniverseSectionContent />
        </AnimatedSection>

        <AnimatedSection delay="delay-150">
          <RoyalTreatmentSectionContent />
        </AnimatedSection>

        <AnimatedSection delay="delay-150">
          <RoyalJourneySectionContent />
        </AnimatedSection>

        <AnimatedSection delay="delay-200">
          <FinalCtaSectionContent />
        </AnimatedSection>
      </main>

      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All Rights Reserved.</p>
        <p>For entertainment purposes only. Play responsibly.</p>
      </footer>
    </div>
  );
}

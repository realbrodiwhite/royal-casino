
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/navbar';
import AnimatedSection from '@/components/utils/AnimatedSection'; // Ensure this path is correct

// Static import for HeroContent as it's above the fold and critical
import HeroContent from '@/components/landing/HeroContent';
import { cn } from '@/lib/utils'; // Import cn

// Dynamic imports for sections below the fold
const RoyalDifferenceSectionContent = dynamic(() => import('@/components/landing/RoyalDifferenceSectionContent'));
const GameUniverseSectionContent = dynamic(() => import('@/components/landing/GameUniverseSectionContent'));
const RoyalTreatmentSectionContent = dynamic(() => import('@/components/landing/RoyalTreatmentSectionContent'));
const RoyalJourneySectionContent = dynamic(() => import('@/components/landing/RoyalJourneySectionContent'));
const FinalCtaSectionContent = dynamic(() => import('@/components/landing/FinalCtaSectionContent'));

export default function LandingPage() {
  return (
    <div className="min-h-screen text-foreground flex flex-col overflow-hidden"> {/* Added overflow-hidden to main div to contain fixed height scroll area */}
      <Navbar />

      {/* The main element will be the scroll-snap container */}
      <main className={cn(
        "flex-grow landing-scroll-container"
      )}>
        {/* HeroContent's outermost element is a section, apply class there */}
        <HeroContent className="landing-scroll-section" />

        <AnimatedSection className="landing-scroll-section">
          <RoyalDifferenceSectionContent />
        </AnimatedSection>

        <AnimatedSection className="landing-scroll-section" delay="delay-150">
          <GameUniverseSectionContent />
        </AnimatedSection>

        <AnimatedSection className="landing-scroll-section" delay="delay-150">
          <RoyalTreatmentSectionContent />
        </AnimatedSection>

        <AnimatedSection className="landing-scroll-section" delay="delay-150">
          <RoyalJourneySectionContent />
        </AnimatedSection>

        <AnimatedSection className="landing-scroll-section" delay="delay-200">
          <FinalCtaSectionContent />
        </AnimatedSection>
      </main>

      <footer className="text-center py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground border-t border-border">
        <p>&copy; 2025 Royal Casino. All Rights Reserved. Built By Brodi Inc.</p>
        <p>For entertainment purposes only. Play responsibly.</p>
      </footer>
    </div>
  );
}

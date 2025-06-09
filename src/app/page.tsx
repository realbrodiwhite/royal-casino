
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/navbar';
import AnimatedSection from '@/components/utils/AnimatedSection'; 
import Footer from '@/components/layout/Footer'; 
import NewPlayerOfferBanner from '@/components/layout/NewPlayerOfferBanner'; // Import the new banner

import HeroContent from '@/components/landing/HeroContent';
import { cn } from '@/lib/utils'; 

const RoyalDifferenceSectionContent = dynamic(() => import('@/components/landing/RoyalDifferenceSectionContent'));
const GameUniverseSectionContent = dynamic(() => import('@/components/landing/GameUniverseSectionContent'));
const RoyalTreatmentSectionContent = dynamic(() => import('@/components/landing/RoyalTreatmentSectionContent'));
const RoyalJourneySectionContent = dynamic(() => import('@/components/landing/RoyalJourneySectionContent'));
const FinalCtaSectionContent = dynamic(() => import('@/components/landing/FinalCtaSectionContent'));

export default function LandingPage() {
  return (
    <div className="min-h-screen text-foreground flex flex-col overflow-hidden"> 
      <Navbar />
      <NewPlayerOfferBanner /> {/* Add the banner here */}

      <main className={cn(
        "flex-grow landing-scroll-container"
      )}>
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

      <Footer />
    </div>
  );
}

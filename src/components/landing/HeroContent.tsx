
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export default function HeroContent({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "text-center", // Basic centering for the direct text child
        className // This applies 'landing-scroll-section' which should provide height and flex centering
      )}
      style={{ backgroundColor: 'red', color: 'white', border: '5px solid yellow', padding: '50px' }} // Aggressive inline styles for visibility
    >
      <div
        // The container will primarily handle width constraints and horizontal centering of its children if needed.
        // For this test, the section itself will directly contain the test text.
        className="container mx-auto px-4 h-full flex flex-col items-center justify-center" // Ensure container also tries to fill and center
      >
        <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>
          HERO SECTION TEST - CAN YOU SEE THIS?
        </h1>
        <p style={{ fontSize: '24px', marginTop: '20px' }}>If you see this, the component is rendering within its slot.</p>
      </div>
    </section>
  );
}

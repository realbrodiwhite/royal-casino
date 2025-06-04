
import React from 'react';

const LuxuryExperienceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="luxury gem elegant"
    {...props}
  >
    {/* Stylized Gem / Diamond */}
    <path 
      d="M50 15 L20 40 L50 85 L80 40 Z" 
      stroke="currentColor" 
      strokeWidth="3.5" 
      fill="hsl(var(--primary))" 
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    {/* Facet Lines */}
    <line x1="50" y1="15" x2="50" y2="85" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" opacity="0.6"/>
    <line x1="20" y1="40" x2="80" y2="40" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" opacity="0.6"/>
    <line x1="50" y1="15" x2="35" y2="40" stroke="hsl(var(--primary-foreground))" strokeWidth="1" opacity="0.5"/>
    <line x1="50" y1="15" x2="65" y2="40" stroke="hsl(var(--primary-foreground))" strokeWidth="1" opacity="0.5"/>
    <line x1="50" y1="85" x2="35" y2="40" stroke="hsl(var(--primary-foreground))" strokeWidth="1" opacity="0.5"/>
    <line x1="50" y1="85" x2="65" y2="40" stroke="hsl(var(--primary-foreground))" strokeWidth="1" opacity="0.5"/>

    {/* Subtle Sparkle */}
    <path d="M15 30 L18 25 L21 30 L18 35Z" fill="hsl(var(--foreground))" opacity="0.7" />
    <path d="M85 50 L88 45 L91 50 L88 55Z" fill="hsl(var(--foreground))" opacity="0.7" />
  </svg>
);

export default LuxuryExperienceIcon;

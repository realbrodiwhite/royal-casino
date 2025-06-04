
import React from 'react';

const LuxuryExperienceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="luxury gem elegant"
    {...props}
  >
    {/* Stylized Gem / Diamond */}
    <path 
      d="M50 18 L25 45 L50 82 L75 45 Z" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="hsl(var(--primary))" 
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    {/* Facet Lines */}
    <line x1="50" y1="18" x2="50" y2="82" stroke="hsl(var(--primary-foreground))" strokeWidth="1" opacity="0.5"/>
    <line x1="25" y1="45" x2="75" y2="45" stroke="hsl(var(--primary-foreground))" strokeWidth="1" opacity="0.5"/>
    <line x1="50" y1="18" x2="40" y2="45" stroke="hsl(var(--primary-foreground))" strokeWidth="0.75" opacity="0.4"/>
    <line x1="50" y1="18" x2="60" y2="45" stroke="hsl(var(--primary-foreground))" strokeWidth="0.75" opacity="0.4"/>
    <line x1="50" y1="82" x2="40" y2="45" stroke="hsl(var(--primary-foreground))" strokeWidth="0.75" opacity="0.4"/>
    <line x1="50" y1="82" x2="60" y2="45" stroke="hsl(var(--primary-foreground))" strokeWidth="0.75" opacity="0.4"/>

    {/* Subtle Sparkle */}
    <path d="M18 35 L 20.5 31 L 23 35 L 20.5 39Z" fill="hsl(var(--foreground))" opacity="0.7" />
    <path d="M82 55 L 84.5 51 L 87 55 L 84.5 59Z" fill="hsl(var(--foreground))" opacity="0.7" />
  </svg>
);

export default LuxuryExperienceIcon;

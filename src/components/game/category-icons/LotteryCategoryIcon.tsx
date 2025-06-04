
import React from 'react';

const LotteryCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="lottery balls numbers"
    {...props}
  >
    {/* Ball 1 */}
    <circle cx="32" cy="60" r="14" fill="hsl(var(--primary))" stroke="currentColor" strokeWidth="1.5" />
    <text x="32" y="64.5" fontSize="12" fontWeight="bold" fill="hsl(var(--primary-foreground))" textAnchor="middle">7</text>
    
    {/* Ball 2 - slightly overlapping */}
    <circle cx="50" cy="45" r="14" fill="hsl(var(--secondary))" stroke="currentColor" strokeWidth="1.5"/>
    <text x="50" y="49.5" fontSize="12" fontWeight="bold" fill="hsl(var(--secondary-foreground))" textAnchor="middle">23</text>

    {/* Ball 3 - slightly overlapping */}
    <circle cx="68" cy="60" r="14" fill="hsl(var(--accent))" stroke="currentColor" strokeWidth="1.5"/>
    <text x="68" y="64.5" fontSize="12" fontWeight="bold" fill="hsl(var(--accent-foreground))" textAnchor="middle">42</text>

    {/* Subtle sparkle/shine elements */}
    <path d="M20 38 L 22.5 34 L 25 38 L 22.5 42 Z" fill="hsl(var(--foreground))" opacity="0.6"/>
    <path d="M78 32 L 80.5 28 L 83 32 L 80.5 36 Z" fill="hsl(var(--foreground))" opacity="0.6"/>
  </svg>
);

export default LotteryCategoryIcon;

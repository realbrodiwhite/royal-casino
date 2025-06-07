
import React from 'react';

const BingoCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="bingo card game"
    {...props}
  >
    {/* Card background and border */}
    <rect x="20" y="20" width="60" height="60" rx="4" stroke="hsl(var(--border))" strokeWidth="2.5" fill="hsl(var(--card))" />
    
    {/* Grid lines */}
    <line x1="20" y1="32" x2="80" y2="32" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />
    <line x1="20" y1="44" x2="80" y2="44" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />
    <line x1="20" y1="56" x2="80" y2="56" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />
    <line x1="20" y1="68" x2="80" y2="68" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />

    <line x1="32" y1="20" x2="32" y2="80" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />
    <line x1="44" y1="20" x2="44" y2="80" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />
    <line x1="56" y1="20" x2="56" y2="80" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />
    <line x1="68" y1="20" x2="68" y2="80" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />
    
    {/* BINGO letters */}
    <text x="50" y="15" fontSize="10.5" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="middle">BINGO</text>

    {/* Daubed circles - using primary for most, accent for FREE space */}
    {/* Row 1 */}
    <circle cx="26" cy="26" r="4.5" fill="hsl(var(--primary))" opacity="0.75" />
    <circle cx="38" cy="26" r="4.5" fill="hsl(var(--primary))" opacity="0.5" />
    {/* Row 2 */}
    <circle cx="26" cy="38" r="4.5" fill="hsl(var(--primary))" opacity="0.6" />
    {/* Row 3 - Center (Free Space) */}
    <circle cx="50" cy="50" r="6" fill="hsl(var(--accent))" opacity="1" stroke="hsl(var(--accent-foreground))" strokeWidth="0.5"/>
    <text x="50" y="53.5" fontSize="6" fontWeight="bold" fill="hsl(var(--accent-foreground))" textAnchor="middle">FREE</text>
    
    {/* Other daubs */}
    <circle cx="62" cy="38" r="4.5" fill="hsl(var(--primary))" opacity="0.8" />
    <circle cx="74" cy="62" r="4.5" fill="hsl(var(--primary))" opacity="0.7" />
    <circle cx="38" cy="74" r="4.5" fill="hsl(var(--primary))" opacity="0.85" />
    <circle cx="62" cy="74" r="4.5" fill="hsl(var(--primary))" opacity="0.55" />

  </svg>
);

export default BingoCategoryIcon;

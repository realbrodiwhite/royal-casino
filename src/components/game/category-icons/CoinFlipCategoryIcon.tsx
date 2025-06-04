
import React from 'react';

const CoinFlipCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    data-ai-hint="coin flip chance"
    {...props}
  >
    <circle cx="50" cy="50" r="38" fill="hsl(var(--primary))" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="32" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" opacity="0.6"/>
    
    {/* Stylized representation of Heads/Tails or a glint - simplified */}
    <path d="M38 50 Q50 40 62 50" stroke="hsl(var(--primary-foreground))" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M42 60 Q50 65 58 60" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
    
    {/* Subtle shine */}
    <path d="M68 35 A 18 18 0 0 0 60 32" stroke="hsl(var(--primary-foreground))" strokeWidth="2" fill="none" opacity="0.9"/>
  </svg>
);

export default CoinFlipCategoryIcon;

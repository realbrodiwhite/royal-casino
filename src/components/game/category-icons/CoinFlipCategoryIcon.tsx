
import React from 'react';

const CoinFlipCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="coin flip chance"
    {...props}
  >
    <circle cx="50" cy="50" r="38" fill="hsl(var(--primary))" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="50" r="32" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="2" opacity="0.5"/>
    
    {/* Stylized representation of Heads/Tails or a glint */}
    <path d="M35 50 Q50 35 65 50" stroke="hsl(var(--primary-foreground))" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M38 60 Q50 68 62 60" stroke="hsl(var(--primary-foreground))" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
    
    {/* Subtle shine */}
    <path d="M65 35 A 20 20 0 0 0 55 30" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5" fill="none" opacity="0.9"/>
  </svg>
);

export default CoinFlipCategoryIcon;

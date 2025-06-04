
import React from 'react';

const CoinFlipCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="coin flipping money"
    {...props}
  >
    <circle cx="50" cy="50" r="35" fill="gold" stroke="darkgoldenrod" strokeWidth="3" />
    <text x="50" y="60" fontSize="30" fill="black" textAnchor="middle">$</text>
    {/* Arrow indicating flip/spin */}
    <path d="M20 50 A 30 30 0 0 1 50 20" stroke="currentColor" strokeWidth="3" fill="none" />
    <polygon points="50,15 45,25 55,25" fill="currentColor" />
  </svg>
);

export default CoinFlipCategoryIcon;

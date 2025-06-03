
import React from 'react';

const GoldCoinSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="gold coin"
    {...props}
  >
    <circle cx="50" cy="50" r="40" fill="gold" stroke="darkgoldenrod" strokeWidth="3"/>
    <text x="50" y="60" fontSize="30" textAnchor="middle" fill="black">$</text>
  </svg>
);

export default GoldCoinSymbol;

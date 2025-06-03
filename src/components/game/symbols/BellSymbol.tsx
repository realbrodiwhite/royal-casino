
import React from 'react';

const BellSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="bell symbol"
    {...props}
  >
    <path d="M20 70 Q50 90 80 70 A30 30 0 0 1 20 70 M50 20 L50 30 M40 75 H60 M50 75 V85" stroke="gold" strokeWidth="4" fill="yellow" />
  </svg>
);

export default BellSymbol;

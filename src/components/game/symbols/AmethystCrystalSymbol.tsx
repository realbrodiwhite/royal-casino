
import React from 'react';

const AmethystCrystalSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="purple crystal"
    {...props}
  >
    <polygon points="50,10 30,30 40,80 60,80 70,30" fill="mediumpurple" stroke="indigo" strokeWidth="3"/>
  </svg>
);

export default AmethystCrystalSymbol;

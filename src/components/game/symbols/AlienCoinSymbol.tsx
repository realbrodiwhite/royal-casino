
import React from 'react';

const AlienCoinSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="alien coin"
    {...props}
  >
    <circle cx="50" cy="50" r="35" fill="darkseagreen" stroke="darkolivegreen" strokeWidth="3"/>
    <text x="50" y="65" fontSize="40" textAnchor="middle" fill="black">👽</text>
  </svg>
);

export default AlienCoinSymbol;

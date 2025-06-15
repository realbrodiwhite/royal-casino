
import React from 'react';

const FishSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="tropical fish"
    {...props}
  >
    <text x="25" y="70" fontSize="50">🐠</text>
  </svg>
);

export default FishSymbol;

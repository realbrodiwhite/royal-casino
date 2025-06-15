
import React from 'react';

const GhostSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="spooky ghost"
    {...props}
  >
    <text x="25" y="70" fontSize="50">👻</text>
  </svg>
);

export default GhostSymbol;

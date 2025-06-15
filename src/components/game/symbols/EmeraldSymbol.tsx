
import React from 'react';

const EmeraldSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="green emerald"
    {...props}
  >
    <polygon points="50,15 20,40 50,85 80,40" fill="mediumseagreen" stroke="darkgreen" strokeWidth="3"/>
  </svg>
);

export default EmeraldSymbol;

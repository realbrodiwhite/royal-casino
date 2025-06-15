
import React from 'react';

const PearlSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="shiny pearl"
    {...props}
  >
    <circle cx="50" cy="50" r="30" fill="ivory" stroke="lightgray" strokeWidth="3"/>
    <circle cx="40" cy="40" r="5" fill="white" opacity="0.7"/>
  </svg>
);

export default PearlSymbol;

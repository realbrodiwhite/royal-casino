
import React from 'react';

const RubySymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    data-ai-hint="red ruby"
    {...props}
  >
    <polygon points="50,15 20,40 50,85 80,40" fill="crimson" stroke="darkred" strokeWidth="3"/>
  </svg>
);

export default RubySymbol;

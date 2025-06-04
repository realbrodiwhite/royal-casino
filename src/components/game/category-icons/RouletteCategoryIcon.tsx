
import React from 'react';

const RouletteCategoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    data-ai-hint="roulette wheel casino"
    {...props}
  >
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="50" cy="50" r="10" fill="currentColor" />
    {/* Spokes */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
      <line
        key={angle}
        x1="50"
        y1="50"
        x2={50 + 30 * Math.cos(angle * Math.PI / 180)}
        y2={50 + 30 * Math.sin(angle * Math.PI / 180)}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    ))}
    {/* Ball */}
    <circle cx={50 + 25 * Math.cos(30 * Math.PI / 180)} cy={50 + 25 * Math.sin(30 * Math.PI / 180)} r="4" fill="white" stroke="black" strokeWidth="1"/>
  </svg>
);

export default RouletteCategoryIcon;

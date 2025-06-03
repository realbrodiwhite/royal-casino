
import React from 'react';
import { cn } from '@/lib/utils';

interface GameGridProps {
  rows: number;
  cols: number;
  children: React.ReactNode;
  className?: string;
}

const GameGrid: React.FC<GameGridProps> = ({ rows, cols, children, className }) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: '0.5rem', // Adjust gap as needed
  };

  return (
    <div
      className={cn("aspect-video w-full max-w-md rounded-lg border-2 border-gold p-2 shadow-xl bg-black/30 backdrop-blur-sm", className)}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

export default GameGrid;

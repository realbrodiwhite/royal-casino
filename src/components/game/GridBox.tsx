
import React from 'react';
import { cn } from '@/lib/utils';

interface GridBoxProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isWinningCell?: boolean;
}

const GridBox: React.FC<GridBoxProps> = ({ children, className, onClick, isWinningCell = false }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md bg-background/30 border border-border/50 aspect-square shadow-inner overflow-hidden transition-all duration-300",
        onClick ? "cursor-pointer hover:bg-accent/20" : "",
        isWinningCell && "ring-4 ring-primary ring-offset-2 ring-offset-background bg-primary/20 scale-110 z-10 shadow-lg shadow-primary/50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GridBox;


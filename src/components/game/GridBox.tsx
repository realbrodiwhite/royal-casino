
import React from 'react';
import { cn } from '@/lib/utils';

interface GridBoxProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GridBox: React.FC<GridBoxProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md bg-background/30 border border-border/50 aspect-square shadow-inner overflow-hidden",
        onClick ? "cursor-pointer hover:bg-accent/20" : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GridBox;

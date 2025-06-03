
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
        "flex items-center justify-center rounded-md bg-deep-purple/50 border border-gold/50 aspect-square shadow-inner overflow-hidden",
        onClick ? "cursor-pointer hover:bg-deep-purple/70" : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GridBox;

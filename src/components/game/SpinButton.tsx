
import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

interface SpinButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const SpinButton: React.FC<SpinButtonProps> = ({ isLoading = false, children, ...props }) => {
  return (
    <Button
      variant="default"
      size="lg"
      className="bg-gold text-deep-purple hover:bg-gold/90 font-headline shadow-md w-full md:w-auto"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <RotateCw className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <RotateCw className="mr-2 h-5 w-5" />
      )}
      {children || "Spin"}
    </Button>
  );
};

export default SpinButton;

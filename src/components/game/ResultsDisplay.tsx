
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Award, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsDisplayProps {
  message: string | null;
  isWin: boolean | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ message, isWin }) => {
  if (message === null || isWin === null) {
    return null;
  }

  return (
    <Alert 
      variant={isWin ? "default" : "destructive"} 
      className={cn(
        "my-4",
        isWin ? "bg-primary/10 border-primary/50 text-primary" : "bg-destructive/10 border-destructive/50 text-destructive-foreground"
      )}
    >
      {isWin ? <Award className="h-5 w-5 text-primary" /> : <XCircle className="h-5 w-5 text-destructive-foreground" />}
      <AlertTitle className={isWin ? "text-primary" : "text-destructive-foreground"}>
        {isWin ? "Congratulations!" : "Try Again!"}
      </AlertTitle>
      <AlertDescription className={isWin ? "text-foreground" : "text-destructive-foreground/90"}>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default ResultsDisplay;

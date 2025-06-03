
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Award, XCircle } from 'lucide-react';

interface ResultsDisplayProps {
  message: string | null;
  isWin: boolean | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ message, isWin }) => {
  if (message === null || isWin === null) {
    return null;
  }

  return (
    <Alert variant={isWin ? "default" : "destructive"} className="my-4 bg-opacity-70 backdrop-blur-md">
      {isWin ? <Award className="h-5 w-5 text-gold" /> : <XCircle className="h-5 w-5" />}
      <AlertTitle className={isWin ? "text-gold" : "text-destructive-foreground"}>
        {isWin ? "Congratulations!" : "Try Again!"}
      </AlertTitle>
      <AlertDescription className={isWin ? "text-silver" : ""}>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default ResultsDisplay;

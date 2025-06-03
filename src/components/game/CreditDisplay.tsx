
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from 'lucide-react';

interface CreditDisplayProps {
  initialCredits: number;
}

const CreditDisplay: React.FC<CreditDisplayProps> = ({ initialCredits }) => {
  const [credits, setCredits] = useState(initialCredits);

  useEffect(() => {
    // In a real app, credits would likely be managed by a global state (Context/Redux)
    // or fetched from a backend. For this example, we'll just use local state.
    setCredits(initialCredits);
  }, [initialCredits]);

  return (
    <Card className="bg-opacity-50 backdrop-blur-md border-gold shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gold">
          Credits
        </CardTitle>
        <Coins className="h-5 w-5 text-gold" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-silver">
          {credits.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">
          Your current balance
        </p>
      </CardContent>
    </Card>
  );
};

export default CreditDisplay;

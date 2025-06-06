
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Gem } from 'lucide-react'; // Added Gem icon

interface UserBalanceDisplayProps {
  standardCredits: number;
  premiumCoins?: number;
}

const UserBalanceDisplay: React.FC<UserBalanceDisplayProps> = ({ standardCredits, premiumCoins }) => {
  const [currentStandardCredits, setCurrentStandardCredits] = useState(standardCredits);
  const [currentPremiumCoins, setCurrentPremiumCoins] = useState(premiumCoins);

  useEffect(() => {
    setCurrentStandardCredits(standardCredits);
  }, [standardCredits]);

  useEffect(() => {
    setCurrentPremiumCoins(premiumCoins);
  }, [premiumCoins]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="bg-card border-border shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Credits
          </CardTitle>
          <Coins className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {currentStandardCredits.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Your standard balance
          </p>
        </CardContent>
      </Card>

      {typeof currentPremiumCoins === 'number' && (
        <Card className="bg-card border-accent shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-accent">
              Premium Coins
            </CardTitle>
            <Gem className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {currentPremiumCoins.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Your premium balance
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserBalanceDisplay;

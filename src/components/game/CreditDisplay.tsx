
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Gem, Diamond } from 'lucide-react'; // Added Diamond icon

interface UserBalanceDisplayProps {
  standardCredits: number;
  premiumCoins?: number;
  diamondUserCount?: number; // New prop for Diamond Users
}

const UserBalanceDisplay: React.FC<UserBalanceDisplayProps> = ({ standardCredits, premiumCoins, diamondUserCount }) => {
  const [currentStandardCredits, setCurrentStandardCredits] = useState(standardCredits);
  const [currentPremiumCoins, setCurrentPremiumCoins] = useState(premiumCoins);
  const [currentDiamondUserCount, setCurrentDiamondUserCount] = useState(diamondUserCount);

  useEffect(() => {
    setCurrentStandardCredits(standardCredits);
  }, [standardCredits]);

  useEffect(() => {
    setCurrentPremiumCoins(premiumCoins);
  }, [premiumCoins]);

  useEffect(() => {
    setCurrentDiamondUserCount(diamondUserCount);
  }, [diamondUserCount]);

  const cardCount = [standardCredits, premiumCoins, diamondUserCount].filter(val => typeof val === 'number').length;

  return (
    <div className={`grid grid-cols-1 gap-4 ${cardCount === 3 ? 'md:grid-cols-3' : (cardCount === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1')}`}>
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

      {typeof currentDiamondUserCount === 'number' && (
        <Card className="bg-card border-muted shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Diamond Users
            </CardTitle>
            <Diamond className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {currentDiamondUserCount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Active elite players
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserBalanceDisplay;

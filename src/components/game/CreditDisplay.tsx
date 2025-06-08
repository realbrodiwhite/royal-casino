
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Diamond, UsersRound } from 'lucide-react'; // Updated Diamond to UsersRound for user count

interface UserBalanceDisplayProps {
  credits: number; // Renamed from standardCredits
  kingsCoin?: number; // Renamed from premiumCoins
  diamondUserCount?: number;
}

const UserBalanceDisplay: React.FC<UserBalanceDisplayProps> = ({ credits, kingsCoin, diamondUserCount }) => {
  const [currentCredits, setCurrentCredits] = useState(credits);
  const [currentKingsCoin, setCurrentKingsCoin] = useState(kingsCoin);
  const [currentDiamondUserCount, setCurrentDiamondUserCount] = useState(diamondUserCount);

  useEffect(() => {
    setCurrentCredits(credits);
  }, [credits]);

  useEffect(() => {
    setCurrentKingsCoin(kingsCoin);
  }, [kingsCoin]);

  useEffect(() => {
    setCurrentDiamondUserCount(diamondUserCount);
  }, [diamondUserCount]);

  const cardCount = [credits, kingsCoin, diamondUserCount].filter(val => typeof val === 'number').length;

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
            {currentCredits.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Your standard in-game currency
          </p>
        </CardContent>
      </Card>

      {typeof currentKingsCoin === 'number' && (
        <Card className="bg-card border-accent shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-accent">
              Kings Coin
            </CardTitle>
            <Diamond className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {currentKingsCoin.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Premium currency (1 KC = $1 USD)
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
            <UsersRound className="h-5 w-5 text-muted-foreground" />
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


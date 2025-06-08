
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Diamond, UsersRound, ArrowRightLeft } from 'lucide-react';

interface UserBalanceDisplayProps {
  credits: number;
  kingsCoin?: number;
  diamondUserCount?: number;
  onConvertCredits?: () => void; // Callback for conversion
  canConvert?: boolean; // To enable/disable conversion button
}

const UserBalanceDisplay: React.FC<UserBalanceDisplayProps> = ({
  credits,
  kingsCoin,
  diamondUserCount,
  onConvertCredits,
  canConvert,
}) => {
  const cardCount = [credits, kingsCoin, diamondUserCount].filter(val => typeof val === 'number').length;

  return (
    <div className={`grid grid-cols-1 gap-4 ${cardCount === 3 ? 'md:grid-cols-3' : (cardCount === 2 ? 'sm:grid-cols-2' : 'md:grid-cols-1')}`}>
      <Card className="bg-card border-border shadow-lg flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Credits
          </CardTitle>
          <Coins className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-2xl font-bold text-foreground">
            {credits.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Your standard in-game currency. Earn through play and convert to Kings Coin.
          </p>
        </CardContent>
        {onConvertCredits && typeof kingsCoin === 'number' && ( // Only show convert if kingsCoin is also displayed/managed
          <CardContent className="pt-0 pb-3">
            <Button
              onClick={onConvertCredits}
              disabled={!canConvert}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              <ArrowRightLeft className="mr-1.5 h-3.5 w-3.5" /> Convert 1000 CR to 1 KC
            </Button>
          </CardContent>
        )}
      </Card>

      {typeof kingsCoin === 'number' && (
        <Card className="bg-card border-accent shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-accent">
              Kings Coin
            </CardTitle>
            <Diamond className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {kingsCoin.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Premium currency (1 KC = $1 USD approx. value). Required for certain wagers & features.
            </p>
          </CardContent>
        </Card>
      )}

      {typeof diamondUserCount === 'number' && (
        <Card className="bg-card border-muted shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Diamond Users
            </CardTitle>
            <UsersRound className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {diamondUserCount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active elite players online.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserBalanceDisplay;

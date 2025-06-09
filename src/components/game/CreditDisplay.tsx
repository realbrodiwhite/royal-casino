
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from 'lucide-react'; // Removed Diamond, UsersRound, ArrowRightLeft

interface UserBalanceDisplayProps {
  credits: number;
  // Removed kingsCoin, diamondUserCount, onConvertCredits, canConvert
}

const UserBalanceDisplay: React.FC<UserBalanceDisplayProps> = ({
  credits,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4"> {/* Simplified grid */}
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
            Your in-game currency. Earn through play and use for games & items.
          </p>
        </CardContent>
        {/* Conversion button and related logic removed */}
      </Card>

      {/* Kings Coin card removed */}
      {/* Diamond Users card removed */}
    </div>
  );
};

export default UserBalanceDisplay;

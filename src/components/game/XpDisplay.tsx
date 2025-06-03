
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface XpDisplayProps {
  experiencePoints: number;
}

const XpDisplay: React.FC<XpDisplayProps> = ({ experiencePoints }) => {
  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-primary">
          Experience Points
        </CardTitle>
        <Star className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {experiencePoints.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">
          XP earned this session
        </p>
      </CardContent>
    </Card>
  );
};

export default XpDisplay;

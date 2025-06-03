
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Coins, UserCog } from 'lucide-react';

export default function AdminDashboardPage() {
  const [userId, setUserId] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const { toast } = useToast();

  const handleAddCredits = () => {
    if (!userId || !creditAmount) {
      toast({
        title: "Error",
        description: "Please enter both User ID and Credit Amount.",
        variant: "destructive",
      });
      return;
    }
    const amount = parseInt(creditAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid positive credit amount.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, you would call an API to update user credits.
    console.log(`Adding ${amount} credits to user ${userId}`);
    toast({
      title: "Success",
      description: `Successfully added ${amount} credits to user ${userId}. (Mock Action)`,
    });
    setUserId('');
    setCreditAmount('');
  };

  const handleSetCredits = () => {
    if (!userId || creditAmount === '') { // Allow 0 for setting credits
      toast({
        title: "Error",
        description: "Please enter both User ID and Credit Amount.",
        variant: "destructive",
      });
      return;
    }
    const amount = parseInt(creditAmount);
    if (isNaN(amount) || amount < 0) { // Allow 0 for setting credits
      toast({
        title: "Error",
        description: "Please enter a valid non-negative credit amount.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, you would call an API to update user credits.
    console.log(`Setting credits for user ${userId} to ${amount}`);
    toast({
      title: "Success",
      description: `Successfully set credits for user ${userId} to ${amount}. (Mock Action)`,
    });
    setUserId('');
    setCreditAmount('');
  };


  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold font-headline text-gold">Admin Dashboard</h1>
          <p className="text-xl text-silver mt-2">Manage users, games, and platform settings.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-silver/10 border-gold">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <UserCog className="mr-2 h-6 w-6" /> User Credit Management
              </CardTitle>
              <CardDescription className="text-silver/80">
                Add or set credits for a user.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId" className="text-silver">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="bg-deep-purple/50 border-gold text-silver placeholder:text-silver/60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creditAmount" className="text-silver">Credit Amount</Label>
                <Input
                  id="creditAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  className="bg-deep-purple/50 border-gold text-silver placeholder:text-silver/60"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleAddCredits} variant="outline" className="border-gold text-gold hover:bg-gold/10">
                <Coins className="mr-2 h-4 w-4"/> Add Credits
              </Button>
              <Button onClick={handleSetCredits} className="bg-gold text-deep-purple hover:bg-gold/90">
                Set Credits
              </Button>
            </CardFooter>
          </Card>

          {/* Placeholder for Game Stats Analysis */}
          <Card className="bg-silver/10 border-gold">
            <CardHeader>
              <CardTitle className="text-gold">Game Stats Analysis</CardTitle>
              <CardDescription className="text-silver/80">
                View game performance and RTP. (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-silver">Detailed game analytics will be available here.</p>
            </CardContent>
          </Card>

          {/* Placeholder for AI Pattern Recognition Tool */}
           <Card className="bg-silver/10 border-gold">
            <CardHeader>
              <CardTitle className="text-gold">AI Pattern Recognition</CardTitle>
              <CardDescription className="text-silver/80">
                Analyze player patterns. (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-silver">AI tools for analyzing game data will be integrated here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-silver/70">
        <p>&copy; {new Date().getFullYear()} Royal Casino Admin Panel.</p>
      </footer>
    </div>
  );
}


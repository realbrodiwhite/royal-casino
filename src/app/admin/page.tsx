
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Coins, UserCog, BarChart2, Brain } from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

type AdminView = 'userManagement' | 'gameStats' | 'aiTools';

export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState<AdminView>('userManagement');
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
    console.log(`Adding ${amount} credits to user ${userId}`);
    toast({
      title: "Success",
      description: `Successfully added ${amount} credits to user ${userId}. (Mock Action)`,
    });
    setUserId('');
    setCreditAmount('');
  };

  const handleSetCredits = () => {
    if (!userId || creditAmount === '') {
      toast({
        title: "Error",
        description: "Please enter both User ID and Credit Amount.",
        variant: "destructive",
      });
      return;
    }
    const amount = parseInt(creditAmount);
    if (isNaN(amount) || amount < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid non-negative credit amount.",
        variant: "destructive",
      });
      return;
    }
    console.log(`Setting credits for user ${userId} to ${amount}`);
    toast({
      title: "Success",
      description: `Successfully set credits for user ${userId} to ${amount}. (Mock Action)`,
    });
    setUserId('');
    setCreditAmount('');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'userManagement':
        return (
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
        );
      case 'gameStats':
        return (
          <Card className="bg-silver/10 border-gold">
            <CardHeader>
              <CardTitle className="text-gold flex items-center"><BarChart2 className="mr-2 h-6 w-6" />Game Stats Analysis</CardTitle>
              <CardDescription className="text-silver/80">
                View game performance and RTP. (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-silver">Detailed game analytics will be available here.</p>
            </CardContent>
          </Card>
        );
      case 'aiTools':
        return (
          <Card className="bg-silver/10 border-gold">
            <CardHeader>
              <CardTitle className="text-gold flex items-center"><Brain className="mr-2 h-6 w-6" />AI Pattern Recognition</CardTitle>
              <CardDescription className="text-silver/80">
                Analyze player patterns. (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-silver">AI tools for analyzing game data will be integrated here.</p>
            </CardContent>
          </Card>
        );
      default:
        return <p className="text-silver">Select an option from the sidebar.</p>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsible="icon" variant="sidebar" className="border-r border-gold/20 bg-deep-purple/90 text-silver">
            <SidebarContent className="p-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeView === 'userManagement'}
                    onClick={() => setActiveView('userManagement')}
                    tooltip="User Management"
                    className="text-silver hover:bg-gold/10 hover:text-gold data-[active=true]:bg-gold/20 data-[active=true]:text-gold"
                  >
                    <UserCog />
                    <span>User Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeView === 'gameStats'}
                    onClick={() => setActiveView('gameStats')}
                    tooltip="Game Stats"
                    className="text-silver hover:bg-gold/10 hover:text-gold data-[active=true]:bg-gold/20 data-[active=true]:text-gold"
                  >
                    <BarChart2 />
                    <span>Game Stats</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeView === 'aiTools'}
                    onClick={() => setActiveView('aiTools')}
                    tooltip="AI Tools"
                    className="text-silver hover:bg-gold/10 hover:text-gold data-[active=true]:bg-gold/20 data-[active=true]:text-gold"
                  >
                    <Brain />
                    <span>AI Tools</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 overflow-y-auto">
            <main className="container mx-auto px-4 py-8">
              <header className="mb-8 flex items-center justify-between">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-gold">Admin Dashboard</h1>
                <SidebarTrigger className="md:hidden text-gold border-gold hover:bg-gold/10" />
              </header>
              <div className="space-y-6">
                {renderContent()}
              </div>
            </main>
            <footer className="text-center py-6 text-sm text-silver/70 border-t border-gold/20">
              <p>&copy; {new Date().getFullYear()} Royal Casino Admin Panel.</p>
            </footer>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

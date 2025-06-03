
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
    console.log(\`Adding \${amount} credits to user \${userId}\`);
    toast({
      title: "Success",
      description: \`Successfully added \${amount} credits to user \${userId}. (Mock Action)\`,
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
    console.log(\`Setting credits for user \${userId} to \${amount}\`);
    toast({
      title: "Success",
      description: \`Successfully set credits for user \${userId} to \${amount}. (Mock Action)\`,
    });
    setUserId('');
    setCreditAmount('');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'userManagement':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <UserCog className="mr-2 h-6 w-6" /> User Credit Management
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Add or set credits for a user.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId" className="text-foreground">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creditAmount" className="text-foreground">Credit Amount</Label>
                <Input
                  id="creditAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleAddCredits} variant="outline">
                <Coins className="mr-2 h-4 w-4"/> Add Credits
              </Button>
              <Button onClick={handleSetCredits} variant="default">
                Set Credits
              </Button>
            </CardFooter>
          </Card>
        );
      case 'gameStats':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary flex items-center"><BarChart2 className="mr-2 h-6 w-6" />Game Stats Analysis</CardTitle>
              <CardDescription className="text-muted-foreground">
                View game performance and RTP. (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">Detailed game analytics will be available here.</p>
            </CardContent>
          </Card>
        );
      case 'aiTools':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary flex items-center"><Brain className="mr-2 h-6 w-6" />AI Pattern Recognition</CardTitle>
              <CardDescription className="text-muted-foreground">
                Analyze player patterns. (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">AI tools for analyzing game data will be integrated here.</p>
            </CardContent>
          </Card>
        );
      default:
        return <p className="text-foreground">Select an option from the sidebar.</p>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsible="icon" variant="sidebar" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
            <SidebarContent className="p-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeView === 'userManagement'}
                    onClick={() => setActiveView('userManagement')}
                    tooltip="User Management"
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
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Admin Dashboard</h1>
                <SidebarTrigger className="md:hidden text-primary border-primary hover:bg-accent/10" />
              </header>
              <div className="space-y-6">
                {renderContent()}
              </div>
            </main>
            <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
              <p>&copy; {new Date().getFullYear()} Royal Casino Admin Panel.</p>
            </footer>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

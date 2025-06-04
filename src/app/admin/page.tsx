
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Coins, UserCog, BarChart2, Brain, Settings, UsersRound, Percent, Search, BarChartHorizontalBig, LineChart, TrendingUp, UserPlus, Clock, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

type AdminView = 'userManagement' | 'analytics' | 'settings' | 'aiTools';

interface GameSetting {
  id: string;
  name: string;
  currentRTP: number;
}

const initialGameSettings: GameSetting[] = [
  { id: 'classic-slots', name: 'Classic Fruit Slots', currentRTP: 96.5 },
  { id: 'vegas-adventure', name: 'Vegas Adventure Slots', currentRTP: 95.8 },
  { id: 'horrific-halloween', name: 'Horrific Halloween Slots', currentRTP: 96.1 },
  { id: 'video-poker', name: 'Video Poker', currentRTP: 97.2 },
  { id: 'bingo', name: 'Bingo', currentRTP: 90.0 },
  { id: 'coin-flip', name: 'Coin Flip', currentRTP: 99.0 },
  { id: 'scratchers', name: 'Scratchers', currentRTP: 85.0 },
];

export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState<AdminView>('analytics');
  const [userId, setUserId] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const { toast } = useToast();

  const [gameSettings, setGameSettings] = useState<GameSetting[]>(initialGameSettings);
  const [rtpInputs, setRtpInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialRtpInputs: Record<string, string> = {};
    gameSettings.forEach(game => {
      initialRtpInputs[game.id] = game.currentRTP.toString();
    });
    setRtpInputs(initialRtpInputs);
  }, [gameSettings]);

  const handleAddCredits = () => {
    if (!userId || !creditAmount) {
      toast({ title: "Error", description: "Please enter User ID and Credit Amount.", variant: "destructive" });
      return;
    }
    const amount = parseInt(creditAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Error", description: "Please enter a valid positive credit amount.", variant: "destructive" });
      return;
    }
    console.log(`Adding ${amount} credits to user ${userId}`);
    toast({ title: "Success", description: `Successfully added ${amount} credits to user ${userId}. (Mock Action)` });
    setUserId('');
    setCreditAmount('');
  };

  const handleSetCredits = () => {
    if (!userId || creditAmount === '') {
      toast({ title: "Error", description: "Please enter User ID and Credit Amount.", variant: "destructive" });
      return;
    }
    const amount = parseInt(creditAmount);
    if (isNaN(amount) || amount < 0) {
      toast({ title: "Error", description: "Please enter a valid non-negative credit amount.", variant: "destructive" });
      return;
    }
    console.log(`Setting credits for user ${userId} to ${amount}`);
    toast({ title: "Success", description: `Successfully set credits for user ${userId} to ${amount}. (Mock Action)` });
    setUserId('');
    setCreditAmount('');
  };

  const handleRtpInputChange = (gameId: string, value: string) => {
    setRtpInputs(prev => ({ ...prev, [gameId]: value }));
  };

  const handleUpdateRtp = (gameId: string) => {
    const newRtpString = rtpInputs[gameId];
    const newRtp = parseFloat(newRtpString);

    if (isNaN(newRtp) || newRtp < 0 || newRtp > 100) {
      toast({ title: "Error", description: "Please enter a valid RTP between 0 and 100.", variant: "destructive" });
      return;
    }

    setGameSettings(prevSettings =>
      prevSettings.map(game =>
        game.id === gameId ? { ...game, currentRTP: newRtp } : game
      )
    );
    toast({ title: "RTP Updated (Mock)", description: `RTP for game ${gameSettings.find(g => g.id === gameId)?.name} set to ${newRtp}%.` });
  };


  const renderContent = () => {
    switch (activeView) {
      case 'userManagement':
        return (
            <Tabs defaultValue="creditManagement" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
                <TabsTrigger value="creditManagement">Credit Management</TabsTrigger>
                <TabsTrigger value="accountActions">Account Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="creditManagement">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center text-xl sm:text-2xl">
                      <UserCog className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> User Credit Management
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm sm:text-base">
                      Add or set credits for a user.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userId" className="text-foreground">User ID</Label>
                      <Input
                        id="userId" type="text" placeholder="Enter user ID" value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creditAmount" className="text-foreground">Credit Amount</Label>
                      <Input
                        id="creditAmount" type="number" placeholder="Enter amount" value={creditAmount}
                        onChange={(e) => setCreditAmount(e.target.value)}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
                    <Button onClick={handleAddCredits} variant="outline" className="w-full sm:w-auto">
                      <Coins className="mr-2 h-4 w-4"/> Add Credits
                    </Button>
                    <Button onClick={handleSetCredits} variant="default" className="w-full sm:w-auto">
                      Set Credits
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="accountActions">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center text-xl sm:text-2xl">
                      <UserCog className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> User Account Actions
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm sm:text-base">
                      Manage user accounts (e.g., view details, ban, etc.). (Coming Soon)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground">Functionality to view user details, ban users, reset passwords (if applicable), etc., will be available here.</p>
                    <div className="flex items-center gap-2">
                        <Input type="text" placeholder="Search User ID or Email..." className="bg-input border-border text-foreground placeholder:text-muted-foreground"/>
                        <Button variant="outline"><Search className="h-4 w-4"/></Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
        );
      case 'analytics':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary flex items-center text-xl sm:text-2xl">
                <LineChart className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Analytics Dashboard
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base">
                Explore game and user performance metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="gameAnalytics" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="gameAnalytics">Game Analytics</TabsTrigger>
                  <TabsTrigger value="userAnalytics">User Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="gameAnalytics" className="mt-2">
                  <Card className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="text-primary flex items-center text-lg sm:text-xl">
                        <BarChart2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Game Performance
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                        Key metrics and trends for all casino games.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Spins Today</h4>
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-primary">125,670</p>
                            </div>
                             <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Avg. RTP (Overall)</h4>
                                <p className="text-xl sm:text-2xl font-bold text-primary">96.2%</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Most Popular Game</h4>
                                <p className="text-lg sm:text-xl font-semibold text-primary truncate">Vegas Adventure</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Highest Win Today</h4>
                                <p className="text-xl sm:text-2xl font-bold text-primary">5,000 CR</p>
                            </div>
                        </div>
                        <div className="mt-6 p-4 border border-dashed border-border/70 rounded-lg bg-background/30 text-center">
                            <BarChartHorizontalBig className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Game Play Count (Placeholder)</p>
                        </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="userAnalytics" className="mt-2">
                   <Card className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="text-primary flex items-center text-lg sm:text-xl">
                        <UsersRound className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> User Insights
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                        Analyze user behavior, demographics, and engagement.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Input type="text" placeholder="Search User ID or Email..." className="bg-input border-border text-foreground placeholder:text-muted-foreground"/>
                            <Button variant="outline"><Search className="h-4 w-4"/></Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                           <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Active Users (24h)</h4>
                                    <UsersRound className="h-4 w-4 text-blue-500" />
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-primary">850</p>
                            </div>
                           <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                               <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">New Signups (Today)</h4>
                                    <UserPlus className="h-4 w-4 text-green-500" />
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-primary">45</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Avg. Session</h4>
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-primary">25 min</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Top Spender (Today)</h4>
                                    <Award className="h-4 w-4 text-primary" />
                                 </div>
                                <p className="text-lg sm:text-xl font-semibold text-primary truncate">UID123 (500 CR)</p>
                            </div>
                        </div>
                         <div className="mt-6 p-4 border border-dashed border-border/70 rounded-lg bg-background/30 text-center">
                            <LineChart className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">User Activity Over Time (Placeholder)</p>
                        </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        );
      case 'settings':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary flex items-center text-xl sm:text-2xl">
                <Settings className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Game Settings & RTP
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base">
                Modify the Return-To-Player (RTP) for each game.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {gameSettings.map(game => (
                <div key={game.id} className="p-4 border border-border/50 rounded-md bg-background/30">
                  <h3 className="text-lg font-semibold text-primary mb-2">{game.name}</h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor={`rtp-${game.id}`} className="text-foreground">Current RTP: {game.currentRTP}%</Label>
                      <div className="flex items-center">
                        <Input
                          id={`rtp-${game.id}`}
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={rtpInputs[game.id] || ''}
                          onChange={(e) => handleRtpInputChange(game.id, e.target.value)}
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground w-32"
                        />
                        <Percent className="ml-2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <Button onClick={() => handleUpdateRtp(game.id)} variant="secondary" size="sm" className="mt-2 sm:mt-0 self-start sm:self-center">
                      Update RTP
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground">Changes are mock and not persisted.</p>
            </CardFooter>
          </Card>
        );
      case 'aiTools':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary flex items-center text-xl sm:text-2xl">
                <Brain className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> AI Pattern Recognition
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base">
                Analyze player patterns using AI to enhance game profitability and enjoyment. (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">AI tools for analyzing game data and player behavior will be integrated here.</p>
              <Button variant="default" disabled>Run Player Pattern Analysis (Mock)</Button>
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
                    isActive={activeView === 'analytics'}
                    onClick={() => setActiveView('analytics')}
                    tooltip="Analytics Dashboard"
                  >
                    <LineChart />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
                    isActive={activeView === 'settings'}
                    onClick={() => setActiveView('settings')}
                    tooltip="Game Settings & RTP"
                  >
                    <Settings />
                    <span>Settings</span>
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
            <main className="container mx-auto px-4 py-6 sm:py-8">
              <header className="mb-6 sm:mb-8 flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Admin Dashboard</h1>
                <SidebarTrigger className="md:hidden text-primary border-primary hover:bg-accent/10" />
              </header>
              <div className="space-y-6">
                {renderContent()}
              </div>
            </main>
            <footer className="text-center py-4 sm:py-6 text-xs sm:text-sm text-muted-foreground border-t border-border">
              <p>&copy; {new Date().getFullYear()} Royal Casino. All Rights Reserved.</p>
            </footer>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

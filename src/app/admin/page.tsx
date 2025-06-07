
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Coins, UserCog, BarChart2, Brain, Settings, UsersRound, Percent, Search, BarChartHorizontalBig, LineChart, TrendingUp, UserPlus, Clock, Award, Gem, ShieldAlert, ShieldCheck, KeyRound, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

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

interface FoundUserDetails {
  id: string;
  email: string;
  joinDate: string;
  lastLogin: string;
  isBanned: boolean;
  standardCredits: number;
  premiumCoins: number;
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

// Mock user data for demonstration
const mockUsers: Record<string, FoundUserDetails> = {
  "player123": {
    id: "player123",
    email: "player@example.com",
    joinDate: "2023-05-15",
    lastLogin: "2024-07-28 10:30 AM",
    isBanned: false,
    standardCredits: 1500,
    premiumCoins: 75,
  },
  "adminUser": {
    id: "adminUser",
    email: "admin@royalcasino.dev",
    joinDate: "2023-01-01",
    lastLogin: "2024-07-29 09:00 AM",
    isBanned: false,
    standardCredits: 99999,
    premiumCoins: 1000,
  },
  "bannedUser456": {
    id: "bannedUser456",
    email: "trouble@example.com",
    joinDate: "2023-10-20",
    lastLogin: "2024-06-01 14:00 PM",
    isBanned: true,
    standardCredits: 50,
    premiumCoins: 0,
  }
};


export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState<AdminView>('userManagement');
  const [currencyUserId, setCurrencyUserId] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [premiumCoinAmount, setPremiumCoinAmount] = useState('');
  const { toast } = useToast();

  const [gameSettings, setGameSettings] = useState<GameSetting[]>(initialGameSettings);
  const [rtpInputs, setRtpInputs] = useState<Record<string, string>>({});

  // State for Account Actions tab
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [foundUserDetails, setFoundUserDetails] = useState<FoundUserDetails | null>(null);


  useEffect(() => {
    const initialRtpInputs: Record<string, string> = {};
    gameSettings.forEach(game => {
      initialRtpInputs[game.id] = game.currentRTP.toString();
    });
    setRtpInputs(initialRtpInputs);
  }, [gameSettings]);

  const handleAddCurrency = () => {
    if (!currencyUserId) {
      toast({ title: "Error", description: "Please enter a User ID for currency management.", variant: "destructive" });
      return;
    }
    const stdCredits = parseInt(creditAmount);
    const premCoins = parseInt(premiumCoinAmount);

    if ((isNaN(stdCredits) || stdCredits <= 0) && (isNaN(premCoins) || premCoins <= 0)) {
      toast({ title: "Error", description: "Please enter a valid positive amount for Standard Credits or Premium Coins.", variant: "destructive" });
      return;
    }

    let messages = [];
    if (!isNaN(stdCredits) && stdCredits > 0) {
      // Mock action: console.log(`Adding ${stdCredits} standard credits to user ${currencyUserId}`);
      messages.push(`${stdCredits} standard credits`);
    }
    if (!isNaN(premCoins) && premCoins > 0) {
      // Mock action: console.log(`Adding ${premCoins} premium coins to user ${currencyUserId}`);
      messages.push(`${premCoins} premium coins`);
    }

    toast({ title: "Success (Mock)", description: `Successfully added ${messages.join(' and ')} to user ${currencyUserId}.` });
    setCurrencyUserId('');
    setCreditAmount('');
    setPremiumCoinAmount('');
  };

  const handleSetCurrency = () => {
     if (!currencyUserId) {
      toast({ title: "Error", description: "Please enter a User ID for currency management.", variant: "destructive" });
      return;
    }
    const stdCredits = creditAmount !== '' ? parseInt(creditAmount) : NaN;
    const premCoins = premiumCoinAmount !== '' ? parseInt(premiumCoinAmount) : NaN;

    if (isNaN(stdCredits) && isNaN(premCoins) ) {
       toast({ title: "Error", description: "Please enter an amount for Standard Credits or Premium Coins.", variant: "destructive" });
      return;
    }
    if (!isNaN(stdCredits) && stdCredits < 0) {
         toast({ title: "Error", description: "Standard Credit amount must be non-negative.", variant: "destructive" });
        return;
    }
    if (!isNaN(premCoins) && premCoins < 0) {
        toast({ title: "Error", description: "Premium Coin amount must be non-negative.", variant: "destructive" });
        return;
    }

    let messages = [];
    if (!isNaN(stdCredits)) {
      // Mock action: console.log(`Setting standard credits for user ${currencyUserId} to ${stdCredits}`);
      messages.push(`standard credits to ${stdCredits}`);
    }
    if (!isNaN(premCoins)) {
      // Mock action: console.log(`Setting premium coins for user ${currencyUserId} to ${premCoins}`);
      messages.push(`premium coins to ${premCoins}`);
    }
    toast({ title: "Success (Mock)", description: `Successfully set ${messages.join(' and ')} for user ${currencyUserId}.` });
    setCurrencyUserId('');
    setCreditAmount('');
    setPremiumCoinAmount('');
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

  const handleSearchUser = () => {
    if (!searchUserQuery.trim()) {
      toast({ title: "Search Error", description: "Please enter a User ID or Email to search.", variant: "destructive" });
      setFoundUserDetails(null);
      return;
    }
    // Mock search logic
    const foundUser = mockUsers[searchUserQuery.trim().toLowerCase()] || Object.values(mockUsers).find(u => u.email.toLowerCase() === searchUserQuery.trim().toLowerCase());

    if (foundUser) {
      setFoundUserDetails(foundUser);
      toast({ title: "User Found", description: `Displaying details for ${foundUser.id}.` });
    } else {
      setFoundUserDetails(null);
      toast({ title: "User Not Found", description: `No user found with query: "${searchUserQuery}".`, variant: "destructive" });
    }
  };

  const handleToggleBanUser = () => {
    if (foundUserDetails) {
      const updatedStatus = !foundUserDetails.isBanned;
      // Update mock local data for persistence during session
      mockUsers[foundUserDetails.id].isBanned = updatedStatus;
      setFoundUserDetails(prev => prev ? { ...prev, isBanned: updatedStatus } : null);
      toast({
        title: `User ${updatedStatus ? 'Banned' : 'Unbanned'} (Mock)`,
        description: `${foundUserDetails.email} has been ${updatedStatus ? 'banned' : 'unbanned'}.`,
      });
    }
  };

  const handleResetPassword = () => {
    if (foundUserDetails) {
      toast({
        title: "Password Reset (Mock)",
        description: `A password reset link would be sent to ${foundUserDetails.email}.`,
      });
    }
  };

  const handleViewFullDetails = () => {
     if (foundUserDetails) {
      toast({
        title: "View Full Details (Mock)",
        description: `Navigating to full profile/details page for ${foundUserDetails.id}. (This is a placeholder action)`,
      });
    }
  };


  const renderContent = () => {
    switch (activeView) {
      case 'userManagement':
        return (
            <Tabs defaultValue="currencyManagement" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
                <TabsTrigger value="currencyManagement">Currency Management</TabsTrigger>
                <TabsTrigger value="accountActions">Account Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="currencyManagement">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center text-xl sm:text-2xl">
                      <UserCog className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> User Currency Management
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm sm:text-base">
                      Add or set Standard Credits and Premium Coins for a user. All actions are mock.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currencyUserId" className="text-foreground">User ID</Label>
                      <Input
                        id="currencyUserId" type="text" placeholder="Enter user ID" value={currencyUserId}
                        onChange={(e) => setCurrencyUserId(e.target.value)}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creditAmount" className="text-foreground flex items-center"><Coins className="mr-1 h-4 w-4 text-primary" /> Standard Credit Amount</Label>
                      <Input
                        id="creditAmount" type="number" placeholder="Enter amount" value={creditAmount}
                        onChange={(e) => setCreditAmount(e.target.value)}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="premiumCoinAmount" className="text-foreground flex items-center"><Gem className="mr-1 h-4 w-4 text-accent" /> Premium Coin Amount</Label>
                      <Input
                        id="premiumCoinAmount" type="number" placeholder="Enter amount" value={premiumCoinAmount}
                        onChange={(e) => setPremiumCoinAmount(e.target.value)}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
                    <Button onClick={handleAddCurrency} variant="outline" className="w-full sm:w-auto">
                      Add Currency
                    </Button>
                    <Button onClick={handleSetCurrency} variant="default" className="w-full sm:w-auto">
                      Set Currency
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
                      Search for users, view their status, and perform account actions. All actions are mock.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Search User ID or Email..."
                            value={searchUserQuery}
                            onChange={(e) => setSearchUserQuery(e.target.value)}
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground flex-grow"
                        />
                        <Button variant="outline" onClick={handleSearchUser}><Search className="h-4 w-4"/></Button>
                    </div>

                    {foundUserDetails && (
                      <Card className="bg-background/50 border-border/50 p-4">
                        <CardHeader className="p-0 pb-3 mb-3 border-b border-border/30">
                            <CardTitle className="text-lg text-primary flex items-center justify-between">
                                <span>{foundUserDetails.email} ({foundUserDetails.id})</span>
                                 <Badge variant={foundUserDetails.isBanned ? "destructive" : "secondary"} className="ml-2 text-xs">
                                    {foundUserDetails.isBanned ? 'Banned' : 'Active'}
                                 </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2 text-sm">
                           <div className="flex justify-between">
                                <span className="text-muted-foreground">Joined:</span>
                                <span className="text-foreground">{foundUserDetails.joinDate}</span>
                           </div>
                           <div className="flex justify-between">
                                <span className="text-muted-foreground">Last Login:</span>
                                <span className="text-foreground">{foundUserDetails.lastLogin}</span>
                           </div>
                           <div className="flex justify-between">
                                <span className="text-muted-foreground">Std. Credits:</span>
                                <span className="text-foreground">{foundUserDetails.standardCredits.toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between">
                                <span className="text-muted-foreground">Prem. Coins:</span>
                                <span className="text-foreground">{foundUserDetails.premiumCoins.toLocaleString()}</span>
                           </div>
                        </CardContent>
                        <CardFooter className="p-0 pt-4 mt-4 border-t border-border/30 flex flex-wrap gap-2 justify-end">
                            <Button onClick={handleViewFullDetails} variant="ghost" size="sm" className="text-primary">
                                <Eye className="mr-1 h-4 w-4"/> View Full Details
                            </Button>
                            <Button onClick={handleToggleBanUser} variant={foundUserDetails.isBanned ? "secondary" : "destructive"} size="sm">
                                {foundUserDetails.isBanned ? <ShieldCheck className="mr-1 h-4 w-4"/> : <ShieldAlert className="mr-1 h-4 w-4"/>}
                                {foundUserDetails.isBanned ? "Unban User" : "Ban User"}
                            </Button>
                             <Button onClick={handleResetPassword} variant="outline" size="sm">
                                <KeyRound className="mr-1 h-4 w-4"/> Reset Password
                            </Button>
                        </CardFooter>
                      </Card>
                    )}
                    {!foundUserDetails && searchUserQuery && (
                        <p className="text-muted-foreground text-center">Try searching for "player123", "adminUser", or "bannedUser456".</p>
                    )}

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
                Explore game and user performance metrics. (Placeholder Data)
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
                Modify the Return-To-Player (RTP) for each game. All actions are mock.
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
        <div className="flex flex-1 overflow-hidden pt-[calc(32px+56px)] sm:pt-[calc(36px+56px)]"> {/* Push content below ExpBar + Navbar */}
          <Sidebar collapsible="icon" variant="sidebar" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground fixed top-[calc(32px+56px)] sm:top-[calc(36px+56px)] h-[calc(100vh-32px-56px)] sm:h-[calc(100vh-36px-56px)]"> {/* Adjust fixed positioning and height */}
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

          <SidebarInset className="flex-1 overflow-y-auto ml-[var(--sidebar-width-icon)] group-data-[state=expanded]:ml-[var(--sidebar-width)] transition-all duration-200 ease-linear"> {/* Adjust margin for collapsed/expanded sidebar */}
            <main className="container mx-auto px-4 py-6 sm:py-8">
              <header className="mb-6 sm:mb-8 flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Admin Dashboard</h1>
                <SidebarTrigger className="md:hidden text-primary border-primary hover:bg-accent/10" />
              </header>
              <div className="space-y-6">
                {renderContent()}
              </div>
            </main>
            <footer className="text-center py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground border-t border-border">
              <p>&copy; {new Date().getFullYear()} Royal Casino. All Rights Reserved.</p>
            </footer>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}


      

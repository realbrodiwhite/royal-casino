
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Coins, UserCog, BarChart2, Brain, Settings, UsersRound, Percent, Search, BarChartHorizontalBig, LineChart, TrendingUp, UserPlus, Clock, Award, Diamond, ShieldAlert, ShieldCheck, KeyRound, Eye } from 'lucide-react';
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

type AdminView = 'userManagement' | 'analytics' | 'aiTools'; // Removed 'settings' as it was only RTP

interface FoundUserDetails {
  id: string;
  email: string;
  joinDate: string;
  lastLogin: string;
  isBanned: boolean;
  credits: number;
  kingsCoin: number;
}

// Mock user data for demonstration
const mockUsers: Record<string, FoundUserDetails> = {
  "player123": {
    id: "player123",
    email: "player@example.com",
    joinDate: "2023-05-15",
    lastLogin: "2024-07-28 10:30 AM",
    isBanned: false,
    credits: 1500,
    kingsCoin: 75,
  },
  "adminUser": {
    id: "adminUser",
    email: "admin@royalcasino.dev",
    joinDate: "2023-01-01",
    lastLogin: "2024-07-29 09:00 AM",
    isBanned: false,
    credits: 99999,
    kingsCoin: 1000,
  },
  "bannedUser456": {
    id: "bannedUser456",
    email: "trouble@example.com",
    joinDate: "2023-10-20",
    lastLogin: "2024-06-01 14:00 PM",
    isBanned: true,
    credits: 50,
    kingsCoin: 0,
  }
};


export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState<AdminView>('analytics'); // Default to analytics
  const [currencyUserId, setCurrencyUserId] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [kingsCoinAmount, setKingsCoinAmount] = useState('');
  const { toast } = useToast();

  // State for Account Actions tab
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [foundUserDetails, setFoundUserDetails] = useState<FoundUserDetails | null>(null);


  const handleAddCurrency = () => {
    if (!currencyUserId) {
      toast({ title: "Error", description: "Please enter a User ID for currency management.", variant: "destructive" });
      return;
    }
    const _credits = parseInt(creditAmount);
    const _kingsCoin = parseInt(kingsCoinAmount);

    if ((isNaN(_credits) || _credits <= 0) && (isNaN(_kingsCoin) || _kingsCoin <= 0)) {
      toast({ title: "Error", description: "Please enter a valid positive amount for Credits or Kings Coin.", variant: "destructive" });
      return;
    }

    let messages = [];
    if (!isNaN(_credits) && _credits > 0) {
      messages.push(`${_credits} credits`);
    }
    if (!isNaN(_kingsCoin) && _kingsCoin > 0) {
      messages.push(`${_kingsCoin} Kings Coin`);
    }

    toast({ title: "Success (Mock)", description: `Successfully added ${messages.join(' and ')} to user ${currencyUserId}.` });
    setCurrencyUserId('');
    setCreditAmount('');
    setKingsCoinAmount('');
  };

  const handleSetCurrency = () => {
     if (!currencyUserId) {
      toast({ title: "Error", description: "Please enter a User ID for currency management.", variant: "destructive" });
      return;
    }
    const _credits = creditAmount !== '' ? parseInt(creditAmount) : NaN;
    const _kingsCoin = kingsCoinAmount !== '' ? parseInt(kingsCoinAmount) : NaN;

    if (isNaN(_credits) && isNaN(_kingsCoin) ) {
       toast({ title: "Error", description: "Please enter an amount for Credits or Kings Coin.", variant: "destructive" });
      return;
    }
    if (!isNaN(_credits) && _credits < 0) {
         toast({ title: "Error", description: "Credit amount must be non-negative.", variant: "destructive" });
        return;
    }
    if (!isNaN(_kingsCoin) && _kingsCoin < 0) {
        toast({ title: "Error", description: "Kings Coin amount must be non-negative.", variant: "destructive" });
        return;
    }

    let messages = [];
    if (!isNaN(_credits)) {
      messages.push(`credits to ${_credits}`);
    }
    if (!isNaN(_kingsCoin)) {
      messages.push(`Kings Coin to ${_kingsCoin}`);
    }
    toast({ title: "Success (Mock)", description: `Successfully set ${messages.join(' and ')} for user ${currencyUserId}.` });
    setCurrencyUserId('');
    setCreditAmount('');
    setKingsCoinAmount('');
  };

  const handleSearchUser = () => {
    if (!searchUserQuery.trim()) {
      toast({ title: "Search Error", description: "Please enter a User ID or Email to search.", variant: "destructive" });
      setFoundUserDetails(null);
      return;
    }
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
      mockUsers[foundUserDetails.id].isBanned = updatedStatus; // Update mock data
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
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-4 sm:mb-6">
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
                      Add or set Credits and Kings Coin for a user. All actions are mock.
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
                      <Label htmlFor="creditAmount" className="text-foreground flex items-center"><Coins className="mr-1 h-4 w-4 text-primary" /> Credit Amount</Label>
                      <Input
                        id="creditAmount" type="number" placeholder="Enter amount" value={creditAmount}
                        onChange={(e) => setCreditAmount(e.target.value)}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="kingsCoinAmount" className="text-foreground flex items-center"><Diamond className="mr-1 h-4 w-4 text-accent" /> Kings Coin Amount</Label>
                      <Input
                        id="kingsCoinAmount" type="number" placeholder="Enter amount" value={kingsCoinAmount}
                        onChange={(e) => setKingsCoinAmount(e.target.value)}
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
                                <span className="text-muted-foreground">Credits:</span>
                                <span className="text-foreground">{foundUserDetails.credits.toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between">
                                <span className="text-muted-foreground">Kings Coin:</span>
                                <span className="text-foreground">{foundUserDetails.kingsCoin.toLocaleString()}</span>
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
                Explore game and user performance metrics. (Placeholder Data for Social Play)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="gameAnalytics" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-4">
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
                                    <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Plays Today</h4>
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-primary">125,670</p>
                            </div>
                             <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Avg. Credits Won/Play</h4>
                                <p className="text-xl sm:text-2xl font-bold text-primary">8.5 CR</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Most Popular Game</h4>
                                <p className="text-lg sm:text-xl font-semibold text-primary truncate">Vegas Adventure</p>
                            </div>
                            <div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm">
                                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Highest Credit Win Today</h4>
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
                                    <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Top KC Spender (Today)</h4>
                                    <Award className="h-4 w-4 text-primary" />
                                 </div>
                                <p className="text-lg sm:text-xl font-semibold text-primary truncate">UID123 (500 KC)</p> 
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
      case 'aiTools':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary flex items-center text-xl sm:text-2xl">
                <Brain className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> AI Pattern Recognition
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base">
                Analyze player patterns using AI to enhance game enjoyment and balance. (Coming Soon)
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
        <div className="flex flex-1 overflow-hidden pt-[calc(32px+56px)] sm:pt-[calc(36px+56px)]">
          <Sidebar collapsible="icon" variant="sidebar" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground fixed top-[calc(32px+56px)] sm:top-[calc(36px+56px)] h-[calc(100vh-32px-56px)] sm:h-[calc(100vh-36px-56px)]">
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
                {/* Removed Settings/RTP tab from sidebar */}
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

          <SidebarInset className="flex-1 overflow-y-auto ml-[var(--sidebar-width-icon)] group-data-[state=expanded]:ml-[var(--sidebar-width)] transition-all duration-200 ease-linear">
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
              <p>&copy; 2025 Royal Casino. All Rights Reserved. Built By Brodi Inc.</p>
            </footer>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

    
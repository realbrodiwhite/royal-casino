

"use client";

// DESIGN NOTE: Each tab's content within this admin page should ideally fit
// within a single viewport height to avoid internal scrolling of the main content area.
// If lists (like vouchers) become very long, consider pagination within the card/table.

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Coins, UserCog, LineChart, Brain, UsersRound, Search, BarChartHorizontalBig, Eye, ShieldAlert, ShieldCheck, KeyRound, Ticket, PlusCircle, ListChecks, Trash2, Edit3, ToggleLeft, ToggleRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';

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

import type { Voucher, VoucherRewardType, VoucherUsageLimitType } from '@/types/vouchers';
import { allShopItems, type ShopItem } from '@/game-data/items'; // Import shop items

type AdminView = 'userManagement' | 'analytics' | 'aiTools' | 'voucherManagement';

interface FoundUserDetails {
  id: string;
  email: string;
  joinDate: string;
  lastLogin: string;
  isBanned: boolean;
  credits: number;
}

const mockUsers: Record<string, FoundUserDetails> = {
  "player123": { id: "player123", email: "player@example.com", joinDate: "2023-05-15", lastLogin: "2024-07-28 10:30 AM", isBanned: false, credits: 1500 },
  "adminUser": { id: "adminUser", email: "admin@royalcasino.dev", joinDate: "2023-01-01", lastLogin: "2024-07-29 09:00 AM", isBanned: false, credits: 99999 },
  "bannedUser456": { id: "bannedUser456", email: "trouble@example.com", joinDate: "2023-10-20", lastLogin: "2024-06-01 14:00 PM", isBanned: true, credits: 50 }
};

// Mock voucher storage
const initialMockVouchers: Voucher[] = [
    {
        id: 'promo100',
        code: 'WELCOME100',
        description: 'Welcome bonus for new players',
        reward: { type: 'credits', amount: 100 },
        usageLimit: { type: 'once_per_user' },
        redemptionCount: 5,
        redeemedBy: { 'userA': {userId: 'userA', redeemedAt: new Date().toISOString()}},
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'itemgift',
        code: 'FREEBREW',
        description: 'Free Craft Brew item',
        reward: { type: 'item', itemId: 'beer_rtp_boost', itemName: allShopItems.find(i => i.id === 'beer_rtp_boost')?.name || 'Craft Brew' },
        usageLimit: { type: 'limited_total', maxRedemptions: 50, enforceOncePerUserWithGlobalLimit: true },
        redemptionCount: 10,
        redeemedBy: {},
        isActive: true,
        createdAt: new Date().toISOString(),
    }
];


export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState<AdminView>('analytics');
  const [currencyUserId, setCurrencyUserId] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const { toast } = useToast();
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [foundUserDetails, setFoundUserDetails] = useState<FoundUserDetails | null>(null);

  // Voucher state
  const [vouchers, setVouchers] = useState<Voucher[]>(initialMockVouchers);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDescription, setVoucherDescription] = useState('');
  const [voucherRewardType, setVoucherRewardType] = useState<VoucherRewardType>('credits');
  const [voucherCreditAmount, setVoucherCreditAmount] = useState<number | string>(100);
  const [voucherItemId, setVoucherItemId] = useState<string>('');
  const [voucherUsageLimitType, setVoucherUsageLimitType] = useState<VoucherUsageLimitType>('once_per_user');
  const [voucherMaxRedemptions, setVoucherMaxRedemptions] = useState<number | string>(100);
  const [voucherAllowedUserIds, setVoucherAllowedUserIds] = useState('');
  const [voucherEnforceOncePerUser, setVoucherEnforceOncePerUser] = useState(true);


  const generateRandomCode = (length = 8) => {
    return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
  };

  const handleGenerateVoucherCode = () => {
    setVoucherCode(generateRandomCode());
  };

  const handleCreateVoucher = () => {
    if (!voucherCode.trim()) {
      toast({ title: "Error", description: "Voucher code cannot be empty.", variant: "destructive" });
      return;
    }
    if (vouchers.some(v => v.code.toUpperCase() === voucherCode.trim().toUpperCase())) {
      toast({ title: "Error", description: "This voucher code already exists.", variant: "destructive" });
      return;
    }
     if (!voucherDescription.trim()) {
      toast({ title: "Error", description: "Voucher description cannot be empty.", variant: "destructive" });
      return;
    }

    let reward: Voucher['reward'];
    if (voucherRewardType === 'credits') {
      const amount = typeof voucherCreditAmount === 'string' ? parseInt(voucherCreditAmount, 10) : voucherCreditAmount;
      if (isNaN(amount) || amount <= 0) {
        toast({ title: "Error", description: "Credit amount must be a positive number.", variant: "destructive" });
        return;
      }
      reward = { type: 'credits', amount };
    } else {
      if (!voucherItemId) {
        toast({ title: "Error", description: "Please select an item for the reward.", variant: "destructive" });
        return;
      }
      const selectedShopItem = allShopItems.find(item => item.id === voucherItemId);
      reward = { type: 'item', itemId: voucherItemId, itemName: selectedShopItem?.name || 'Unknown Item' };
    }

    let usageLimit: Voucher['usageLimit'];
    const userIdsArray = voucherAllowedUserIds.split(',').map(id => id.trim()).filter(id => id);

    switch (voucherUsageLimitType) {
        case 'specific_users_once':
            if (userIdsArray.length === 0) {
                toast({ title: "Error", description: "Please specify at least one User ID for 'Specific Users' limit type.", variant: "destructive" });
                return;
            }
            usageLimit = { type: 'specific_users_once', allowedUserIds: userIdsArray };
            break;
        case 'limited_total':
            const maxRed = typeof voucherMaxRedemptions === 'string' ? parseInt(voucherMaxRedemptions, 10) : voucherMaxRedemptions;
            if (isNaN(maxRed) || maxRed <= 0) {
                toast({ title: "Error", description: "Max redemptions must be a positive number for 'Limited Total'.", variant: "destructive" });
                return;
            }
            usageLimit = { type: 'limited_total', maxRedemptions: maxRed, enforceOncePerUserWithGlobalLimit: voucherEnforceOncePerUser };
            break;
        case 'once_per_user':
            usageLimit = { type: 'once_per_user' };
            break;
        case 'unlimited_total':
        default:
             usageLimit = { type: 'unlimited_total' }; // Can still be once per user effectively
             break;
    }


    const newVoucher: Voucher = {
      id: generateRandomCode(10), // Unique ID for the voucher itself
      code: voucherCode.trim().toUpperCase(),
      description: voucherDescription.trim(),
      reward,
      usageLimit,
      redemptionCount: 0,
      redeemedBy: {},
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setVouchers(prev => [newVoucher, ...prev]);
    toast({ title: "Success", description: `Voucher "${newVoucher.code}" created.` });
    
    // Reset form
    setVoucherCode('');
    setVoucherDescription('');
    setVoucherRewardType('credits');
    setVoucherCreditAmount(100);
    setVoucherItemId('');
    setVoucherUsageLimitType('once_per_user');
    setVoucherMaxRedemptions(100);
    setVoucherAllowedUserIds('');
    setVoucherEnforceOncePerUser(true);
  };

  const handleToggleVoucherStatus = (voucherId: string) => {
    setVouchers(prevVouchers =>
      prevVouchers.map(v =>
        v.id === voucherId ? { ...v, isActive: !v.isActive } : v
      )
    );
    const voucher = vouchers.find(v => v.id === voucherId);
    toast({
      title: `Voucher ${voucher?.isActive ? 'Deactivated' : 'Activated'}`,
      description: `Voucher code ${voucher?.code} is now ${voucher?.isActive ? 'inactive' : 'active'}.`,
    });
  };
  
  const handleDeleteVoucher = (voucherId: string) => {
    const voucher = vouchers.find(v => v.id === voucherId);
    // Add confirmation dialog here in a real app
    setVouchers(prevVouchers => prevVouchers.filter(v => v.id !== voucherId));
    toast({
      title: "Voucher Deleted",
      description: `Voucher code ${voucher?.code} has been deleted.`,
      variant: "destructive"
    });
  };


  const handleAddCurrency = () => {
    if (!currencyUserId) {
      toast({ title: "Error", description: "Please enter a User ID for currency management.", variant: "destructive" });
      return;
    }
    const _credits = parseInt(creditAmount);
    if (isNaN(_credits) || _credits <= 0) {
      toast({ title: "Error", description: "Please enter a valid positive amount for Credits.", variant: "destructive" });
      return;
    }
    toast({ title: "Success (Mock)", description: `Successfully added ${_credits} credits to user ${currencyUserId}.` });
    setCurrencyUserId('');
    setCreditAmount('');
  };

  const handleSetCurrency = () => {
     if (!currencyUserId) {
      toast({ title: "Error", description: "Please enter a User ID for currency management.", variant: "destructive" });
      return;
    }
    const _credits = creditAmount !== '' ? parseInt(creditAmount) : NaN;
    if (isNaN(_credits)) {
       toast({ title: "Error", description: "Please enter an amount for Credits.", variant: "destructive" });
      return;
    }
    if (_credits < 0) {
         toast({ title: "Error", description: "Credit amount must be non-negative.", variant: "destructive" });
        return;
    }
    toast({ title: "Success (Mock)", description: `Successfully set credits to ${_credits} for user ${currencyUserId}.` });
    setCurrencyUserId('');
    setCreditAmount('');
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
      mockUsers[foundUserDetails.id].isBanned = updatedStatus; 
      setFoundUserDetails(prev => prev ? { ...prev, isBanned: updatedStatus } : null);
      toast({ title: `User ${updatedStatus ? 'Banned' : 'Unbanned'} (Mock)`, description: `${foundUserDetails.email} has been ${updatedStatus ? 'banned' : 'unbanned'}.` });
    }
  };

  const handleResetPassword = () => {
    if (foundUserDetails) {
      toast({ title: "Password Reset (Mock)", description: `A password reset link would be sent to ${foundUserDetails.email}.` });
    }
  };

  const handleViewFullDetails = () => {
     if (foundUserDetails) {
      toast({ title: "View Full Details (Mock)", description: `Navigating to full profile/details page for ${foundUserDetails.id}. (This is a placeholder action)`});
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
                  <CardHeader><CardTitle className="text-primary flex items-center text-xl sm:text-2xl"><UserCog className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> User Currency Management</CardTitle><CardDescription className="text-muted-foreground text-sm sm:text-base">Add or set Credits for a user. All actions are mock.</CardDescription></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2"><Label htmlFor="currencyUserId" className="text-foreground">User ID</Label><Input id="currencyUserId" type="text" placeholder="Enter user ID" value={currencyUserId} onChange={(e) => setCurrencyUserId(e.target.value)} className="bg-input border-border text-foreground placeholder:text-muted-foreground"/></div>
                    <div className="space-y-2"><Label htmlFor="creditAmount" className="text-foreground flex items-center"><Coins className="mr-1 h-4 w-4 text-primary" /> Credit Amount</Label><Input id="creditAmount" type="number" placeholder="Enter amount" value={creditAmount} onChange={(e) => setCreditAmount(e.target.value)} className="bg-input border-border text-foreground placeholder:text-muted-foreground"/></div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-end gap-2"><Button onClick={handleAddCurrency} variant="outline" className="w-full sm:w-auto">Add Credits</Button><Button onClick={handleSetCurrency} variant="default" className="w-full sm:w-auto">Set Credits</Button></CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="accountActions">
                <Card className="bg-card border-border">
                  <CardHeader><CardTitle className="text-primary flex items-center text-xl sm:text-2xl"><UserCog className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> User Account Actions</CardTitle><CardDescription className="text-muted-foreground text-sm sm:text-base">Search for users, view their status, and perform account actions. All actions are mock.</CardDescription></CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-2"><Input type="text" placeholder="Search User ID or Email..." value={searchUserQuery} onChange={(e) => setSearchUserQuery(e.target.value)} className="bg-input border-border text-foreground placeholder:text-muted-foreground flex-grow"/><Button variant="outline" onClick={handleSearchUser}><Search className="h-4 w-4"/></Button></div>
                    {foundUserDetails && (
                      <Card className="bg-background/50 border-border/50 p-4">
                        <CardHeader className="p-0 pb-3 mb-3 border-b border-border/30"><CardTitle className="text-lg text-primary flex items-center justify-between"><span>{foundUserDetails.email} ({foundUserDetails.id})</span><Badge variant={foundUserDetails.isBanned ? "destructive" : "secondary"} className="ml-2 text-xs">{foundUserDetails.isBanned ? 'Banned' : 'Active'}</Badge></CardTitle></CardHeader>
                        <CardContent className="p-0 space-y-2 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Joined:</span><span className="text-foreground">{foundUserDetails.joinDate}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Last Login:</span><span className="text-foreground">{foundUserDetails.lastLogin}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Credits:</span><span className="text-foreground">{foundUserDetails.credits.toLocaleString()}</span></div></CardContent>
                        <CardFooter className="p-0 pt-4 mt-4 border-t border-border/30 flex flex-wrap gap-2 justify-end"><Button onClick={handleViewFullDetails} variant="ghost" size="sm" className="text-primary"><Eye className="mr-1 h-4 w-4"/> View Full Details</Button><Button onClick={handleToggleBanUser} variant={foundUserDetails.isBanned ? "secondary" : "destructive"} size="sm">{foundUserDetails.isBanned ? <ShieldCheck className="mr-1 h-4 w-4"/> : <ShieldAlert className="mr-1 h-4 w-4"/>}{foundUserDetails.isBanned ? "Unban User" : "Ban User"}</Button><Button onClick={handleResetPassword} variant="outline" size="sm"><KeyRound className="mr-1 h-4 w-4"/> Reset Password</Button></CardFooter>
                      </Card>
                    )}
                    {!foundUserDetails && searchUserQuery && (<p className="text-muted-foreground text-center">Try searching for "player123", "adminUser", or "bannedUser456".</p>)}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
        );
      case 'analytics':
        return (
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-primary flex items-center text-xl sm:text-2xl"><LineChart className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Analytics Dashboard</CardTitle><CardDescription className="text-muted-foreground text-sm sm:text-base">Explore game and user performance metrics. (Placeholder Data for Social Play)</CardDescription></CardHeader>
            <CardContent>
              <Tabs defaultValue="gameAnalytics" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-4"><TabsTrigger value="gameAnalytics">Game Analytics</TabsTrigger><TabsTrigger value="userAnalytics">User Analytics</TabsTrigger></TabsList>
                <TabsContent value="gameAnalytics" className="mt-2">
                  <Card className="bg-card border-border/50">
                    <CardHeader><CardTitle className="text-primary flex items-center text-lg sm:text-xl"><LineChart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Game Performance</CardTitle><CardDescription className="text-muted-foreground text-xs sm:text-sm">Key metrics and trends for all casino games.</CardDescription></CardHeader>
                    <CardContent className="space-y-6"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm"><div className="flex items-center justify-between mb-1"><h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Plays Today</h4><Coins className="h-4 w-4 text-green-500" /></div><p className="text-xl sm:text-2xl font-bold text-primary">125,670</p></div><div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm"><h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Avg. Credits Won/Play</h4><p className="text-xl sm:text-2xl font-bold text-primary">8.5 CR</p></div><div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm"><h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Most Popular Game</h4><p className="text-lg sm:text-xl font-semibold text-primary truncate">Vegas Adventure</p></div><div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm"><h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Highest Credit Win Today</h4><p className="text-xl sm:text-2xl font-bold text-primary">5,000 CR</p></div></div><div className="mt-6 p-4 border border-dashed border-border/70 rounded-lg bg-background/30 text-center"><BarChartHorizontalBig className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">Game Play Count (Placeholder)</p></div></CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="userAnalytics" className="mt-2">
                   <Card className="bg-card border-border/50">
                    <CardHeader><CardTitle className="text-primary flex items-center text-lg sm:text-xl"><UsersRound className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> User Insights</CardTitle><CardDescription className="text-muted-foreground text-xs sm:text-sm">Analyze user behavior, demographics, and engagement.</CardDescription></CardHeader>
                    <CardContent className="space-y-6"><div className="flex items-center gap-2 mb-4"><Input type="text" placeholder="Search User ID or Email..." className="bg-input border-border text-foreground placeholder:text-muted-foreground"/><Button variant="outline"><Search className="h-4 w-4"/></Button></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm"><div className="flex items-center justify-between mb-1"><h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Active Users (24h)</h4><UsersRound className="h-4 w-4 text-blue-500" /></div><p className="text-xl sm:text-2xl font-bold text-primary">850</p></div><div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm"><div className="flex items-center justify-between mb-1"><h4 className="text-xs sm:text-sm font-medium text-muted-foreground">New Signups (Today)</h4><UsersRound className="h-4 w-4 text-green-500" /></div><p className="text-xl sm:text-2xl font-bold text-primary">45</p></div><div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm"><div className="flex items-center justify-between mb-1"><h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Avg. Session</h4><Coins className="h-4 w-4 text-yellow-500" /></div><p className="text-xl sm:text-2xl font-bold text-primary">25 min</p></div><div className="p-3 sm:p-4 bg-input/50 rounded-lg border border-border/60 shadow-sm"><div className="flex items-center justify-between mb-1"><h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Top Credit Earner (Today)</h4><Coins className="h-4 w-4 text-primary" /></div><p className="text-lg sm:text-xl font-semibold text-primary truncate">UID123 (500 CR)</p></div></div><div className="mt-6 p-4 border border-dashed border-border/70 rounded-lg bg-background/30 text-center"><LineChart className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">User Activity Over Time (Placeholder)</p></div></CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        );
      case 'aiTools':
        return (
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-primary flex items-center text-xl sm:text-2xl"><Brain className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> AI Pattern Recognition</CardTitle><CardDescription className="text-muted-foreground text-sm sm:text-base">Analyze player patterns using AI to enhance game enjoyment and balance. (Coming Soon)</CardDescription></CardHeader>
            <CardContent className="space-y-4"><p className="text-foreground">AI tools for analyzing game data and player behavior will be integrated here.</p><Button variant="default" disabled>Run Player Pattern Analysis (Mock)</Button></CardContent>
          </Card>
        );
      case 'voucherManagement':
        return (
            <div className="space-y-6">
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-primary flex items-center text-xl sm:text-2xl">
                            <PlusCircle className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Create New Voucher
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-sm sm:text-base">
                            Define a new voucher code and its properties.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="voucherCode" className="text-foreground">Voucher Code</Label>
                                <div className="flex gap-2">
                                <Input id="voucherCode" type="text" placeholder="e.g., FREESPIN10" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value.toUpperCase())} className="bg-input border-border text-foreground placeholder:text-muted-foreground"/>
                                <Button variant="outline" onClick={handleGenerateVoucherCode}>Generate</Button>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="voucherDescription" className="text-foreground">Description (Admin Only)</Label>
                                <Input id="voucherDescription" type="text" placeholder="Purpose of this voucher" value={voucherDescription} onChange={(e) => setVoucherDescription(e.target.value)} className="bg-input border-border text-foreground placeholder:text-muted-foreground"/>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="voucherRewardType" className="text-foreground">Reward Type</Label>
                                <Select value={voucherRewardType} onValueChange={(value) => setVoucherRewardType(value as VoucherRewardType)}>
                                    <SelectTrigger className="bg-input border-border text-foreground"><SelectValue placeholder="Select reward type" /></SelectTrigger>
                                    <SelectContent><SelectItem value="credits">Credits</SelectItem><SelectItem value="item">Shop Item</SelectItem></SelectContent>
                                </Select>
                            </div>
                            {voucherRewardType === 'credits' && (
                                <div className="space-y-2">
                                    <Label htmlFor="voucherCreditAmount" className="text-foreground">Credit Amount</Label>
                                    <Input id="voucherCreditAmount" type="number" placeholder="e.g., 100" value={voucherCreditAmount} onChange={(e) => setVoucherCreditAmount(e.target.value === '' ? '' : parseInt(e.target.value, 10))} className="bg-input border-border text-foreground placeholder:text-muted-foreground"/>
                                </div>
                            )}
                            {voucherRewardType === 'item' && (
                                <div className="space-y-2">
                                    <Label htmlFor="voucherItemId" className="text-foreground">Shop Item</Label>
                                    <Select value={voucherItemId} onValueChange={setVoucherItemId}>
                                        <SelectTrigger className="bg-input border-border text-foreground"><SelectValue placeholder="Select item" /></SelectTrigger>
                                        <SelectContent>
                                            {allShopItems.map(item => <SelectItem key={item.id} value={item.id}>{item.name} (Cost: {item.cost} Cr)</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="voucherUsageLimitType" className="text-foreground">Usage Limit Type</Label>
                                <Select value={voucherUsageLimitType} onValueChange={(value) => setVoucherUsageLimitType(value as VoucherUsageLimitType)}>
                                    <SelectTrigger className="bg-input border-border text-foreground"><SelectValue placeholder="Select usage limit" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="once_per_user">Once Per User (Global)</SelectItem>
                                        <SelectItem value="limited_total">Limited Total Redemptions</SelectItem>
                                        <SelectItem value="unlimited_total">Unlimited Total Redemptions (Still Once Per User)</SelectItem>
                                        <SelectItem value="specific_users_once">Specific Users Only (Once Per User)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {voucherUsageLimitType === 'limited_total' && (
                                <div className="space-y-2">
                                    <Label htmlFor="voucherMaxRedemptions" className="text-foreground">Max Total Redemptions</Label>
                                    <Input id="voucherMaxRedemptions" type="number" placeholder="e.g., 1000" value={voucherMaxRedemptions} onChange={(e) => setVoucherMaxRedemptions(e.target.value === '' ? '' : parseInt(e.target.value, 10))} className="bg-input border-border text-foreground placeholder:text-muted-foreground"/>
                                     <div className="flex items-center space-x-2 pt-1">
                                        <Checkbox id="enforceOncePerUserWithGlobalLimit" checked={voucherEnforceOncePerUser} onCheckedChange={(checked) => setVoucherEnforceOncePerUser(!!checked)} />
                                        <Label htmlFor="enforceOncePerUserWithGlobalLimit" className="text-xs text-muted-foreground">Also enforce once per user for this global limit?</Label>
                                    </div>
                                </div>
                            )}
                        </div>
                         {voucherUsageLimitType === 'specific_users_once' && (
                            <div className="space-y-2">
                                <Label htmlFor="voucherAllowedUserIds" className="text-foreground">Allowed User IDs (comma-separated)</Label>
                                <Input id="voucherAllowedUserIds" type="text" placeholder="user1,user2,user3" value={voucherAllowedUserIds} onChange={(e) => setVoucherAllowedUserIds(e.target.value)} className="bg-input border-border text-foreground placeholder:text-muted-foreground"/>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button onClick={handleCreateVoucher} variant="default">Create Voucher</Button>
                    </CardFooter>
                </Card>

                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-primary flex items-center text-xl sm:text-2xl">
                            <ListChecks className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Existing Vouchers
                        </CardTitle>
                         <CardDescription className="text-muted-foreground text-sm sm:text-base">
                            Manage and view created voucher codes. Click code/status to toggle active state.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {vouchers.length === 0 ? (
                            <p className="text-muted-foreground text-center">No vouchers created yet.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Reward</TableHead>
                                        <TableHead>Usage / Limit</TableHead>
                                        <TableHead>Redeemed</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vouchers.map(voucher => (
                                        <TableRow key={voucher.id}>
                                            <TableCell className="font-medium">
                                                <Button variant="link" className="p-0 h-auto text-primary hover:underline" onClick={() => handleToggleVoucherStatus(voucher.id)}>
                                                    {voucher.code}
                                                </Button>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground max-w-xs truncate">{voucher.description}</TableCell>
                                            <TableCell>
                                                {voucher.reward.type === 'credits' ? `${voucher.reward.amount} Credits` : `Item: ${voucher.reward.itemName || voucher.reward.itemId}`}
                                            </TableCell>
                                            <TableCell className="text-xs">
                                                {voucher.usageLimit.type === 'once_per_user' && 'Once per user'}
                                                {voucher.usageLimit.type === 'unlimited_total' && 'Unlimited (Once per user)'}
                                                {voucher.usageLimit.type === 'limited_total' && `Limited: ${voucher.usageLimit.maxRedemptions} total ${voucher.usageLimit.enforceOncePerUserWithGlobalLimit ? '(also 1/user)' : ''}`}
                                                {voucher.usageLimit.type === 'specific_users_once' && `Specific Users: ${voucher.usageLimit.allowedUserIds?.join(', ') || 'N/A'}`}
                                            </TableCell>
                                            <TableCell>{voucher.redemptionCount}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge 
                                                    variant={voucher.isActive ? "secondary" : "destructive"} 
                                                    className="cursor-pointer"
                                                    onClick={() => handleToggleVoucherStatus(voucher.id)}
                                                >
                                                    {voucher.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right space-x-1">
                                                {/* <Button variant="ghost" size="icon" className="h-7 w-7"><Edit3 className="h-4 w-4"/></Button> */}
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDeleteVoucher(voucher.id)}><Trash2 className="h-4 w-4"/></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
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
                  <SidebarMenuButton isActive={activeView === 'analytics'} onClick={() => setActiveView('analytics')} tooltip="Analytics Dashboard"><LineChart /><span>Analytics</span></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activeView === 'userManagement'} onClick={() => setActiveView('userManagement')} tooltip="User Management"><UserCog /><span>User Management</span></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activeView === 'voucherManagement'} onClick={() => setActiveView('voucherManagement')} tooltip="Voucher Management"><Ticket /><span>Vouchers</span></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activeView === 'aiTools'} onClick={() => setActiveView('aiTools')} tooltip="AI Tools"><Brain /><span>AI Tools</span></SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 overflow-y-auto ml-[var(--sidebar-width-icon)] group-data-[state=expanded]:ml-[var(--sidebar-width)] transition-all duration-200 ease-linear">
            <main className="container mx-auto px-4 py-6 sm:py-8">
              <header className="mb-6 sm:mb-8 flex items-center justify-between"><h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">Admin Dashboard</h1><SidebarTrigger className="md:hidden text-primary border-primary hover:bg-accent/10" /></header>
              <div className="space-y-6">{renderContent()}</div>
            </main>
            <footer className="text-center py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground border-t border-border"><p>&copy; 2025 Royal Casino. All Rights Reserved. Built By Brodi Inc.</p></footer>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}


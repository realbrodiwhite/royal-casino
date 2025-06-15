
"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import FriendListItem, { type Friend as FriendType } from '@/components/user/FriendListItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, Trophy, Gamepad2, Star, MessageSquare, ShieldAlert } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const genericAvatars = [
  "/images/avatars/avatar-generic-1.svg",
  "/images/avatars/avatar-generic-2.svg",
  "/images/avatars/avatar-generic-3.svg",
];

const allMockUsers: Record<string, any> = {
  "user123": { 
    id: "user123",
    name: "Player One",
    avatarUrl: "/images/avatars/avatar-player-one.svg", 
    joinDate: "January 15, 2023",
    bio: "Loves playing slots and poker. Always up for a challenge!",
    level: 12,
    achievements: [
      { id: 'slots_master', name: 'Slots Master', icon: <Gamepad2 className="h-4 w-4" /> },
      { id: 'poker_pro', name: 'Poker Pro', icon: <Gamepad2 className="h-4 w-4" /> },
      { id: 'big_winner', name: 'Big Winner', icon: <Trophy className="h-4 w-4" /> },
    ],
    gameStats: {
      slotsPlayed: 1250,
      pokerHandsWon: 340,
      totalWinnings: 56700,
    },
    friendIds: ["friend1", "friend2", "friend3", "friend4", "friend5"],
    topFriendIds: ["friend2", "friend4", "friend1"],
  },
  "friend1": {
    id: "friend1",
    name: "CasinoKing",
    avatarUrl: genericAvatars[0 % genericAvatars.length],
    joinDate: "March 10, 2022",
    bio: "High roller and slots enthusiast. Aiming for the top!",
    level: 15,
    achievements: [{ id: 'high_roller', name: 'High Roller', icon: <Gamepad2 className="h-4 w-4" /> }],
    gameStats: { slotsPlayed: 2500, pokerHandsWon: 100, totalWinnings: 150000 },
    friendIds: ["user123", "friend2"],
    topFriendIds: ["friend2"],
  },
   "friend2": {
    id: "friend2",
    name: "LadyLuck",
    avatarUrl: genericAvatars[1 % genericAvatars.length],
    joinDate: "June 22, 2023",
    bio: "Bingo is my game, luck is my name!",
    level: 20,
    achievements: [{ id: 'bingo_champ', name: 'Bingo Champion', icon: <Gamepad2 className="h-4 w-4" /> }],
    gameStats: { slotsPlayed: 500, pokerHandsWon: 50, totalWinnings: 75000 },
    friendIds: ["user123", "friend1", "friend4"],
    topFriendIds: ["user123", "friend4"],
  },
   "friend3": {
    id: "friend3",
    name: "PokerFace",
    avatarUrl: genericAvatars[2 % genericAvatars.length],
    joinDate: "September 1, 2023",
    bio: "Master of the bluff. See you at the poker table.",
    level: 10,
    achievements: [{ id: 'poker_strategist', name: 'Poker Strategist', icon: <Gamepad2 className="h-4 w-4" /> }],
    gameStats: { slotsPlayed: 100, pokerHandsWon: 500, totalWinnings: 90000 },
    friendIds: ["user123"],
    topFriendIds: ["user123"],
  },
  "friend4": {
    id: "friend4",
    name: "SlotMachineFan",
    avatarUrl: genericAvatars[0 % genericAvatars.length],
    joinDate: "February 14, 2023",
    bio: "Spin to win! Living the slot life.",
    level: 18,
    achievements: [{ id: 'jackpot_joy', name: 'Jackpot Joy', icon: <Gamepad2 className="h-4 w-4" /> }],
    gameStats: { slotsPlayed: 5000, pokerHandsWon: 20, totalWinnings: 200000 },
    friendIds: ["user123", "friend2"],
    topFriendIds: ["user123"],
  },
   "friend5": {
    id: "friend5",
    name: "BingoStar",
    avatarUrl: genericAvatars[1 % genericAvatars.length],
    joinDate: "December 5, 2023",
    bio: "B-I-N-G-O! Always ready for a game.",
    level: 5,
    achievements: [],
    gameStats: { slotsPlayed: 50, pokerHandsWon: 0, totalWinnings: 10000 },
    friendIds: ["user123"],
    topFriendIds: [],
  },
};

const allMockFriendsData: FriendType[] = Object.values(allMockUsers).map(u => ({
  id: u.id,
  name: u.name,
  avatarUrl: u.avatarUrl,
  level: u.level,
}));


export default function UserProfilePage() {
  const params = useParams<{ userId?: string }>(); 
  const userId = params.userId; 

  const [profileData, setProfileData] = useState<any | null>(null);
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [topFriends, setTopFriends] = useState<FriendType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof userId === 'string' && userId) {
      setIsLoading(true);
      setTimeout(() => {
        const user = allMockUsers[userId];
        if (user) {
          setProfileData(user);
          const currentUserIdStr = String(userId);
          setFriends(allMockFriendsData.filter(f => user.friendIds?.includes(f.id) && f.id !== currentUserIdStr));
          setTopFriends(allMockFriendsData.filter(f => user.topFriendIds?.includes(f.id) && f.id !== currentUserIdStr));
        } else {
          setProfileData(null); 
        }
        setIsLoading(false);
      }, 500);
    } else if (params.userId !== undefined) { 
        setIsLoading(false); 
        setProfileData(null); 
    }
  }, [userId, params.userId]); 

  if (isLoading) {
    return (
      <div className="min-h-screen text-foreground flex flex-col">
        <Navbar />
        <main className={cn("flex-grow landing-scroll-container pt-[64px] sm:pt-[68px]")}>
           <section className="landing-scroll-section">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
              <p className="text-xl text-primary">Loading Profile...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen text-foreground flex flex-col">
        <Navbar />
        <main className={cn("flex-grow landing-scroll-container pt-[64px] sm:pt-[68px]")}>
           <section className="landing-scroll-section">
             <div className="container mx-auto px-4 py-8 sm:py-10 flex flex-col items-center justify-center h-full">
                <ShieldAlert className="mx-auto h-24 w-24 text-red-500 mb-6" />
                <h1 className="text-3xl font-bold font-headline text-red-400 mb-4">Profile Not Found</h1>
                <p className="text-xl text-muted-foreground mb-8">The user profile you are looking for does not exist or could not be loaded.</p>
                <Link href="/lobby">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Back to Lobby
                    </Button>
                </Link>
             </div>
           </section>
        </main>
        <Footer />
      </div>
    );
  }


  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className={cn(
        "flex-grow landing-scroll-container pt-[64px] sm:pt-[68px]"
      )}>
        <section className="landing-scroll-section">
            <div className="container mx-auto px-4 py-8 sm:py-10"> {/* Adjusted padding */}
                <header className="mb-8 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">{profileData.name}'s Profile</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card & Top Friends */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="bg-card border-border shadow-xl">
                    <CardHeader className="items-center text-center pt-6">
                        <Avatar className="w-32 h-32 mb-4 border-4 border-primary shadow-lg">
                        <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
                        <AvatarFallback>{profileData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-3xl text-primary font-headline">{profileData.name}</CardTitle>
                        <p className="text-md text-muted-foreground">Level: {profileData.level}</p>
                        <p className="text-sm text-silver/70">Joined: {profileData.joinDate}</p>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground mb-6 text-sm">{profileData.bio}</p>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                            <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                        </Button>
                    </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-primary flex items-center justify-center font-headline text-2xl">
                        <Star className="mr-2 h-7 w-7 text-yellow-400" /> Top Friends
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {topFriends.length > 0 ? (
                        <div className="space-y-4">
                            {topFriends.map((friend) => (
                            <FriendListItem key={friend.id} friend={friend} />
                            ))}
                        </div>
                        ) : (
                        <p className="text-muted-foreground text-center">No top friends to display.</p>
                        )}
                    </CardContent>
                    </Card>
                </div>

                {/* Right Column: Stats, Achievements, Full Friends List */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card border-border shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-primary flex items-center font-headline text-2xl">
                        <Gamepad2 className="mr-2 h-7 w-7" /> Game Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-foreground">
                        <div className="text-center p-3 bg-muted/50 rounded-md border border-border/20">
                            <p className="text-xs text-muted-foreground">Slots Played</p>
                            <p className="text-2xl font-bold text-primary">{profileData.gameStats.slotsPlayed}</p>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-md border border-border/20">
                            <p className="text-xs text-muted-foreground">Poker Hands Won</p>
                            <p className="text-2xl font-bold text-primary">{profileData.gameStats.pokerHandsWon}</p>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-md border border-border/20">
                            <p className="text-xs text-muted-foreground">Total Winnings</p>
                            <p className="text-2xl font-bold text-primary">{profileData.gameStats.totalWinnings.toLocaleString()}</p>
                        </div>
                    </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-primary flex items-center font-headline text-2xl">
                        <Trophy className="mr-2 h-7 w-7" /> Achievements
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {profileData.achievements && profileData.achievements.length > 0 ? (
                        <ul className="space-y-3">
                        {profileData.achievements.map((ach: any) => (
                            <li key={ach.id} className="flex items-center text-foreground p-2 bg-muted/50 rounded-md border border-border/20">
                            <span className="text-primary mr-3 p-1 bg-primary/10 rounded">{ach.icon}</span>
                            {ach.name}
                            </li>
                        ))}
                        </ul>
                        ) : (
                        <p className="text-muted-foreground text-center">No achievements unlocked yet.</p>
                        )}
                    </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-primary flex items-center font-headline text-2xl">
                                <Users className="mr-2 h-7 w-7" /> All Friends ({friends.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {friends.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {friends.map(friend => (
                                        <FriendListItem key={friend.id} friend={friend} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center">This user hasn't added any friends yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

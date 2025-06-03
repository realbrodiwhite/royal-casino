
"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar';
import FriendListItem, { type Friend as FriendType } from '@/components/user/FriendListItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, Trophy, Gamepad2, Star, MessageSquare, ShieldAlert } from 'lucide-react';
import { useParams } from 'next/navigation'; // Import useParams


// Mock data - replace with actual data fetching later
const allMockUsers: Record<string, any> = {
  "user123": { // This is "Player One" from the main profile page
    id: "user123",
    name: "Player One",
    avatarUrl: "https://placehold.co/100x100.png?text=P1",
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
    avatarUrl: "https://placehold.co/100x100.png?text=CK",
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
    avatarUrl: "https://placehold.co/100x100.png?text=LL",
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
    avatarUrl: "https://placehold.co/100x100.png?text=PF",
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
    avatarUrl: "https://placehold.co/100x100.png?text=SF",
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
    avatarUrl: "https://placehold.co/100x100.png?text=BS",
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
  const params = useParams();
  const userId = params?.userId as string;
  const [profileData, setProfileData] = useState<any | null>(null);
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [topFriends, setTopFriends] = useState<FriendType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const user = allMockUsers[userId];
        if (user) {
          setProfileData(user);
          setFriends(allMockFriendsData.filter(f => user.friendIds?.includes(f.id) && f.id !== userId));
          setTopFriends(allMockFriendsData.filter(f => user.topFriendIds?.includes(f.id) && f.id !== userId));
        } else {
          setProfileData(null); // User not found
        }
        setIsLoading(false);
      }, 500);
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-deep-purple text-silver flex flex-col items-center justify-center">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold mx-auto mb-4"></div>
            <p className="text-xl text-gold">Loading Profile...</p>
        </div>
         <footer className="text-center py-6 text-sm text-silver/70 mt-12 border-t border-gold/20">
            <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <ShieldAlert className="mx-auto h-24 w-24 text-red-500 mb-6" />
          <h1 className="text-4xl font-bold font-headline text-red-400 mb-4">Profile Not Found</h1>
          <p className="text-xl text-silver mb-8">The user profile you are looking for does not exist or could not be loaded.</p>
          <Link href="/leaderboards">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
              Back to Leaderboards
            </Button>
          </Link>
        </main>
        <footer className="text-center py-6 text-sm text-silver/70 mt-12 border-t border-gold/20">
            <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // For this example, we'll assume this is the logged-in user's profile.
  // In a real app, you might have a dynamic route like /profile/[userId]

  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold font-headline text-gold">{profileData.name}'s Profile</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card & Top Friends */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-silver/10 border-gold shadow-xl">
              <CardHeader className="items-center text-center pt-6">
                <Avatar className="w-32 h-32 mb-4 border-4 border-gold shadow-lg">
                  <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint="player avatar large" />
                  <AvatarFallback>{profileData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl text-gold font-headline">{profileData.name}</CardTitle>
                <p className="text-md text-silver/80">Level: {profileData.level}</p>
                <p className="text-sm text-silver/70">Joined: {profileData.joinDate}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-silver/90 mb-6 text-sm">{profileData.bio}</p>
                {/* Actions like Add Friend or Message would go here if not viewing own profile */}
                 <Button className="bg-gold text-deep-purple hover:bg-gold/90 w-full">
                    <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-silver/10 border-gold shadow-xl">
              <CardHeader>
                <CardTitle className="text-gold flex items-center justify-center font-headline text-2xl">
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
                  <p className="text-silver/80 text-center">No top friends to display.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Stats, Achievements, Full Friends List */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-silver/10 border-gold shadow-xl">
              <CardHeader>
                <CardTitle className="text-gold flex items-center font-headline text-2xl">
                  <Gamepad2 className="mr-2 h-7 w-7" /> Game Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-silver">
                <div className="text-center p-3 bg-silver/5 rounded-md border border-gold/20">
                    <p className="text-xs text-silver/70">Slots Played</p> 
                    <p className="text-2xl font-bold text-gold">{profileData.gameStats.slotsPlayed}</p>
                </div>
                <div className="text-center p-3 bg-silver/5 rounded-md border border-gold/20">
                    <p className="text-xs text-silver/70">Poker Hands Won</p>
                    <p className="text-2xl font-bold text-gold">{profileData.gameStats.pokerHandsWon}</p>
                </div>
                <div className="text-center p-3 bg-silver/5 rounded-md border border-gold/20">
                    <p className="text-xs text-silver/70">Total Winnings</p>
                    <p className="text-2xl font-bold text-gold">{profileData.gameStats.totalWinnings.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-silver/10 border-gold shadow-xl">
              <CardHeader>
                <CardTitle className="text-gold flex items-center font-headline text-2xl">
                  <Trophy className="mr-2 h-7 w-7" /> Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profileData.achievements && profileData.achievements.length > 0 ? (
                <ul className="space-y-3">
                  {profileData.achievements.map((ach: any) => (
                    <li key={ach.id} className="flex items-center text-silver p-2 bg-silver/5 rounded-md border border-gold/20">
                      <span className="text-gold mr-3 p-1 bg-gold/10 rounded">{ach.icon}</span>
                      {ach.name}
                    </li>
                  ))}
                </ul>
                ) : (
                  <p className="text-silver/80 text-center">No achievements unlocked yet.</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-silver/10 border-gold shadow-xl">
                <CardHeader>
                    <CardTitle className="text-gold flex items-center font-headline text-2xl">
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
                        <p className="text-silver/80 text-center">This user hasn't added any friends yet.</p>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-silver/70 mt-12 border-t border-gold/20">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
      </footer>
    </div>
  );
}

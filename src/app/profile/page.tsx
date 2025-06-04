
"use client";

import React from 'react';
import Navbar from '@/components/layout/navbar';
import FriendListItem, { type Friend } from '@/components/user/FriendListItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, Trophy, Gamepad2, Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual data fetching later
const mockUser = {
  id: "user123",
  name: "Player One",
  avatarUrl: "/images/avatars/avatar-player-one.svg", // Updated
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
};

const genericAvatars = [
  "/images/avatars/avatar-generic-1.svg",
  "/images/avatars/avatar-generic-2.svg",
  "/images/avatars/avatar-generic-3.svg",
];

const allMockFriends: Friend[] = [
  { id: "friend1", name: "CasinoKing", avatarUrl: genericAvatars[0], level: 15 },
  { id: "friend2", name: "LadyLuck", avatarUrl: genericAvatars[1], level: 20 },
  { id: "friend3", name: "PokerFace", avatarUrl: genericAvatars[2], level: 10 },
  { id: "friend4", name: "SlotMachineFan", avatarUrl: genericAvatars[0], level: 18 },
  { id: "friend5", name: "BingoStar", avatarUrl: genericAvatars[1], level: 5 },
  { id: "friend6", name: "JustAnotherPlayer", avatarUrl: genericAvatars[2], level: 2 },
];

// In a real app, you'd fetch these based on IDs
const userFriends = allMockFriends.filter(f => mockUser.friendIds.includes(f.id));
const userTopFriends = allMockFriends.filter(f => mockUser.topFriendIds.includes(f.id));


export default function ProfilePage() {
  // For this example, we'll assume this is the logged-in user's profile.
  // In a real app, you might have a dynamic route like /profile/[userId]

  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold font-headline text-gold">My Profile</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card & Top Friends */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-silver/10 border-gold shadow-xl">
              <CardHeader className="items-center text-center pt-6">
                <Avatar className="w-32 h-32 mb-4 border-4 border-gold shadow-lg">
                  <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl text-gold font-headline">{mockUser.name}</CardTitle>
                <p className="text-md text-silver/80">Level: {mockUser.level}</p>
                <p className="text-sm text-silver/70">Joined: {mockUser.joinDate}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-silver/90 mb-6 text-sm">{mockUser.bio}</p>
                <div className="flex space-x-2 justify-center">
                    <Button className="bg-gold text-deep-purple hover:bg-gold/90 flex-1">
                        <User className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                     <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                        <MessageSquare className="h-4 w-4"/>
                    </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-silver/10 border-gold shadow-xl">
              <CardHeader>
                <CardTitle className="text-gold flex items-center justify-center font-headline text-2xl">
                  <Star className="mr-2 h-7 w-7 text-yellow-400" /> Top Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userTopFriends.length > 0 ? (
                  <div className="space-y-4">
                    {userTopFriends.map((friend) => (
                      <FriendListItem key={friend.id} friend={friend} />
                    ))}
                  </div>
                ) : (
                  <p className="text-silver/80 text-center">No top friends yet. Add some!</p>
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
                    <p className="text-2xl font-bold text-gold">{mockUser.gameStats.slotsPlayed}</p>
                </div>
                <div className="text-center p-3 bg-silver/5 rounded-md border border-gold/20">
                    <p className="text-xs text-silver/70">Poker Hands Won</p>
                    <p className="text-2xl font-bold text-gold">{mockUser.gameStats.pokerHandsWon}</p>
                </div>
                <div className="text-center p-3 bg-silver/5 rounded-md border border-gold/20">
                    <p className="text-xs text-silver/70">Total Winnings</p>
                    <p className="text-2xl font-bold text-gold">{mockUser.gameStats.totalWinnings.toLocaleString()}</p>
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
                {mockUser.achievements.length > 0 ? (
                <ul className="space-y-3">
                  {mockUser.achievements.map((ach) => (
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
                        <Users className="mr-2 h-7 w-7" /> All Friends ({userFriends.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {userFriends.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {userFriends.map(friend => (
                                <FriendListItem key={friend.id} friend={friend} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-silver/80 text-center">You haven't added any friends yet. Find some!</p>
                    )}
                     <div className="mt-6 text-center">
                        <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                            Manage Friends
                        </Button>
                    </div>
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

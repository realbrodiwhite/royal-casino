
"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';

export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  level?: number;
}

interface FriendListItemProps {
  friend: Friend;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-silver/5 border border-gold/30 rounded-lg shadow-md hover:shadow-gold/20 transition-shadow duration-300">
      <Avatar className="w-20 h-20 mb-3 border-2 border-gold/70">
        <AvatarImage src={friend.avatarUrl} alt={friend.name} />
        <AvatarFallback>{friend.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <h4 className="text-lg font-semibold text-gold truncate w-full text-center">{friend.name}</h4>
      {friend.level && <p className="text-xs text-silver/70">Level {friend.level}</p>}
      <Link href={`/profile/${friend.id}`} passHref className="mt-3 w-full">
        <Button variant="outline" size="sm" className="w-full border-gold text-gold hover:bg-gold/10">
          <User className="mr-2 h-4 w-4" /> View Profile
        </Button>
      </Link>
    </div>
  );
};

export default FriendListItem;

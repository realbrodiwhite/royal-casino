
"use client";

import Link from 'next/link';
import { Crown, Gamepad2, UserCircle, Shield, Menu, BackpackIcon, Star, ShoppingCart, Settings as SettingsIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import ExperienceBar from '@/components/layout/ExperienceBar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';

// Simulate development mode for conditional auth bypass
const DEV_MODE_BYPASS_AUTH = true; 

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  isDropdownItem?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon, onClick, isDropdownItem }) => {
  const pathname = usePathname();
  const isActive = pathname === href ||
                 (href === "/lobby" && (pathname.startsWith("/games") || pathname.startsWith("/lobby/"))) ||
                 (href === "/profile" && pathname.startsWith("/profile")) ||
                 (href === "/backpack" && pathname.startsWith("/backpack")) ||
                 (href === "/skills" && pathname.startsWith("/skills")) ||
                 (href === "/shop" && pathname.startsWith("/shop")) ||
                 (href === "/admin" && pathname.startsWith("/admin")) ||
                 (href === "/settings" && pathname.startsWith("/settings")) ||
                 (href === "/daily-bonus" && pathname.startsWith("/daily-bonus"));

  if (isDropdownItem) {
    return (
      <Link href={href} passHref>
        <DropdownMenuItem
          onClick={onClick}
          className={cn(
            "flex items-center cursor-pointer",
            isActive ? "bg-accent text-accent-foreground" : "text-foreground"
          )}
        >
          {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
          {children}
        </DropdownMenuItem>
      </Link>
    );
  }

  return (
    <Link href={href} legacyBehavior>
      <a
        className={cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 w-full md:w-auto",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
        )}
        onClick={onClick}
      >
        {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
        {children}
      </a>
    </Link>
  );
};

const UserAvatarMenu: React.FC<{ onLinkClick?: () => void, showAdminLink: boolean, currentUser: FirebaseUser | null }> = ({ onLinkClick, showAdminLink, currentUser }) => {
  const getInitials = (email?: string | null) => {
    if (!email) return '';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
          "flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          "w-7 h-7 sm:w-8 sm:h-8 border-2 border-primary" 
        )}>
          <Avatar className="h-full w-full"> 
            <AvatarImage src={currentUser?.photoURL || undefined} alt={currentUser?.displayName || currentUser?.email || "User"} />
            <AvatarFallback className="bg-muted text-muted-foreground text-xs"> 
              {currentUser?.email ? getInitials(currentUser.email) : <UserCircle className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Open user menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NavLink href="/backpack" icon={<BackpackIcon />} onClick={onLinkClick} isDropdownItem>Backpack</NavLink>
        <NavLink href="/settings" icon={<SettingsIcon />} onClick={onLinkClick} isDropdownItem>Settings</NavLink>
        <NavLink href="/profile" icon={<UserCircle />} onClick={onLinkClick} isDropdownItem>Profile</NavLink>
        {showAdminLink && (
          <>
            <DropdownMenuSeparator />
            <NavLink href="/admin" icon={<Shield />} onClick={onLinkClick} isDropdownItem>Admin</NavLink>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsAdminUser(user.email === 'admin@royalcasino.dev');
      } else {
        setIsAdminUser(false);
      }
    });
    return () => unsubscribe(); 
  }, []);
  
  const showAdminLink = DEV_MODE_BYPASS_AUTH || isAdminUser;

  return (
    <>
      <ExperienceBar />
      <nav className={cn(
        "bg-background/80 backdrop-blur-md shadow-lg z-30 border-b border-border",
        "sticky top-8 sm:top-9" 
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12"> {/* Reduced height from h-14 to h-12 */}
            <Link href="/" legacyBehavior>
              <a className="flex items-center text-primary hover:text-primary/90 transition-colors">
                <div className="mr-2 sm:mr-3 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 border-2 border-primary rounded-full bg-background">
                  <Crown className="h-3.5 w-3.5 sm:h-4 sm:h-4 text-primary" aria-hidden="true" />
                </div>
                <span className="text-base sm:text-lg font-headline font-bold whitespace-nowrap">Royal Casino</span>
              </a>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <NavLink href="/lobby" icon={<Gamepad2 />}>Lobby</NavLink>
              <NavLink href="/shop" icon={<ShoppingCart />}>Shop</NavLink>
              <NavLink href="/skills" icon={<Star />}>Skills</NavLink>
              <UserAvatarMenu showAdminLink={showAdminLink} currentUser={currentUser} />
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="md:hidden flex items-center space-x-2"> 
              <UserAvatarMenu showAdminLink={showAdminLink} currentUser={currentUser} onLinkClick={() => setIsMobileMenuOpen(false)} />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="text-foreground hover:text-primary focus:outline-none p-1 rounded-md"> 
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-background p-0">
                  <SheetHeader className="p-4 pb-2 border-b border-border">
                     <Link href="/" legacyBehavior>
                        <a className="flex items-center text-primary hover:text-primary/90 transition-colors mb-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="mr-3 flex items-center justify-center w-8 h-8 border-2 border-primary rounded-full bg-background"> 
                            <Crown className="h-4 w-4 text-primary" aria-hidden="true" />
                            </div>
                            <span className="text-lg font-headline font-bold whitespace-nowrap">Royal Casino</span>
                        </a>
                    </Link>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-1 p-4 pt-2">
                    <NavLink href="/lobby" icon={<Gamepad2 />} onClick={() => setIsMobileMenuOpen(false)}>Lobby</NavLink>
                    <NavLink href="/shop" icon={<ShoppingCart />} onClick={() => setIsMobileMenuOpen(false)}>Shop</NavLink>
                    <NavLink href="/backpack" icon={<BackpackIcon />} onClick={() => setIsMobileMenuOpen(false)}>Backpack</NavLink>
                    <NavLink href="/skills" icon={<Star />} onClick={() => setIsMobileMenuOpen(false)}>Skills</NavLink>
                    <NavLink href="/settings" icon={<SettingsIcon />} onClick={() => setIsMobileMenuOpen(false)}>Settings</NavLink>
                    <NavLink href="/profile" icon={<UserCircle />} onClick={() => setIsMobileMenuOpen(false)}>Profile</NavLink>
                    {showAdminLink && <NavLink href="/admin" icon={<Shield />} onClick={() => setIsMobileMenuOpen(false)}>Admin</NavLink>}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

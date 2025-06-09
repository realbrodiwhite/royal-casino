
"use client";

import Link from 'next/link';
import { Crown, Gamepad2, UserCircle, Shield, Menu, BackpackIcon, Star, ShoppingCart, Gift } from 'lucide-react';
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
import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';

// Simulate development mode for conditional auth bypass
const DEV_MODE_BYPASS_AUTH = true; // In real app, use process.env.NEXT_PUBLIC_DEV_MODE_BYPASS_AUTH === 'true'


interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href ||
                 (href === "/lobby" && pathname.startsWith("/games")) ||
                 (href === "/lobby" && pathname.startsWith("/lobby/")) || // Added to cover sub-lobby pages like /lobby/poker
                 (href === "/profile" && pathname.startsWith("/profile")) ||
                 (href === "/backpack" && pathname.startsWith("/backpack")) ||
                 (href === "/skills" && pathname.startsWith("/skills")) ||
                 (href === "/shop" && pathname.startsWith("/shop")) ||
                 (href === "/admin" && pathname.startsWith("/admin")) || // Ensure admin active state
                 (href === "/daily-bonus" && pathname.startsWith("/daily-bonus"));


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
    return () => unsubscribe(); // Cleanup subscription on unmount
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
          <div className="flex items-center justify-between h-14">
            <Link href="/" legacyBehavior>
              <a className="flex items-center text-primary hover:text-primary/90 transition-colors">
                <div className="mr-2 sm:mr-3 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 border-2 sm:border-[3px] border-primary rounded-full bg-background">
                  <Crown className="h-3.5 w-3.5 sm:h-4 sm:h-4 text-primary" aria-hidden="true" />
                </div>
                <span className="text-base sm:text-lg font-headline font-bold">Royal Casino</span>
              </a>
            </Link>
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <NavLink href="/lobby" icon={<Gamepad2 />}>Game Lobby</NavLink>
              <NavLink href="/daily-bonus" icon={<Gift />}>Daily Bonus</NavLink>
              <NavLink href="/shop" icon={<ShoppingCart />}>Shop</NavLink>
              <NavLink href="/backpack" icon={<BackpackIcon />}>Backpack</NavLink> 
              <NavLink href="/skills" icon={<Star />}>Skills</NavLink>
              <NavLink href="/profile" icon={<UserCircle />}>Profile</NavLink>
              {showAdminLink && <NavLink href="/admin" icon={<Shield />}>Admin</NavLink>}
            </div>
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="text-foreground hover:text-primary focus:outline-none p-2">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-background p-0">
                  <SheetHeader className="p-4 pb-2">
                    <SheetTitle className="sr-only">Main Menu</SheetTitle>
                     <Link href="/" legacyBehavior>
                        <a className="flex items-center text-primary hover:text-primary/90 transition-colors mb-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="mr-3 flex items-center justify-center w-8 h-8 border-[3px] border-primary rounded-full bg-background">
                            <Crown className="h-4 w-4 text-primary" aria-hidden="true" />
                            </div>
                            <span className="text-lg font-headline font-bold">Royal Casino</span>
                        </a>
                    </Link>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-1 p-4 pt-0">
                    <NavLink href="/lobby" icon={<Gamepad2 />} onClick={() => setIsMobileMenuOpen(false)}>Game Lobby</NavLink>
                    <NavLink href="/daily-bonus" icon={<Gift />} onClick={() => setIsMobileMenuOpen(false)}>Daily Bonus</NavLink>
                    <NavLink href="/shop" icon={<ShoppingCart />} onClick={() => setIsMobileMenuOpen(false)}>Shop</NavLink>
                    <NavLink href="/backpack" icon={<BackpackIcon />} onClick={() => setIsMobileMenuOpen(false)}>Backpack</NavLink>
                    <NavLink href="/skills" icon={<Star />} onClick={() => setIsMobileMenuOpen(false)}>Skills</NavLink>
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

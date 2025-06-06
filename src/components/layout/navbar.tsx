
"use client";

import Link from 'next/link';
import { Crown, Gamepad2, UserCircle, BarChart3, Shield, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import ExperienceBar from '@/components/layout/ExperienceBar';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from 'react';

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
                 (href === "/profile" && pathname.startsWith("/profile"));

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

  return (
    <>
      <ExperienceBar />
      <nav className={cn(
        "bg-background/80 backdrop-blur-md shadow-lg z-30 border-b border-border",
        "sticky top-8 sm:top-9" // Sticks below the ExperienceBar
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link href="/" legacyBehavior>
              <a className="flex items-center text-primary hover:text-primary/90 transition-colors">
                <div className="mr-2 sm:mr-3 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border-2 sm:border-4 border-primary rounded-full bg-background">
                  <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
                </div>
                <span className="text-base sm:text-lg font-headline font-bold">Royal Casino</span>
              </a>
            </Link>
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <NavLink href="/lobby" icon={<Gamepad2 />}>Game Lobby</NavLink>
              <NavLink href="/profile" icon={<UserCircle />}>Profile</NavLink>
              {/* <NavLink href="/leaderboards" icon={<BarChart3 />}>Leaderboards</NavLink> */}
              <NavLink href="/admin" icon={<Shield />}>Admin</NavLink>
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
                  <nav className="flex flex-col space-y-2 p-4 pt-6">
                     <Link href="/" legacyBehavior>
                        <a className="flex items-center text-primary hover:text-primary/90 transition-colors mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="mr-3 flex items-center justify-center w-10 h-10 border-4 border-primary rounded-full bg-background">
                            <Crown className="h-5 w-5 text-primary" aria-hidden="true" />
                            </div>
                            <span className="text-lg font-headline font-bold">Royal Casino</span>
                        </a>
                    </Link>
                    <NavLink href="/lobby" icon={<Gamepad2 />} onClick={() => setIsMobileMenuOpen(false)}>Game Lobby</NavLink>
                    <NavLink href="/profile" icon={<UserCircle />} onClick={() => setIsMobileMenuOpen(false)}>Profile</NavLink>
                    {/* <NavLink href="/leaderboards" icon={<BarChart3 />} onClick={() => setIsMobileMenuOpen(false)}>Leaderboards</NavLink> */}
                    <NavLink href="/admin" icon={<Shield />} onClick={() => setIsMobileMenuOpen(false)}>Admin</NavLink>
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

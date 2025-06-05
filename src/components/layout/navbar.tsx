
"use client";

import Link from 'next/link';
import { Crown, Gamepad2, UserCircle, BarChart3, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href === "/lobby" && pathname.startsWith("/lobby/"));

  return (
    <Link href={href} legacyBehavior>
      <a
        className={cn(
          "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150",
          isActive
            ? "bg-accent text-accent-foreground" // Use theme's accent for active
            : "text-foreground hover:bg-accent/50 hover:text-accent-foreground" // Use foreground and accent for hover
        )}
      >
        {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
        {children}
      </a>
    </Link>
  );
};

export default function Navbar() {
  // Central coin: 40px diameter, 20px crown
  // Side coins: 36px diameter (90% of 40px), 18px crown (90% of 20px)
  // Offset for side coins: 0.85 * 36px = 30.6px
  const sideCoinOffset = 0.85 * 36; // 30.6px

  return (
    <nav className="bg-background/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" legacyBehavior>
            <a className="flex items-center text-primary hover:text-primary/90 transition-colors">
              {/* Container for the three King's Coins logo */}
              <div className="relative flex items-center justify-center mr-3 h-[40px] w-[calc(40px+2*(36px*0.15)+2*4px)] sm:w-[calc(40px+2*(36px*0.15)+10px)]"> {/* Approx width: center coin + visible parts of side coins + some spacing */}

                {/* Left Coin (behind) */}
                <div
                  className="absolute top-1/2 left-1/2 z-0"
                  style={{
                    transform: `translate(calc(-50% - ${sideCoinOffset}px), -50%) scale(0.9)`,
                  }}
                >
                  <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full border-4 border-primary bg-transparent">
                    <Crown className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
                  </div>
                </div>

                {/* Central Coin (front) */}
                <div className="relative z-10 w-[40px] h-[40px] flex items-center justify-center rounded-full border-4 border-primary bg-transparent">
                  <Crown className="h-[20px] w-[20px] text-primary" aria-hidden="true" />
                </div>

                {/* Right Coin (behind) */}
                <div
                  className="absolute top-1/2 left-1/2 z-0"
                  style={{
                    transform: `translate(calc(-50% + ${sideCoinOffset}px), -50%) scale(0.9)`,
                  }}
                >
                  <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full border-4 border-primary bg-transparent">
                    <Crown className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <span className="text-base font-headline font-bold">Royal Casino</span>
            </a>
          </Link>
          <div className="hidden md:flex items-center space-x-2">
            <NavLink href="/lobby" icon={<Gamepad2 />}>Game Lobby</NavLink>
            <NavLink href="/profile" icon={<UserCircle />}>Profile</NavLink>
            {/* <NavLink href="/leaderboards" icon={<BarChart3 />}>Leaderboards</NavLink> */}
            <NavLink href="/admin" icon={<Shield />}>Admin</NavLink>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button could be a Sheet trigger */}
            <button className="text-foreground hover:text-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            {/* 
            Example Sheet for mobile menu (needs Sidebar components or similar)
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-foreground hover:text-primary focus:outline-none">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col space-y-4 p-4">
                  <Link href="/" className="flex items-center text-primary hover:text-primary/90 transition-colors">
                     // Simplified logo for sheet?
                    <span className="text-lg font-headline font-bold">Royal Casino</span>
                  </Link>
                  <NavLink href="/lobby" icon={<Gamepad2 />}>Game Lobby</NavLink>
                  <NavLink href="/profile" icon={<UserCircle />}>Profile</NavLink>
                  <NavLink href="/admin" icon={<Shield />}>Admin</NavLink>
                </nav>
              </SheetContent>
            </Sheet>
            */}
          </div>
        </div>
      </div>
    </nav>
  );
}

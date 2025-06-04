
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
  return (
    <nav className="bg-background/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" legacyBehavior>
            <a className="flex items-center text-primary hover:text-primary/90 transition-colors">
              <Crown className="h-8 w-8 mr-2" />
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
            <button className="text-foreground hover:text-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}


"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Navbar from '@/components/layout/navbar'; 
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Simulate development mode for conditional auth bypass
const DEV_MODE_BYPASS_AUTH = true; // In real app, use process.env.NEXT_PUBLIC_DEV_MODE_BYPASS_AUTH === 'true'

export default function ProfileRedirectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [authAttempted, setAuthAttempted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setAuthAttempted(true);
      if (user) {
        router.replace(`/profile/${user.uid}`);
      } else {
        if (!DEV_MODE_BYPASS_AUTH) {
          router.replace('/login');
        } else {
          // In dev mode, if no user, we might want to allow access or redirect to a mock profile
          // For now, let's assume if dev mode bypass is on, we don't force login redirect
          // but the page will likely show "loading" or "profile not found" if no UID.
          // A better dev experience might be to redirect to a default mock user if no one is logged in.
          // For this iteration, we'll just prevent the login redirect.
          console.log("DEV_MODE_BYPASS_AUTH is true, not redirecting to login from /profile.");
          setIsLoading(false); // Stop loading if in dev mode and no user, to avoid infinite load
        }
      }
    });

    // Fallback timer
    const timer = setTimeout(() => {
      if (isLoading && !authAttempted) { 
        if (!DEV_MODE_BYPASS_AUTH) {
          router.replace('/login');
        } else {
          console.log("DEV_MODE_BYPASS_AUTH: Fallback timer, not redirecting to login.");
          setIsLoading(false);
        }
      } else if (isLoading && authAttempted && !auth.currentUser && DEV_MODE_BYPASS_AUTH) {
        // If auth was attempted, no user, but dev mode is on
        setIsLoading(false);
      }
    }, 3000);

    return () => {
        unsubscribe();
        clearTimeout(timer);
    };
  }, [router, isLoading, authAttempted]);


  // Render a loading state or a minimal UI while checking auth
  if (isLoading && !(DEV_MODE_BYPASS_AUTH && authAttempted && !auth.currentUser)) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className={cn(
          "flex-grow landing-scroll-container" // Added for sectional scroll
        )}>
          <section className="landing-scroll-section"> {/* Added for sectional scroll */}
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
              <p className="text-xl text-primary">Loading Profile...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If in dev mode bypass and no user, show a message or allow to proceed to a generic page
  // (though /profile/ should ideally redirect to /profile/[uid] or show an error if no uid)
  // This specific page /profile/ is mostly a redirector.
  // If DEV_MODE_BYPASS_AUTH is true and no user is logged in, it implies direct navigation here.
  // This page doesn't really have content if not redirecting.
  // Perhaps redirect to lobby in dev mode if no user.
  if (DEV_MODE_BYPASS_AUTH && !auth.currentUser && authAttempted) {
    // router.replace('/lobby'); // Optional: redirect to lobby in dev mode if no specific user
    // For now, just show a minimal message as this page's purpose is redirection.
     return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
         <main className={cn("flex-grow landing-scroll-container")}>
            <section className="landing-scroll-section">
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-xl text-muted-foreground">Profile page. In development mode.</p>
                    <p className="text-sm text-muted-foreground">Normally, you would be redirected.</p>
                     <Link href="/lobby" className="mt-4 text-primary hover:underline">Go to Lobby</Link>
                </div>
            </section>
        </main>
        <Footer />
      </div>
    );
  }


  return null; // Or a fallback UI if direct navigation is expected
}

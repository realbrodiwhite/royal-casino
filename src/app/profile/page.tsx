
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Navbar from '@/components/layout/navbar'; // Keep Navbar for consistent layout during loading

export default function ProfileRedirectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // User is signed in
        router.replace(`/profile/${user.uid}`);
      } else {
        // User is signed out
        router.replace('/login');
      }
      // Intentionally not setting isLoading to false here if redirecting,
      // as the new page will take over.
      // If we needed to show content on *this* page before redirect, we'd manage isLoading more carefully.
    });

    // Fallback if onAuthStateChanged takes too long or doesn't fire as expected
    // This also handles the case where the component might unmount before auth state is clear
    const timer = setTimeout(() => {
        if (isLoading && !auth.currentUser) { // Still loading and no user found yet
            // Potentially redirect to login as a fallback if auth state is slow
            // For now, we rely on onAuthStateChanged primarily
            // If after a few seconds, there's still no user, it's likely they are not logged in.
            // router.replace('/login');
        }
        setIsLoading(false); // Ensure loading state is eventually false
    }, 3000);


    // Cleanup subscription on unmount
    return () => {
        unsubscribe();
        clearTimeout(timer);
    };
  }, [router, isLoading]); // Added isLoading to dependencies for the timer logic

  // Render a loading state or a minimal UI while checking auth
  // Since redirection is quick, this might only flash briefly or not be seen.
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-xl text-primary">Loading Profile...</p>
      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border mt-auto">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All rights reserved.</p>
      </footer>
    </div>
  );
}

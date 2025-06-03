
// src/app/signup/page.tsx
"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would handle form submission, validation, and API calls here.
    // For now, we'll just show a success toast and redirect.
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    toast({
      title: "Signup Successful (Mock)",
      description: `Welcome, ${email}! Your account has been created.`,
    });
    router.push('/lobby'); // Redirect to game lobby after mock signup
  };

  return (
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-silver/10 border-gold shadow-xl">
          <CardHeader className="text-center">
            <UserPlus className="mx-auto h-16 w-16 text-gold mb-4" />
            <CardTitle className="text-4xl font-headline text-gold">Create Your Account</CardTitle>
            <CardDescription className="text-silver/80">
              Join Royal Casino today and start your winning journey!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-silver">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-deep-purple/50 border-gold text-silver placeholder:text-silver/60 focus:ring-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-silver">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-deep-purple/50 border-gold text-silver placeholder:text-silver/60 focus:ring-gold"
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-silver">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-deep-purple/50 border-gold text-silver placeholder:text-silver/60 focus:ring-gold"
                />
              </div>
              <Button type="submit" className="w-full bg-gold text-deep-purple hover:bg-gold/90 font-semibold py-3">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-sm text-silver/80">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-gold hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <footer className="text-center py-6 text-sm text-silver/70 border-t border-gold/20">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
    </div>
  );
}


"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, ShieldAlert, RotateCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Login Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      toast({
        title: "Login Successful",
        description: `Welcome back, ${userCredential.user.email || 'player'}!`,
      });

      // Check for admin email
      if (userCredential.user.email === 'admin@royalcasino.dev') {
        router.push('/admin');
      } else {
        router.push('/lobby');
      }
    } catch (error: any) {
      let errorMessage = "Failed to login. Please check your credentials.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
      }
      console.error("Firebase Login Error:", error);
      toast({
        title: "Login Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-16 pt-[88px] sm:pt-[92px] flex flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border shadow-xl">
          <CardHeader className="text-center">
            <LogIn className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4" />
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-headline text-primary">Login to Royal Casino</CardTitle>
            <CardDescription className="text-muted-foreground">
              Access your account to continue your gaming journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring"
                />
              </div>
              <Button type="submit" variant="default" className="w-full font-semibold py-3" disabled={isLoading}>
                {isLoading ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Logging In...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>

        <Card className="w-full max-w-md bg-card border-border/50 shadow-lg mt-8">
            <CardHeader>
                <CardTitle className="text-primary flex items-center text-lg">
                    <ShieldAlert className="mr-2 h-5 w-5 text-yellow-400"/> Test Credentials
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                    For testing with your Firebase project. Ensure these users exist in your Firebase Authentication.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3 text-foreground">
                <div>
                    <h4 className="font-semibold">Admin User:</h4>
                    <p className="text-muted-foreground">Email: <code className="bg-input px-1 rounded">admin@royalcasino.dev</code></p>
                    <p className="text-muted-foreground">Password: (Set this in Firebase)</p>
                </div>
                <div>
                    <h4 className="font-semibold">Regular Player:</h4>
                    <p className="text-muted-foreground">Email: <code className="bg-input px-1 rounded">player@royalcasino.dev</code> (or any other test email)</p>
                    <p className="text-muted-foreground">Password: (Set this in Firebase)</p>
                </div>
                 <p className="text-xs text-muted-foreground pt-2 border-t border-border/20">Note: You'll manage users and passwords directly in your Firebase project's Authentication section.</p>
            </CardContent>
        </Card>

      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
        <p>&copy; {new Date().getFullYear()} Royal Casino. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

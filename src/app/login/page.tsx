
"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, UserPlus, ShieldAlert, RotateCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Import Firebase auth instance

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
      // const user = userCredential.user; // You can use the user object if needed

      toast({
        title: "Login Successful",
        description: `Welcome back, ${email}!`,
      });

      // Redirect based on role (using specific email for admin)
      // In a real app, use custom claims or a database role check for security
      if (email === 'admin@royalcasino.dev') {
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
    <div className="min-h-screen bg-deep-purple text-silver flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-silver/10 border-gold shadow-xl">
          <CardHeader className="text-center">
            <LogIn className="mx-auto h-16 w-16 text-gold mb-4" />
            <CardTitle className="text-4xl font-headline text-gold">Login to Royal Casino</CardTitle>
            <CardDescription className="text-silver/80">
              Access your account to continue your gaming journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-silver">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-deep-purple/50 border-gold text-silver placeholder:text-silver/60 focus:ring-gold"
                />
              </div>
              <Button type="submit" className="w-full bg-gold text-deep-purple hover:bg-gold/90 font-semibold py-3" disabled={isLoading}>
                {isLoading ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Logging In...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <p className="text-sm text-silver/80">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-gold hover:underline">
                Sign Up
              </Link>
            </p>
            {/*
            <Link href="/forgot-password">
                <Button variant="link" className="text-sm text-silver/70 hover:text-gold">Forgot Password?</Button>
            </Link>
            */}
          </CardFooter>
        </Card>

        <Card className="w-full max-w-md bg-silver/10 border-gold/50 shadow-lg mt-8">
            <CardHeader>
                <CardTitle className="text-gold flex items-center text-xl">
                    <ShieldAlert className="mr-2 h-5 w-5 text-yellow-400"/> Test Credentials
                </CardTitle>
                <CardDescription className="text-silver/80 text-xs">
                    For testing with your Firebase project. Make sure these users exist in your Firebase Authentication.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
                <div>
                    <h4 className="font-semibold text-silver">Admin User:</h4>
                    <p className="text-silver/90">Email: <code className="bg-deep-purple/70 px-1 rounded">admin@royalcasino.dev</code></p>
                    <p className="text-silver/90">Password: (Set this in Firebase)</p>
                </div>
                <div>
                    <h4 className="font-semibold text-silver">Regular Player:</h4>
                    <p className="text-silver/90">Email: <code className="bg-deep-purple/70 px-1 rounded">player@royalcasino.dev</code></p>
                    <p className="text-silver/90">Password: (Set this in Firebase)</p>
                </div>
                 <p className="text-xs text-silver/70 pt-2 border-t border-gold/20">Note: The passwords displayed previously were for mock login. With Firebase, you'll manage users and passwords directly in your Firebase project's Authentication section.</p>
            </CardContent>
        </Card>

      </main>
      <footer className="text-center py-6 text-sm text-silver/70 border-t border-gold/20">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
    </div>
  );
}


"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, UserPlus, ShieldAlert } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      toast({
        title: "Login Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    // Mock login success & role check
    toast({
      title: "Login Successful",
      description: `Welcome back! (Mock login for ${email})`,
    });

    // Redirect based on role (using mock emails)
    if (email === 'admin@royalcasino.dev') {
      router.push('/admin');
    } else {
      router.push('/lobby'); // Updated to /lobby
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
              <Button type="submit" className="w-full bg-gold text-deep-purple hover:bg-gold/90 font-semibold py-3">
                Login
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
            <Link href="/forgot-password">
                <Button variant="link" className="text-sm text-silver/70 hover:text-gold">Forgot Password?</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="w-full max-w-md bg-silver/10 border-gold/50 shadow-lg mt-8">
            <CardHeader>
                <CardTitle className="text-gold flex items-center text-xl">
                    <ShieldAlert className="mr-2 h-5 w-5 text-yellow-400"/> Test Credentials
                </CardTitle>
                <CardDescription className="text-silver/80 text-xs">
                    For development and testing purposes only.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
                <div>
                    <h4 className="font-semibold text-silver">Admin User:</h4>
                    <p className="text-silver/90">Email: <code className="bg-deep-purple/70 px-1 rounded">admin@royalcasino.dev</code></p>
                    <p className="text-silver/90">Password: <code className="bg-deep-purple/70 px-1 rounded">AdminPass123!</code></p>
                </div>
                <div>
                    <h4 className="font-semibold text-silver">Regular Player:</h4>
                    <p className="text-silver/90">Email: <code className="bg-deep-purple/70 px-1 rounded">player@royalcasino.dev</code></p>
                    <p className="text-silver/90">Password: <code className="bg-deep-purple/70 px-1 rounded">PlayerPass123!</code></p>
                </div>
            </CardContent>
        </Card>

      </main>
      <footer className="text-center py-6 text-sm text-silver/70 border-t border-gold/20">
        <p>&copy; {new Date().getFullYear()} Royal Casino. Play Responsibly.</p>
      </footer>
    </div>
  );
}

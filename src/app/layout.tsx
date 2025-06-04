
import type { Metadata } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ExperienceBar from '@/components/layout/ExperienceBar';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Royal Casino',
  description: 'Experience the thrill of Royal Casino. Your ultimate social gaming destination!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${roboto.variable}`}>
      <head />
      <body className="font-body antialiased bg-background text-foreground pt-12 sm:pt-14"> {/* Add padding-top for sticky bar */}
        <ExperienceBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

    
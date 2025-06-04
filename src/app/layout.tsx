
import type { Metadata, Viewport } from 'next';
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

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'; // Fallback for local dev

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: 'Royal Casino - Premier Social Gaming Experience',
    template: '%s | Royal Casino',
  },
  description: 'Join Royal Casino for an unparalleled social gaming experience! Play exciting slots, poker, bingo, and more. Claim your new player bonus and climb the leaderboards.',
  keywords: ['social casino', 'online games', 'slots', 'poker', 'bingo', 'casino games', 'free credits', 'gaming community', 'Royal Casino'],
  authors: [{ name: 'Royal Casino Team', url: siteBaseUrl }],
  creator: 'Royal Casino Team',
  publisher: 'Royal Casino',
  openGraph: {
    title: 'Royal Casino - Premier Social Gaming Experience',
    description: 'Experience the thrill of Royal Casino. Your ultimate social gaming destination with slots, poker, bingo, and more!',
    url: siteBaseUrl,
    siteName: 'Royal Casino',
    images: [
      {
        url: `${siteBaseUrl}/images/og-image.png`, // Replace with actual path to a 1200x630 image
        width: 1200,
        height: 630,
        alt: 'Royal Casino Games',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Casino - Premier Social Gaming Experience',
    description: 'Join Royal Casino for top social casino games! Slots, poker, bingo, and more. Get your bonus now!',
    site: '@RoyalCasino', // Replace with actual Twitter handle
    creator: '@RoyalCasinoDevs', // Replace with actual Twitter handle of creators
    images: [`${siteBaseUrl}/images/twitter-card-image.png`], // Replace with actual path to a suitable Twitter card image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: { // Add paths to your actual icons
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png', // Example
    apple: '/apple-touch-icon.png', // Example
  },
  // alternates: { // If you have multiple languages
  //   canonical: '/',
  //   languages: {
  //     'en-US': '/en-US',
  //   },
  // },
};

export const viewport: Viewport = {
  themeColor: '#4B0082', // Deep Purple
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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

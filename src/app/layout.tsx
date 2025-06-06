
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
// ExperienceBar removed from here

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
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
        url: `${siteBaseUrl}/images/og-image.png`, 
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
    site: '@RoyalCasino', 
    creator: '@RoyalCasinoDevs', 
    images: [`${siteBaseUrl}/images/twitter-card-image.png`], 
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
  icons: { 
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png', 
    apple: '/apple-touch-icon.png', 
  },
};

export const viewport: Viewport = {
  themeColor: '#4B0082', 
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
    <html lang="en" className={`${playfairDisplay.variable} ${lato.variable}`}>
      <head />
      <body className="font-body antialiased bg-background text-foreground pt-12 sm:pt-14"> {}
        {/* ExperienceBar removed from here */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}

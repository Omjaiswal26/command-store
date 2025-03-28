import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GoogleAnalytics from './components/GoogleAnalytics';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Command Store - Save and Organize Terminal Commands",
  description: "Store, search, and copy terminal commands with ease. Never forget a useful command again.",
  keywords: ["store commands", "command store", "terminal commands", "command line", "developer tools", "command storage", "CLI"],
  openGraph: {
    title: "Command Store - Your Command Line Helper",
    description: "The ultimate tool for saving and organizing terminal commands",
    url: "https://command-store.dev/",
    siteName: "Command Store",
    images: [
      {
        url: "https://command-store.dev/logo-dark.png",
        width: 800,
        height: 800,
        alt: "Command Store Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Command Store - Terminal Command Manager",
    description: "Store and retrieve your terminal commands efficiently",
    images: ["https://command-store.dev/logo-dark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://command-store.dev",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#FFD700',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Command Store',
              applicationCategory: 'DeveloperApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              operatingSystem: 'Any',
              description: 'Store, organize and retrieve terminal commands with ease',
              url: 'https://command-store.dev',
              image: 'https://command-store.dev/logo-dark.png',
              author: {
                '@type': 'Person',
                name: 'Command Store Developer'
              }
            })
          }}
        />
      </body>
    </html>
  );
}

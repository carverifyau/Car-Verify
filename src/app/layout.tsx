import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Verify - Vehicle Report Australia | PPSR Check, VIN Check, Car Valuation",
  description: "Professional vehicle reports for Australian car buyers. Get PPSR checks, VIN verification, stolen car checks, and market valuations. Protect yourself from $15,400 average hidden debt.",
  keywords: "vehicle report australia, ppsr check, vin check, car valuation, stolen car check, car history report, finance check, write off check",
  authors: [{ name: "Car Verify Australia" }],
  creator: "Car Verify",
  publisher: "Car Verify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://car-verify.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Car Verify - Vehicle Report Australia | Don't Buy Blind",
    description: "Professional vehicle reports for Australian car buyers. PPSR checks, VIN verification, stolen car checks. Protect yourself from $15,400 average hidden debt.",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://car-verify.vercel.app',
    siteName: 'Car Verify Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Verify - Vehicle Report Australia",
    description: "Professional vehicle reports for Australian car buyers. PPSR checks, VIN verification, stolen car checks.",
    creator: '@carverifyau',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Ads Conversion Tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17728735517"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17728735517');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Route } from "next";
import { Suspense } from "react";
import Script from "next/script";
import AuthRedirectHandler from "@/components/AuthRedirectHandler";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-459EY5MHDQ";

export const metadata: Metadata = {
  title: {
    default: "Xenco Labs - AI-Powered Products & Services",
    template: "%s | Xenco Labs",
  },
  description:
    "AI-powered products and services that replace entire departments. BlogCraft, ResumeCo, LandingCraft, and more.",
  metadataBase: new URL("https://xencolabs.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xencolabs.com",
    siteName: "Xenco Labs",
    title: "Xenco Labs - AI-Powered Products & Services",
    description:
      "AI-powered products and services that replace entire departments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xenco Labs - AI-Powered Products & Services",
    description:
      "AI-powered products and services that replace entire departments.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "sc-domain:xencolabs.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Primary domain sign-in/sign-up URLs
  const primarySignInUrl = '/sign-in'
  const primarySignUpUrl = '/sign-up'
  
  // All satellite domains that can redirect back
  const satelliteUrls = [
    'https://resumecoach.me',
    'https://dev.resumecoach.me',
    'https://blogcraft.app',
    'https://landingcraft.app',
    'https://promptmarketer.app',
    'https://blogcraft.org',
    'https://reresume.app',
    'https://www.resumecoach.me',
    'https://www.blogcraft.app',
    'https://www.landingcraft.app',
    'https://www.promptmarketer.app',
    'https://www.blogcraft.org',
    'https://www.reresume.app'
  ]

  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>
      </head>
      <body className="bg-background text-foreground">
        <ClerkProvider
          signInUrl={primarySignInUrl}
          signUpUrl={primarySignUpUrl}
          allowedRedirectOrigins={satelliteUrls}
        >
          {/* Global handler for satellite domain redirects */}
          <Suspense fallback={null}>
            <AuthRedirectHandler />
          </Suspense>
          
          <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
              <Link href={"/" as Route} className="font-semibold text-xl gradient-text">Xenco Labs</Link>
              <nav className="flex items-center gap-6">
                <Link className="link" href={"/apps" as Route}>Apps</Link>
                <Link className="link" href={"/services" as Route}>Services</Link>
                <SignedOut>
                  <Link className="btn" href={"/sign-in" as Route}>Sign in</Link>
                </SignedOut>
                <SignedIn>
                  <Link className="btn" href={"/dashboard" as Route}>Dashboard</Link>
                  <UserButton afterSignOutUrl={"/" as Route} />
                </SignedIn>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t">
            <div className="container py-8 text-sm text-gray-600">
              © {new Date().getFullYear()} Xenco Labs · All rights reserved.
            </div>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  );
}

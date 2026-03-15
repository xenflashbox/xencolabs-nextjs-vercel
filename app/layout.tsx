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
    default: "Xenco Labs - AI Product Studio",
    template: "%s | Xenco Labs",
  },
  description:
    "Xenco Labs is a founder-led product studio building AI-powered tools. BlogCraft, ResumeCoach, ImageCrafter, and more.",
  metadataBase: new URL("https://xencolabs.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xencolabs.com",
    siteName: "Xenco Labs",
    title: "Xenco Labs - AI Product Studio",
    description:
      "A founder-led product studio building AI-powered tools that ship to production.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xenco Labs - AI Product Studio",
    description:
      "A founder-led product studio building AI-powered tools that ship to production.",
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
  const primarySignInUrl = '/sign-in'
  const primarySignUpUrl = '/sign-up'

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
        {/* Google Fonts — Design System */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
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
      <body className="font-body">
        <ClerkProvider
          signInUrl={primarySignInUrl}
          signUpUrl={primarySignUpUrl}
          allowedRedirectOrigins={satelliteUrls}
        >
          <Suspense fallback={null}>
            <AuthRedirectHandler />
          </Suspense>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

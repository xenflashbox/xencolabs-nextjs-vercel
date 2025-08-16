import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Route } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xenco Labs",
  description: "AI-powered products and services by Xenco Labs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Primary domain sign-in/sign-up URLs
  const primarySignInUrl = '/sign-in'
  const primarySignUpUrl = '/sign-up'
  
  // All satellite domains that can redirect back
  const satelliteUrls = [
    'https://resumecoach.me',
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
      <body className="bg-background text-foreground">
        <ClerkProvider
          signInUrl={primarySignInUrl}
          signUpUrl={primarySignUpUrl}
          allowedRedirectOrigins={satelliteUrls}
        >
          <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
              <Link href={"/" as Route} className="font-semibold text-xl gradient-text">Xenco Labs</Link>
              <nav className="flex items-center gap-6">
                <Link className="link" href={"/apps" as Route}>Apps</Link>
                <Link className="link" href={"/services" as Route}>Services</Link>
                {/* C1 Lab temporarily removed */}
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

import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xenco Labs",
  description: "AI-powered products and services by Xenco Labs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
              <Link href="/" className="font-semibold text-xl">Xenco Labs</Link>
              <nav className="flex items-center gap-6">
                <Link className="link" href="/apps">Apps</Link>
                <Link className="link" href="/services">Services</Link>
                <Link className="link" href="/labs/c1">C1 Lab</Link>
                <SignedOut>
                  <Link className="btn" href="/sign-in">Sign in</Link>
                </SignedOut>
                <SignedIn>
                  <Link className="btn" href="/dashboard">Dashboard</Link>
                  <UserButton afterSignOutUrl="/" />
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
        </body>
      </html>
    </ClerkProvider>
  );
}

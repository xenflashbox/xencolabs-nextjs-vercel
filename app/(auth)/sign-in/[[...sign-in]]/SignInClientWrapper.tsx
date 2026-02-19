"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";

interface Brand {
  name: string;
  color: string;
  tagline: string;
}

interface Props {
  brand: Brand;
  redirectUrl?: string;
  isAuthenticated: boolean;
}

export default function SignInClientWrapper({ brand, redirectUrl, isAuthenticated }: Props) {
  // If user is already authenticated and there's a redirect URL, redirect immediately
  useEffect(() => {
    if (isAuthenticated && redirectUrl) {
      console.log("[SignInClientWrapper] User authenticated, redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    }
  }, [isAuthenticated, redirectUrl]);

  // Show loading state while redirecting
  if (isAuthenticated && redirectUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Redirecting...</h1>
          <p className="text-muted-foreground">Taking you back to {brand.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-50">
      <header className="w-full max-w-3xl mb-6 px-6 text-center">
        <h1 className="text-2xl font-bold">{brand.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">{brand.tagline}</p>
      </header>

      <SignIn
        appearance={{
          variables: { colorPrimary: brand.color },
          elements: { card: "shadow-xl border", headerTitle: "text-xl" },
        }}
        routing="path"
        path="/sign-in"
      />
    </div>
  );
}

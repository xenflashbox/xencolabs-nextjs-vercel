"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface Brand {
  name: string;
  color: string;
  tagline: string;
}

export default function SignInClient({ brand }: { brand: Brand }) {
  const { isSignedIn, isLoaded } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const redirectUrl = searchParams.get("redirect_url");

  // When auth state changes and user is signed in, redirect
  useEffect(() => {
    if (isLoaded && isSignedIn && redirectUrl) {
      console.log("[SignInClient] User signed in, redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    }
  }, [isLoaded, isSignedIn, redirectUrl]);

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

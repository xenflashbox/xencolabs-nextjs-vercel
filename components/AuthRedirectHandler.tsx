"use client";

import { useAuth } from "@clerk/nextjs";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const REDIRECT_STORAGE_KEY = "clerk_satellite_redirect_url";

export default function AuthRedirectHandler() {
  const { isSignedIn, isLoaded } = useAuth();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const hasRedirected = useRef(false);
  
  const redirectUrlFromQuery = searchParams.get("redirect_url");

  useEffect(() => {
    // Store redirect_url in sessionStorage when we see it
    if (redirectUrlFromQuery) {
      console.log("[AuthRedirectHandler] Storing redirect_url:", redirectUrlFromQuery);
      sessionStorage.setItem(REDIRECT_STORAGE_KEY, redirectUrlFromQuery);
    }
  }, [redirectUrlFromQuery]);

  useEffect(() => {
    // After auth loads and user is signed in, check for stored redirect
    if (isLoaded && isSignedIn && !hasRedirected.current) {
      // First check query param, then sessionStorage
      const redirectUrl = redirectUrlFromQuery || sessionStorage.getItem(REDIRECT_STORAGE_KEY);
      
      if (redirectUrl) {
        console.log("[AuthRedirectHandler] User signed in, redirecting to:", redirectUrl);
        hasRedirected.current = true;
        // Clear the stored URL
        sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
        // Redirect
        window.location.href = redirectUrl;
      }
    }
  }, [isLoaded, isSignedIn, redirectUrlFromQuery]);

  return null;
}

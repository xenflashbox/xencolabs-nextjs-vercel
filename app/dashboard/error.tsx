"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Route } from "next";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <section className="section">
      <div className="container">
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-red-700">
            Something went wrong!
          </h2>
          <p className="mt-4 text-red-600">
            We encountered an error while loading your dashboard.
          </p>
          <div className="mt-6 space-y-2">
            <button
              onClick={reset}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try again
            </button>
            <div className="pt-2">
              <Link 
                href={"/" as Route}
                className="text-red-600 underline hover:text-red-800"
              >
                Return to home page
              </Link>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white rounded border text-left text-sm">
            <p className="font-medium">Error information:</p>
            <p className="font-mono text-xs mt-1 text-gray-600">
              {error.message || "An unexpected error occurred"}
              {error.digest && (
                <span className="block mt-1 text-gray-500">
                  Digest: {error.digest}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

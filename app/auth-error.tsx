"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Route } from "next";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Auth Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-red-100 bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h2>
        <p className="mb-6 text-gray-700">
          There was a problem with authentication. This could be due to:
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600">
          <li>Missing or expired session</li>
          <li>Server configuration issue</li>
          <li>Temporary service disruption</li>
        </ul>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => reset()}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try again
          </button>
          <Link href={"/" as Route} className="text-center text-blue-600 hover:underline">
            Return to home page
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">Debug information:</p>
            <p className="mt-2 text-xs text-gray-500">{error.message}</p>
            {error.digest && (
              <p className="mt-1 text-xs text-gray-500">Digest: {error.digest}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md rounded-lg border border-red-100 bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-red-600">Application Error</h2>
            <p className="mb-6 text-gray-700">
              An unexpected error has occurred. We've been notified and are working to fix it.
            </p>
            <button
              onClick={() => reset()}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try Again
            </button>
            
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
      </body>
    </html>
  );
}
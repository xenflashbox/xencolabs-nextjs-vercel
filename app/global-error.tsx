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
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);
 
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-700">
              Something went wrong!
            </h2>
            <p className="mt-4 text-red-600">
              Sorry, we encountered a critical error.
            </p>
            <div className="mt-6">
              <button
                onClick={reset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Try again
              </button>
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
      </body>
    </html>
  );
}

"use client";
import { useEffect, useState } from "react";
// Use the mock implementation directly to avoid SDK import issues
import { C1Chat } from "@/lib/c1-mock";
import { ErrorBoundary } from "@/lib/ErrorBoundary";

// Loading fallback component
function ChatLoading() {
  return (
    <div className="p-4 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" 
           role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <p className="mt-2">Loading C1 Chat...</p>
    </div>
  );
}

export default function Page() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // For demo, always set a placeholder API key
    setApiKey('demo-api-key');
    
    // Mark as loaded after a small delay to ensure client-side hydration
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <section className="section">
        <div className="container">
          <h1 className="text-3xl font-bold">C1 Lab</h1>
          <p className="mt-2 text-gray-700">
            A minimal C1 Chat surface for quick experiments.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
            <p className="text-blue-700 font-semibold">Currently using mock implementation</p>
            <p className="text-sm text-blue-600 mt-1">
              The real C1 SDK integration will be available soon.
            </p>
          </div>
          
          <div className="card mt-6">
            {!isLoaded ? (
              <ChatLoading />
            ) : (
              <C1Chat
                apiKey={apiKey || 'demo-key'}
                title="Xenco Labs — C1 Sandbox"
                instructions="You are a helpful AI lab assistant."
                initialMessages={[{ role: "user", content: "Hello C1! Can you explain what you can do?" }]}
              />
            )}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}

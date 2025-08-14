"use client";
import { useEffect, useState, Suspense } from "react";
import { C1Chat } from "@/lib/c1-sdk-wrapper";
import { ErrorBoundary } from "@/lib/ErrorBoundary";

// Separate component for the chat to help with hydration issues
function ChatComponent({ apiKey }: { apiKey: string }) {
  return (
    <C1Chat
      apiKey={apiKey}
      title="Xenco Labs — C1 Sandbox"
      instructions="You are a helpful AI lab assistant."
      initialMessages={[{ role: "user", content: "Hello C1! Can you explain what you can do?" }]}
    />
  );
}

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
    // Set API key
    setApiKey(process.env.NEXT_PUBLIC_THESYS_API_KEY ?? null);
    
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
            A minimal C1 Chat surface for quick experiments. Provide a valid C1 API key in <code>.env</code>.
          </p>
          
          <div className="card mt-6">
            {!apiKey ? (
              <p className="text-gray-700">Set <code>NEXT_PUBLIC_THESYS_API_KEY</code> in your environment to enable this page.</p>
            ) : !isLoaded ? (
              <ChatLoading />
            ) : (
              <Suspense fallback={<ChatLoading />}>
                <ChatComponent apiKey={apiKey} />
              </Suspense>
            )}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}

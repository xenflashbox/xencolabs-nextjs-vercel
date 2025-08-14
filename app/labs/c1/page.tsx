"use client";
import { useEffect, useState } from "react";
import { C1Chat } from "@/lib/c1-mock";

export default function Page() {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    setApiKey(process.env.NEXT_PUBLIC_THESYS_API_KEY ?? null);
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">C1 Lab</h1>
        <p className="mt-2 text-gray-700">
          A minimal C1 Chat surface for quick experiments. Provide a valid C1 API key in <code>.env</code>.
        </p>
        <div className="card mt-6">
          {!apiKey ? (
            <p className="text-gray-700">Set <code>NEXT_PUBLIC_THESYS_API_KEY</code> in your environment to enable this page.</p>
          ) : (
            <C1Chat
              apiKey={apiKey!}
              title="Xenco Labs — C1 Sandbox"
              instructions="You are a helpful AI lab assistant."
              initialMessages={[{ role: "user", content: "Hello C1! Can you explain what you can do?" }]}
            />
          )}
        </div>
      </div>
    </section>
  );
}

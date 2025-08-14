"use client";
import { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">C1 Lab</h1>
        <p className="mt-2 text-gray-700">
          A sandbox for AI experimentation.
        </p>
        
        <div className="bg-amber-50 p-4 rounded-lg my-6 border border-amber-200">
          <h2 className="text-lg font-semibold text-amber-800">Coming Soon</h2>
          <p className="mt-2 text-amber-700">
            The C1 SDK integration is temporarily disabled while we resolve compatibility issues with Next.js App Router.
          </p>
          <p className="mt-2 text-amber-700">
            Check back soon for updates or contact us for more information.
          </p>
        </div>
        
        <div className="card mt-6">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-medium">Leave a message</h3>
            <p className="text-gray-600">
              Have suggestions for what you'd like to see in the C1 Lab? Let us know!
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 min-h-[120px]"
              placeholder="Your feedback or suggestions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button 
              className="btn btn-primary self-start"
              onClick={() => {
                alert("Thanks for your feedback! We'll review it soon.");
                setMessage("");
              }}
            >
              Submit Feedback
            </button>
          </div>
        </div>
        
        {/* 
          C1 SDK INTEGRATION PLACEHOLDER
          The code below is commented out but preserved for future reimplementation
          
          import { C1Chat } from "@/lib/c1-sdk-wrapper";
          // or import { C1Chat } from "@/lib/c1-mock";
          
          <div className="card mt-6">
            <C1Chat
              apiKey={process.env.NEXT_PUBLIC_THESYS_API_KEY || 'demo-key'}
              title="Xenco Labs — C1 Sandbox"
              instructions="You are a helpful AI lab assistant."
              initialMessages={[{ role: "user", content: "Hello C1! Can you explain what you can do?" }]}
            />
          </div>
        */}
      </div>
    </section>
  );
}
"use client";

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">C1 Lab</h1>
        <p className="mt-2 text-gray-700">
          A minimal C1 Chat surface for quick experiments. Provide a valid C1 API key in <code>.env</code>.
        </p>
        <div className="card mt-6 p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-700">C1 Chat component temporarily unavailable.</p>
          <p className="text-sm text-gray-500 mt-2">The @thesysai/genui-sdk dependency has been removed to fix build issues.</p>
        </div>
      </div>
    </section>
  );
}

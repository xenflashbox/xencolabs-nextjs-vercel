"use client";
import * as React from 'react';
import { ErrorBoundary } from '../ErrorBoundary';

// Import the mock implementation to use as a fallback
import { C1Chat as MockC1Chat } from './c1-mock';

/**
 * Attempt to export the real C1Chat from @thesis/c1-sdk if available,
 * otherwise export the mock implementation
 */
let RawC1Chat: React.ComponentType<any>;

try {
  // Try to dynamically import from @thesis/c1-sdk
  const ThesisSDK = require('@thesis/c1-sdk');
  RawC1Chat = ThesisSDK.C1Chat;
  
  // If C1Chat is not available in the imported module, use the mock
  if (!RawC1Chat) {
    console.warn('C1Chat not found in @thesis/c1-sdk, using mock implementation');
    RawC1Chat = MockC1Chat;
  }
} catch (error) {
  console.warn('Failed to import @thesis/c1-sdk, using mock implementation', error);
  RawC1Chat = MockC1Chat;
}

// Wrap the C1Chat component with an error boundary
export const C1Chat = (props: any) => {
  const [error, setError] = React.useState<Error | null>(null);
  
  // Provide a more detailed fallback UI
  const fallbackUI = (
    <div className="p-6 border border-amber-200 rounded-lg bg-amber-50">
      <h2 className="text-lg font-semibold text-amber-700">C1Chat Error</h2>
      <p className="mt-2 text-amber-600">
        {error?.message || "There was a problem loading the C1 chat component."}
      </p>
      <div className="mt-4 p-3 bg-white rounded border border-amber-100">
        <h3 className="text-sm font-medium">Troubleshooting:</h3>
        <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
          <li>Make sure NEXT_PUBLIC_THESYS_API_KEY is set in your environment</li>
          <li>Check that the private npm registry is accessible</li>
          <li>Verify that '@thesis/c1-sdk' is properly installed</li>
        </ul>
      </div>
    </div>
  );

  // Handle errors in initialization
  React.useEffect(() => {
    try {
      // Test that the component is properly initialized
      if (typeof RawC1Chat !== 'function') {
        throw new Error('C1Chat component is not properly initialized');
      }
    } catch (e) {
      setError(e as Error);
      console.error('Error initializing C1Chat:', e);
    }
  }, []);

  if (error) {
    return fallbackUI;
  }

  // Wrap with error boundary for runtime errors
  return (
    <ErrorBoundary fallback={fallbackUI}>
      <RawC1Chat {...props} />
    </ErrorBoundary>
  );
};

// Export some common Lucide icons that the SDK might use
import { Search, User, Settings } from 'lucide-react';
export { Search, User, Settings };

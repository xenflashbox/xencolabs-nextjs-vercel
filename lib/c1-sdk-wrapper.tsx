"use client";
import * as React from 'react';

// Import the mock implementation to use as a fallback
import { C1Chat as MockC1Chat } from './c1-mock';

/**
 * Attempt to export the real C1Chat from @thesis/c1-sdk if available,
 * otherwise export the mock implementation
 */
let C1Chat: React.ComponentType<any>;

try {
  // Try to dynamically import from @thesis/c1-sdk
  const ThesisSDK = require('@thesis/c1-sdk');
  C1Chat = ThesisSDK.C1Chat;
  
  // If C1Chat is not available in the imported module, use the mock
  if (!C1Chat) {
    console.warn('C1Chat not found in @thesis/c1-sdk, using mock implementation');
    C1Chat = MockC1Chat;
  }
} catch (error) {
  console.warn('Failed to import @thesis/c1-sdk, using mock implementation', error);
  C1Chat = MockC1Chat;
}

export { C1Chat };

// Export some common Lucide icons that the SDK might use
export { 
  Search,
  User,
  Settings,
} from 'lucide-react';

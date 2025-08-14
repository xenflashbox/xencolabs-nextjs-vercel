// lib/c1-sdk-wrapper.js
import * as React from 'react';

// Polyfill for dynamicIconImports if needed
if (typeof window !== 'undefined' && !window.__lucideDynamicIconImports) {
  window.__lucideDynamicIconImports = {};
}

// Re-export the C1 SDK with compatibility fixes
export * from '@thesis/c1-sdk';

// If the SDK expects specific icon imports, you can add them here
export { 
  Search,
  User,
  Settings,
  // ... other icons
} from 'lucide-react';

// Zustand compatibility helper
export const createStore = (storeCreator) => {
  try {
    // Try the new import first
    const { create } = require('zustand');
    return create(storeCreator);
  } catch (e) {
    // Fallback to legacy import
    const create = require('zustand').default;
    return create(storeCreator);
  }
};

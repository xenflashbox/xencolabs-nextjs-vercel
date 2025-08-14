"use client";
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-6 border border-red-200 rounded-lg bg-red-50">
          <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
          <p className="mt-2 text-red-600">{this.state.error?.message || 'An unknown error occurred'}</p>
          <p className="mt-4 text-sm text-gray-600">Check the browser console for more details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

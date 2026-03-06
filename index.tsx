
import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * ErrorBoundary component to catch rendering errors and show a fallback UI.
 */
// Fix: Inherit directly from the imported 'Component' class to ensure 'props' and 'state' are correctly identified by TypeScript.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong.</h1>
          <p className="text-slate-600 mb-6">We encountered a problem while loading the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg"
          >
            Reload Page
          </button>
        </div>
      );
    }

    // Fix: By correctly inheriting from Component, 'this.props' is now recognized by the TypeScript compiler.
    return this.props.children || null;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

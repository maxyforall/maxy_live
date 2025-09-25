import React, { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              padding: '0.75rem 1rem',
              fontSize: '0.9rem',
              fontWeight: 500,
            },
            success: { iconTheme: { primary: '#50A8FF', secondary: '#1f2937' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#1f2937' } },
            loading: { iconTheme: { primary: '#8ECAE6', secondary: '#1f2937' } },
          }}
        />
    </>
  );
}

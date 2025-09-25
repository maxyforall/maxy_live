import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "./providers/UserProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
      {/* <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937', // neutral-800
                color: '#fff',
                border: '1px solid #374151', // neutral-700
                borderRadius: '0.75rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                fontWeight: 500,
              },
              success: {
                iconTheme: {
                  primary: '#50A8FF',
                  secondary: '#1f2937',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#1f2937',
                },
              },
              loading: {
                iconTheme: {
                  primary: '#8ECAE6',
                  secondary: '#1f2937',
                },
              },
            }}
          /> */}
      <Footer />
      </div>
    </UserProvider>
  );
}

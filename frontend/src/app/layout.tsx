import type { Metadata } from "next";
import "./globals.css";
import { Outfit, Poppins, Afacad, Figtree, Satisfy, Lato, Dancing_Script, Josefin_Sans } from "next/font/google";

// Font setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-poppins" });
const afacad = Afacad({ subsets: ["latin"], variable: "--font-afacad" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const satisfy = Satisfy({ subsets: ["latin"], weight: ["400"], variable: "--font-satisfy" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400"], variable: "--font-dancing" });
const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-josefin" });

export const metadata: Metadata = {
  title: "Maxy",
  description: "Create and Serve",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${poppins.variable} ${afacad.variable} ${figtree.variable} ${satisfy.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

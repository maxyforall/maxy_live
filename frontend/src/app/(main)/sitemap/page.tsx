"use client";

import Link from "next/link";
import React from "react";
import "@/app/globals.css";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";



interface SitemapLink {
  path: string;
  name: string;
  category: string;
}

interface GroupedLinks {
  [key: string]: SitemapLink[];
}

const sitemapLinks: SitemapLink[] = [
 { path: "/", name: "Home", category: "Main" },
 { path: "/about", name: "About", category: "Main" },
 { path: "/account", name: "Account", category: "Main" },
 { path: "/brand", name: "Brand", category: "Main" },

 { path: "/corex", name: "Corex", category: "Corex" },
 { path: "/corex/dashboard", name: "Dashboard", category: "Corex" },
 { path: "/corex/keeropedia", name: "Keeropedia", category: "Corex" },
 { path: "/corex/thrillopia", name: "Thrillopia", category: "Corex" },

 { path: "/productivity", name: "Productivity", category: "Worlds" },
 { path: "/productivity/tackle", name: "Tackle", category: "Products" },

 { path: "/lifestyle", name: "Lifestyle", category: "Worlds" },
 { path: "/lifestyle/reveion", name: "Reveion", category: "Products" },

 { path: "/woc", name: "WoC", category: "WoC" },

 { path: "/sign-in", name: "Sign In", category: "Auth" },
 { path: "/sign-up", name: "Sign Up", category: "Auth" },

 { path: "/support", name: "Support", category: "Support" },
 { path: "/contact", name: "Contact", category: "Support" },
 { path: "/support/faq", name: "FAQ", category: "Support" },
 { path: "/support/faq/maxy", name: "Maxy FAQ", category: "Support" },
//  { path: "/support/faq/corex", name: "Corex FAQ", category: "Support" },
//  { path: "/support/faq/woc", name: "WoC FAQ", category: "Support" },

 { path: "/privacy-policy", name: "Privacy Policy", category: "Legal" },
 { path: "/terms-of-service", name: "Terms of Service", category: "Legal" },
 { path: "/cookie-policy", name: "Cookie Policy", category: "Legal" },
//  { path: "/corex/terms-of-use", name: "Corex - Terms of Use", category: "Legal" },
//  { path: "/woc/terms-of-use", name: "WoC - Terms of Use", category: "Legal" },
//  { path: "/productivity/tackle/terms-of-use", name: "Tackle - Terms of Use", category: "Legal" },
//  { path: "/lifestyle/reveion/terms-of-use", name: "Reveion - Terms of Use", category: "Legal" },
];

const groupedLinks: GroupedLinks = sitemapLinks.reduce((acc: GroupedLinks, link: SitemapLink) => {
  if (!acc[link.category]) acc[link.category] = [];
  acc[link.category].push(link);
  return acc;
}, {});

// Define custom display order
const categoryOrder = [
  "Main",
  // "Corex",
  // "WoC",
  "Worlds",
  // "Products",
  "Auth",
  "Support",
  "Legal",
];



export default function SiteMap() {
   const [loading, setIsLoading] = useState(true);

   useEffect(() => {
       // Simulate loading delay
       const timer = setTimeout(() => {
         setIsLoading(false);
       }, 2000);
   }, []);

  if (loading) {
    return <Loading />;
  }
  
  return (
    <main className="min-h-screen p-4 mt-18 bg-[#0a0a0a] text-[#e0e0e0]">
      <div className="max-w-6xl mx-auto">
        
        <h3 className="hidden sm:block text-3xl font-semibold mb-8 border-b border-[#333] pb-4">Site Map</h3>
        <h4 className="block sm:hidden text-3xl font-semibold mb-8 border-b border-[#333] pb-4">Site Map</h4>



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryOrder.map((category) => {
            const links = groupedLinks[category];
            if (!links) return null;

            return (
              <div key={category}>
                <h4 className="hidden sm:block text-xl font-medium mb-3 border-b border-[#333] pb-1">
                  {category}
                </h4>
                <h5 className="block sm:hidden text-xl font-medium mb-3 border-b border-[#333] pb-1">
                  {category}
                </h5>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className="text-[#60a5fa] hover:underline hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

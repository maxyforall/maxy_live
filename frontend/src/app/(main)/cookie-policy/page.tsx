"use client";

import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import Loading from '../components/Loading';

export default function CookiePolicy() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex max-w-screen-xl mx-auto px-4 py-16 mt-16 mb-16 text-secondary">
      {/* Left Sidebar */}
      <aside className="w-70 mr-10 hidden md:block sticky top-20 self-start">
        <div className="mb-8">
          {/* Maxy Branding */}
          <h4 className="text-3xl mb-6 text-primary">Cookie Policy</h4>
          <p className="text-secondary"><strong>Effective from:</strong> September 24, 2025</p>
          <p className="text-secondary mt-2"><strong> Applies to: </strong><strong><a href="https://maxy.co.in" className="font-medium text-[#6CB4EE]  cursor-pointer">maxy.co.in</a></strong></p>
          
        </div>
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
          <nav className="text-sm space-y-3 flex flex-col">
            <a href="#Whatarecookies?" className="block text-secondary hover:text-primary transition-colors duration-200">1. What are cookies, and what does this policy cover?</a>
            <a href="#Whyusecookies?" className="block text-secondary hover:text-primary transition-colors duration-200">2. Why do we use cookies?</a>
            <a href="#Wheredoweusecookies?" className="block text-secondary hover:text-primary transition-colors duration-200">3. Where do we use cookies?</a>
            <a href="#DoothercompaniesusecookiesinMaxyservices?" className="block text-secondary hover:text-primary transition-colors duration-200">4. Do other companies use cookies in Maxy services?</a>
            <a href="#Howcanyoucontrolcookies?" className="block text-secondary hover:text-primary transition-colors duration-200">5. How can you control cookies?</a>
            <a href="#UpdatestothisPolicy" className="block text-secondary hover:text-primary transition-colors duration-200">6. Updates to this Policy</a>
            <a href="#ContactUs" className="block text-secondary hover:text-primary transition-colors duration-200">7. Contact Us</a>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className=" flex-1 space-y-6 mb-10 mt-2 md:mt-12 animate-slide-up">
        <div className="block md:hidden mb-8">
          {/* Maxy Branding */}
          <h4 className="text-3xl mb-6 text-primary">Cookie Policy</h4>
          <p className="text-secondary"><strong>Effective from:</strong> September 24, 2025</p>
          <p className="text-secondary mt-2"><strong> Applies to: </strong><strong><a href="https://maxy.co.in" className="font-medium text-[#6CB4EE]  cursor-pointer">maxy.co.in</a></strong></p>
          
        </div>
        
        <h5 id="Whatarecookies?" className="text-2xl mt-2 mb-4 text-primary">1. What are cookies, and what does this policy cover?</h5>
        <p className="mb-4 text-secondary">
          Cookies are small text files stored in your browser or device when you visit websites. These files store information such as your preferences, login status, or how you interact with certain features. Other similar technologies, such as device identifiers, session storage, or scripts, serve similar purposes. In this policy, we refer to all of these as “cookies.”
        </p>
        <p className="mb-4 text-secondary">
          This Cookie Policy explains how Maxy (“we,” “our,” or “us”) uses cookies on the Maxy website. It also describes how you can control your cookie preferences.
        </p>
        <p className="mb-4 text-secondary">
          Maxy does not use cookies for behavioral advertising or personal tracking across third-party sites.
        </p>

        <h5 id="Whyusecookies?" className="text-2xl mt-8 mb-4 text-primary">2. Why do we use cookies?</h5>
        <h6 className="text-lg font-medium mt-4 mb-2 text-primary">Cookies help us:</h6>
        <ul className="list-disc pl-6 mb-4 text-secondary">
          <li>Authenticate your<strong> Maxy ID </strong>and keep you securely logged in</li>
          <li>Maintain your preferences (such as dark/light theme) across visits</li>
          <li>Monitor website performance, fix bugs, and enhance stability</li>
          <li>Understand user behavior to improve content and user experience</li>
        </ul>
        <h6 className="text-lg font-medium mt-4 mb-2 text-primary">We use both:</h6>
        <ul className="list-disc pl-6 mb-4 text-secondary">
          <li><strong>Session cookies:</strong> expire when you close your browser</li>
          <li><strong>Persistent cookies:</strong> remain stored until they expire or you delete them</li>
        </ul>
        <p>
          Maxy does not use cookies for third-party advertising, retargeting, or cross-platform data collection
        </p>

        <h5 id="Wheredoweusecookies?" className="text-2xl    mt-8 mb-4 text-primary">3. Where do we use cookies?</h5>
        <h6 className="text-lg font-medium mt-4 mb-2 text-primary">Cookies may be stored on your device when you:</h6>
        
        <ul className="list-disc pl-6 mb-4 text-secondary">
          <li>Visit: <a href="https://maxy.co.in" className="font-medium text-[#6CB4EE]  cursor-pointer">maxy.co.in</a></li>
          <li>Log in or interact with services requiring your Maxy ID</li>
        </ul>
        

        <h5 id="DoothercompaniesusecookiesinMaxyservices?" className="text-2xl    mt-8 mb-4 text-primary">4. Do other companies use cookies in Maxy services?</h5>
        <h6 className="text-lg font-medium mt-4 mb-2 text-primary">We may use cookies from trusted third-party service providers to:</h6>
        <ul className="list-disc pl-6 mb-4 text-secondary">
          <li>Analyze website performance (e.g., via Google Analytics)</li>
          <li>Provide secure authentication to detect fraud</li>
        </ul>
        <p>
          These services may set their own cookies. Maxy does not share user-identifiable data with them, but your browser may still send technical data (such as your IP address or browser version). Please check their respective policies for more information.
        </p>
        <h5 id="Howcanyoucontrolcookies?" className="text-2xl    mt-8 mb-4 text-primary">5. How can you control cookies?</h5>
        <h6 className="text-lg font-medium mt-4 mb-2 text-primary">You can manage or delete cookies through your browser settings. Most browsers allow you to:</h6>
        <ul className="list-disc pl-6 mb-4 text-secondary">
          <li>Block all or specific cookies</li>
          <li>Receive alerts when a website tries to store cookies</li>
          <li>Delete stored cookies at any time</li>
        </ul>
        <h6 className="text-lg font-medium mt-4 mb-2 text-primary">Additionally, you may:</h6>
        <ul className="list-disc pl-6 mb-4 text-secondary">
          <li>Use the Google Analytics Opt-out Browser Add-on to prevent analytics tracking</li>
          <li>Disable JavaScript to restrict non-essential scripts (note: this may break some website features)</li>
        </ul>
        <p><strong>Warning:</strong> Blocking essential cookies may limit your ability to log in or use personalized features via your Maxy ID.</p>

        <h5 id="UpdatestothisPolicy" className="text-2xl    mt-2 mb-4 text-primary">6. Updates to this Policy</h5>
        <p className="mb-4 text-secondary">
          We may update this Cookie Policy periodically to reflect technical, legal, or operational changes. When we do, we will update the “Effective Date” above. Major changes will be announced via website notice or your Maxy ID dashboard.
        </p>

        <h5 id="ContactUs" className="text-2xl    mt-8 mb-4 text-primary">7. Contact Us</h5>
        <h6 className="text-lg font-small mt-4 mb-2 text-primary">If you have questions about this Cookie Policy or how Maxy uses cookies:</h6>
        <ul className="space-mb-4 pl-6 mb-4 text-secondary">
          <li><strong className="text-primary">Email: </strong>support@maxy.co.in</li>
          <li><strong  className="text-primary">Website: </strong> <a href="https://maxy.co.in" className="font-medium text-[#6CB4EE]  cursor-pointer">maxy.co.in</a></li>
        </ul>
      </div>
    </div>
  );
}
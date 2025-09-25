'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import "@/app/globals.css";

export default function NotFound() {
  return (
    <div className="h-screen bg-[#0a0a0a] text-center text-white flex flex-col">

      {/* Centered Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 mb-16 sm:mb-20">

        {/* Logo */}
        <div className="w-full flex justify-center items-center mt-6 mb-4 sm:mt-8 sm:mb-6">
          <Image
            src="/brand/W_logo.png"
            alt="Maxy Logo"
            width={40}
            height={40}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"  // responsive logo
          />
        </div>

        {/* Lottie Animation */}
        <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] h-auto mb-6">
          <DotLottieReact
            src="https://lottie.host/60b57959-4ef1-4faf-b98a-bb7f8b531f44/gt21tJeNts.lottie"
            loop
            autoplay
          />
        </div>

        {/* Headings and Text */}
        <h3 className="hidden sm:block text-xl sm:text-2xl md:text-3xl font-medium mb-3 text-gray-300">
          Page not found
        </h3>
        <h4 className="block sm:hidden text-xl sm:text-2xl md:text-3xl font-medium mb-3 text-gray-300">
          Page not found
        </h4>

        <p className="text-gray-400 mb-8 max-w-sm sm:max-w-md text-sm sm:text-base">
          This page doesn't exist. Let's guide you back to where you need to be.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/"
            className="bg-gray-200 text-gray-900 px-5 py-2.5 sm:px-6 sm:py-3 rounded-[20px] font-medium hover:bg-white transition-colors"
          >
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="border border-gray-500 text-gray-200 px-5 py-2.5 sm:px-6 sm:py-3 rounded-[20px] font-medium hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

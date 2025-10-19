"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#0a0a0a] backdrop-blur-md text-white px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto py-8">
        {/* Mobile Layout - Logo Section - Always visible */}
        <div className="flex flex-col items-center md:hidden gap-4 mb-8">
          <Link href="/" className="flex items-center mb-6 mt-3">
            <Image src="/brand/maxy_pry.png" alt="Maxy Logo" width={100} height={40} />
            {/* <Image src="/brand/VW_Maxy-full.png" alt="Maxy Logo" width={90} height={40} /> */}
          </Link>
        </div>

        {/* Desktop Layout - Logo, Social Media, and Links in Row */}
        <div className="hidden md:flex md:items-start md:justify-between mb-12">
          {/* Logo and Social Media Section */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center pr-4 pb-4  hover:opacity-80 transition-opacity duration-200">
              <Image src="/brand/maxy_pry.png" alt="Maxy Logo" width={95} height={40} />
              {/* <Image src="/brand/VW_Maxy-full.png" alt="Maxy Logo" width={100} height={40} /> */}
            </Link>
          </div>

          {/* Links Groups */}
          <div className="grid grid-cols-3 gap-x-64 gap-y-8 text-left">
            {/* Productivity and Lifestyle Group */}
            <div className="flex flex-col items-start">
              <h6 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                Worlds
              </h6>
              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <Link href="/productivity" className="hover:text-white transition-colors duration-200">
                  Productivity
                </Link>
                <Link href="/lifestyle" className="hover:text-white transition-colors duration-200">
                  Lifestyle
                </Link>
              </div>
            </div>

            {/* Platform Section */}
            {/* <div className="flex flex-col items-start">
              <h6 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                Platforms
              </h6>
              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <Link href="/corex" className="hover:text-white transition-colors duration-200">
                  Corex
                </Link>
                <Link href="/woc" className="hover:text-white transition-colors duration-200">
                  WoC
                </Link>
              </div>
            </div> */}



            {/* Support Group */}
            <div className="flex flex-col items-start">
              <h6 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                Support
              </h6>
              <div className="flex flex-col gap-2 text-sm text-gray-300">

                <Link href="/support" className="hover:text-white transition-colors duration-200">
                  Support Center
                </Link>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Contact
                </Link>
                <Link href="/support/faq" className="hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </div>
            </div>

            {/* About and Contact Group */}
            <div className="flex flex-col items-start">
              <h6 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                Company
              </h6>
              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About
                </Link>

                <Link href="/brand" className="hover:text-white transition-colors duration-200">
                  Brand
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Accordion Layout */}
        <div className="md:hidden space-y-1">
          {/* Worlds Section */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('worlds')}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <h6 className="font-regular text-white">Worlds</h6>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openSection === 'worlds' ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'worlds' ? 'max-h-40 pb-4' : 'max-h-0'
              }`}>
              <div className="flex flex-col gap-3 text-sm text-gray-300 pl-4">
                <Link href="/productivity" className="hover:text-white transition-colors duration-200">
                  Productivity
                </Link>
                <Link href="/lifestyle" className="hover:text-white transition-colors duration-200">
                  Lifestyle
                </Link>
              </div>
            </div>
          </div>

          {/* Platform Section */}
          {/* <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('platform')}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <h6 className="font-regular text-white">Platforms</h6>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openSection === 'platform' ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'platform' ? 'max-h-40 pb-4' : 'max-h-0'
              }`}>
              <div className="flex flex-col gap-3 text-sm text-gray-300 pl-4">
                <Link href="/corex" className="hover:text-white transition-colors duration-200">
                  Corex
                </Link>
                <Link href="/woc" className="hover:text-white transition-colors duration-200">
                  WoC
                </Link>
              </div>
            </div>
          </div> */}

          {/* Support Section */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('support')}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <h6 className="font-regular text-white">Support</h6>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openSection === 'support' ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'support' ? 'max-h-40 pb-4' : 'max-h-0'
              }`}>
              <div className="flex flex-col gap-3 text-sm text-gray-300 pl-4">

                <Link href="/support" className="hover:text-white transition-colors duration-200">
                  Support Center
                </Link>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Contact
                </Link>
                <Link href="/support/faq" className="hover:text-white transition-colors duration-200">
                  FAQ
                </Link>

              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('company')}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <h6 className="font-regular text-white">Company</h6>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openSection === 'company' ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'company' ? 'max-h-40 pb-4' : 'max-h-0'
              }`}>
              <div className="flex flex-col gap-3 text-sm text-gray-300 pl-4">
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About
                </Link>

                <Link href="/brand" className="hover:text-white transition-colors duration-200">
                  Brand
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Region Section */}
        <div className="flex flex-col items-end mt-6 text-gray-400 text-sm">
          <div className="text-center text-gray-400 text-sm">
            <span className="font-medium text-white">REGION </span>
            - Currently Serving: India
            <br />
            <span className="italic text-xs text-gray-500">(Global launch coming soon)</span>
          </div>
        </div>
      </div>

      {/* Bottom Line - Copyright and Privacy/Terms */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 px-4 text-xs text-gray-400">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <span className="hidden sm:block">© {new Date().getFullYear()} Maxy</span>
            <div className="flex flex-row items-center justify-start gap-8 md:gap-6">
              <Link
                href="https://x.com/maxytechs"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform"
              >
                <Image src="/icons/x.svg" alt="X" width={26} height={26} />
              </Link>
              <Link
                href="https://www.instagram.com/maxyglobal/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform"
              >
                <Image src="/icons/instagram.svg" alt="Instagram" width={26} height={26} />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC_55ccJ2jzYuEzhCBdQ5vSA"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform"
              >
                <Image src="/icons/youtube.svg" alt="YouTube" width={26} height={26} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/maxy"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={26} height={26} />
              </Link>
            </div>

          </div>

          <div className="flex items-center gap-4 mt-6  sm:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">
              Privacy
            </Link>
            <span className="hidden md:block">|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors duration-200">
              Terms
            </Link>
            <span className="hidden md:block">|</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors duration-200">
              Cookies
            </Link>
            <span className="hidden md:block">|</span>
            <Link href="/sitemap" className="hover:text-white transition-colors duration-200">
              SiteMap
            </Link>
            <span className="hidden md:block">|</span>
            <Link href="/support/faq/" className="hover:text-white transition-colors duration-200">
              FAQ
            </Link>
          </div>
{/* Visible on small screens only */}
<span className="block sm:hidden text-gray-600 mb-8">
  © {new Date().getFullYear()} Maxy
</span>
        </div>
      </div>
    </footer>
  );
}


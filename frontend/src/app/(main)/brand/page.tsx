"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import "@/app/globals.css";

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F7F7F7] mt-16 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden sm:block text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 sm:mb-20"
      >
        Brand Guidelines
      </motion.h3>
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="block sm:hidden text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 sm:mb-20"
      >
        Brand Guidelines
      </motion.h4>

      {/* Colors */}
      {/* <section className="mb-24 sm:mb-32">
        <h4 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 sm:mb-14 text-center tracking-wide">
          Colors
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16">
          {[
            {
              name: "Dark Background",
              color: "#0A0A0A",
              details: [
                "Primary Text: #FFFFFF",
                "Secondary Text: #C0C0C0",
                "Disabled Text: #808080",
              ],
              border: "border-white/20",
            },
            {
              name: "Light Background",
              color: "#F7F7F7",
              details: [
                "Primary Text: #000000",
                "Secondary Text: #3E3E3E",
                "Disabled Text: #A0A0A0",
              ],
              border: "border-gray-300",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-center border border-transparent hover:border-white/10 flex flex-col items-center justify-center"
            >
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 ${item.border} mb-6 sm:mb-8 shadow-lg`}
                style={{ backgroundColor: item.color }}
              />
              <p className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                {item.name}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-4 sm:mb-6 tracking-wide">
                {item.color}
              </p>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base text-gray-400">
                {item.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Typography */}
      <section className="mb-24 sm:mb-32">
  <h4 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#cccccc] mb-12 sm:mb-16 text-center tracking-wide sm:tracking-[0.05em]">
    Typography
  </h4>

  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 w-full max-w-md">
      {/* Primary Font */}
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-outfit tracking-wide text-center">
          Outfit – Primary
        </p>
        <p className="text-base sm:text-lg text-gray-400 text-center px-2">
          For headlines, titles, and branding statements.
        </p>
      </div>

      {/* Secondary Font */}
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-poppins tracking-wide text-center">
          Poppins – Secondary
        </p>
        <p className="text-base sm:text-lg text-gray-400 text-center px-2">
          For body text, captions, and supporting content.
        </p>
      </div>
    </div>

    {/* Notes */}
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-sm">
      <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4">
        Afacad is not owned by Maxy but is reserved exclusively for the Maxy wordmark.
        Do not use it in other communications or designs.
      </p>
      <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
        Outfit is for prominent headings and logos, while Poppins is for 
        readable supporting text. Maintain clear hierarchy and spacing.
      </p>
    </div>
  </div>
</section>


      {/* Logos */}
      <section className="mb-24 sm:mb-32">
  <h4 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#cccccc] mb-10 sm:mb-14 text-center tracking-wide">
    Logos
  </h4>

  <div className="space-y-16 sm:space-y-20 text-gray-300 text-base leading-relaxed">
    {[
      {
        text: `The M4 merges four ‘M’ forms diagonally, creating a bold emblem of strength, unity, and creativity, while honoring the founder’s early connection to the letter ‘M’ and the number 4.`,
        img: "/brand/gl/M4.png",
        alt: "M4 Logo",
      },
      {
        text: `The Maxy wordmark reflects a bold yet approachable identity, uniting productivity and lifestyle. Maxy represents maximum creativity and potential, embodying the idea of making the most out of every moment.`,
        img: "/brand/gl/WM-Maxy.png",
        alt: "Maxy Wordmark Logo",
      },
    ].map((block, idx) => (
      <div
  key={idx}
  className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8"
>
  {/* Image */}
  <div className="relative h-56 sm:h-64 lg:h-80 w-3/4 md:w-1/3 flex-shrink-0 flex items-center justify-center">
    <Image
      src={block.img}
      alt={block.alt}
      fill
      className="object-contain p-4 sm:p-6"
    />
  </div>

  {/* Text */}
  <div className="max-w-xl text-center md:text-left px-2">
    <p className="text-sm sm:text-base md:text-lg leading-relaxed">{block.text}</p>
  </div>
</div>

    ))}

    <ul className="list-disc pl-5 marker:text-[#cccccc] space-y-2 text-left max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
      <li>
        The Maxy wordmark and M4 must only appear in
        <code className="bg-white/10 px-1 rounded mx-1">#0A0A0A</code> or
        <code className="bg-white/10 px-1 rounded mx-1">#F7F7F7</code>.
      </li>
      <li>
        Use dark on light backgrounds and light on dark backgrounds to
        ensure contrast.
      </li>
      <li>No other colors are allowed; the M4 adapts only for clarity.</li>
      <li>
        During official animations, the company may bring the logo to life
        with colors as a temporary expression.
      </li>
    </ul>
  </div>
</section>


      {/* Spacing */}
      {/* <section className="mb-24 sm:mb-32">
        <h4 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 sm:mb-14 text-center tracking-wide">
          Spacing
        </h4>

        <div className="space-y-16 sm:space-y-20 text-gray-300 text-sm sm:text-base">
          {[
            {
              imgs: [
                "/brand/gl/Primary-Logo Spacing.png",
                "/brand/gl/Primary-Logo Spacing-1.png",
              ],
              text: "The primary wordmark must always maintain its prescribed clear space and should never be combined with the M4.",
            },
            {
              imgs: [
                "/brand/gl/M4-Spacing.png",
                "/brand/gl/M4-Spacing-1.png",
              ],
              text: "The M4 must always maintain its prescribed clear space and should never be combined with the primary wordmark.",
            },
          ].map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {section.imgs.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-56 sm:h-64 lg:h-80 w-full flex items-center justify-center"
                  >
                    <Image
                      src={img}
                      alt="Logo Spacing Example"
                      fill
                      className="object-contain p-4 sm:p-6"
                    />
                  </div>
                ))}
              </div>
              <p className="text-center max-w-3xl mx-auto px-2">{section.text}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Do's & Don'ts */}
      {/* <section className="mb-24 sm:mb-32">
        <h4 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 sm:mb-14 text-center tracking-wide">
          Do’s & Don’ts
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {[
            { src: "/brand/gl/do1.png", alt: "Correct usage of Maxy logo example 1" },
            { src: "/brand/gl/do2.png", alt: "Correct usage of Maxy logo example 2" },
            { src: "/brand/gl/dont1.png", alt: "Incorrect usage of Maxy logo example 1" },
            { src: "/brand/gl/dont2.png", alt: "Incorrect usage of Maxy logo example 2" },
            { src: "/brand/gl/dont3.png", alt: "Incorrect usage of Maxy logo example 3" },
            { src: "/brand/gl/dont4.png", alt: "Incorrect usage of Maxy logo example 4" },
            { src: "/brand/gl/dont5.png", alt: "Incorrect usage of Maxy logo example 5" },
            { src: "/brand/gl/dont6.png", alt: "Incorrect usage of Maxy logo example 6" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-2xl p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-40 sm:h-44 lg:h-52 object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}

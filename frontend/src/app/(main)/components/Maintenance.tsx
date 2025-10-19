"use client"

import { motion } from "framer-motion"

export default function Maintenance() {
  return (
    <div className="flex items-center justify-center min-h-screen text-white px-6 relative overflow-hidden">

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center space-y-6 max-w-md"
      >
        {/* Logo */}
        <div className="mx-auto">
          <img
            src="/brand/W_logo.png"
            alt="Maxy Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain mx-auto opacity-90"
          />
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#8ECAE8]">
          We’re Powering Up
        </h2>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed">
          The <span className="text-[#8ECAE6] font-semibold">Maxy</span> team is refining your experience.  
          We’ll be back soon — stay tuned ⚡
        </p>

        {/* Status text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-sm text-gray-500 mt-8 tracking-wide"
        >
          Updating system components...
        </motion.div>

        {/* Button */}
        <div className="pt-6">
          <a
            href="/"
            className="inline-block px-6 py-2.5 rounded-xl font-medium border border-[#8ECAE6] text-[#8ECAE6] hover:bg-[#8ECAE6] hover:text-[#0A0F1C] transition-all duration-300"
          >
            Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  )
}

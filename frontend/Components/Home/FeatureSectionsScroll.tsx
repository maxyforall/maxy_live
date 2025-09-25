'use client';

import React from 'react';
import { motion } from 'framer-motion';

const sections = [
  {
    id: 'tailored',
    title: 'Tailored to You',
    description: 'Solutions designed around your specific needs - no fluff, just what works.',
    features: [
      { title: 'Personalized', subtitle: 'Made just for you.' },
      { title: 'Custom-Fit', subtitle: 'Built to match your flow.' },
    ],
  },
  {
    id: 'problems',
    title: 'Solving Daily Problems',
    description: "From planning to reminders, Maxy takes care of the little things so you don't have to.",
    features: [
      { title: 'Save Time', subtitle: 'Reduce friction in your day.' },
      { title: 'Stay Organized', subtitle: 'Keep life in order.' },
    ],
  },
  {
    id: 'easier',
    title: 'Making Life Easier',
    description: 'Simple tools. Smart logic. Just the essentials.',
    features: [
      { title: 'Integrates Easily', subtitle: 'Fits into your workflow.' },
      { title: 'Built for Trust', subtitle: 'Secure and dependable.' },
    ],
  },
  {
    id: 'fast',
    title: 'Fast & Convenient',
    description: 'No delays. No hassle. Just results.',
    features: [
      { title: 'Instant Access', subtitle: 'Jump in without waiting.' },
      { title: 'User Happiness', subtitle: 'Designed to delight you.' },
    ],
  },
  {
    id: 'productivity',
    title: 'Boosting Productivity',
    description: 'Maxy frees up your time so you can focus on what really matters.',
    features: [
      { title: 'Insights', subtitle: "See what's working." },
      { title: 'Automation', subtitle: 'Let Maxy handle the routine.' },
    ],
  },
];

export default function FeatureSectionsScroll() {
  return (
    <div className="w-full">
      {sections.map((section, idx) => (
        <Section key={section.id} {...section} idx={idx} />
      ))}
    </div>
  );
}

// Gradients for section titles
const gradients = [
  "bg-gradient-to-r from-indigo-400 to-blue-500",   // Tailored
  "bg-gradient-to-r from-emerald-400 to-teal-500",  // Problems
  "bg-gradient-to-r from-purple-400 to-pink-500",   // Easier
  "bg-gradient-to-r from-orange-400 to-red-500",    // Fast
  "bg-gradient-to-r from-cyan-400 to-sky-500",      // Productivity
];

// Hover styles per section
const hoverColors = [
  "hover:border-indigo-400/70 hover:shadow-indigo-400/20",   // Tailored
  "hover:border-emerald-400/70 hover:shadow-emerald-400/20", // Problems
  "hover:border-pink-400/70 hover:shadow-pink-400/20",       // Easier
  "hover:border-orange-400/70 hover:shadow-orange-400/20",   // Fast
  "hover:border-cyan-400/70 hover:shadow-cyan-400/20",       // Productivity
];

function Section({ id, title, description, features, idx }: {
  id: string;
  title: string;
  description: string;
  features: { title: string; subtitle?: string }[];
  idx: number;
}) {
  const isEven = idx % 2 === 0;

  return (
    <section
      id={id}
      className={`flex flex-col md:flex-row ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } items-center justify-between gap-10 px-6 sm:px-12 py-20`}
    >
      {/* Text Content */}
      <motion.div
        className={`max-w-2xl flex-1 
          text-center md:text-start 
          ${isEven ? 'md:pr-10' : 'md:pl-10'}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <h3
          className={`hidden sm:block text-3xl sm:text-5xl pb-2 font-bold mb-6 bg-clip-text text-transparent ${gradients[idx]}`}
        >
          {title}
        </h3>
        <h4
          className={`block sm:hidden text-3xl sm:text-5xl pb-2 font-bold mb-6 bg-clip-text text-transparent ${gradients[idx]}`}
        >
          {title}
        </h4>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10">
          {description}
        </p>
      </motion.div>

      {/* Features */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-8 max-w-2xl flex-1 text-center">
        {features.map((feature, i) => (
          <FeatureCard
            key={i}
            {...feature}
            delay={i * 0.1}
            hoverClass={hoverColors[idx]}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ title, subtitle, delay, hoverClass }: {
  title: string;
  subtitle?: string;
  delay: number;
  hoverClass: string;
}) {
  return (
    <motion.div
      className={`p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 
                 ${hoverClass} hover:shadow-2xl 
                 transition-all duration-300 text-center flex flex-col items-center justify-center 
                 w-full sm:w-auto max-w-sm`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <h4 className="block sm:hidden text-lg font-semibold mb-2 text-white">{title}</h4>
      <h3 className="hidden sm:block text-lg font-semibold mb-2 text-white">{title}</h3>

      {subtitle && (
        <p className="text-gray-400 text-sm leading-snug">{subtitle}</p>
      )}
    </motion.div>
  );
}

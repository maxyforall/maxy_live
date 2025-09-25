"use client";

import "@/app/globals.css";



import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, createRef } from "react";
import StarSection from '../../../Components/Home/starsection';
import Loading from "./components/Loading";
import FeatureSectionsScroll from "../../../Components/Home/FeatureSectionsScroll";


export default function Home() {
  const [loading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect: background moves slower than scroll
  const y = useTransform(scrollY, [0, 500], [0, 100]);


  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Initialize section refs
    sectionRefs.current = Array(7).fill(null).map((_, i) => sectionRefs.current[i] || createRef());

    // Set up intersection observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveSection(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observe each section
    sectionRefs.current.forEach((ref, index) => {
      if (ref.current) {
        ref.current.dataset.index = index.toString();
        observer.observe(ref.current);
      }
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col`} style={{ backgroundColor: 'var(--background)' }}>

      <motion.div
        ref={(el) => {
          if (el) sectionRefs.current[0].current = el;
        }}
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-14 md:py-16 overflow-hidden"
        id="home"
      >
        {/* Parallax Background Image */}
        <motion.div
          style={{ y }} // motion scroll effect
          className="absolute inset-0 z-0"
        >
          <img
            src="/home/hero.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Optional overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Foreground Content */}
        <motion.div
          variants={fadeInVariants}
          className="relative z-10 w-full h-full max-w-7xl flex flex-col items-center justify-center text-center mt-10 sm:mt-14 md:mt-16 mb-6 px-2 sm:px-6 md:px-10 lg:px-12"
        >
          <h2 className="hidden sm:block text-[#cccccc] text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[100px] font-outfit font-light mb-6 sm:mb-8 md:mb-10 drop-shadow-md leading-tight">
            Your life,<br /> Enhanced by{" "} Maxy.
          </h2>
          <h3 className="block sm:hidden text-[#cccccc] text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[100px] font-outfit font-light mb-6 sm:mb-8 md:mb-10 drop-shadow-md leading-tight">
            Your life,<br /> Enhanced by{" "} Maxy.
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 md:gap-6 mt-4">
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 cursor-pointer rounded-[30px] sm:rounded-[22px] md:rounded-[24px] border border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm sm:text-base md:text-lg font-medium shadow-md">
                Know about Maxy
              </button>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>



      {/* Star Section */}
      <StarSection />

      {/* What Are We Building Section */}
      <motion.div
        ref={el => { if (el) sectionRefs.current[1].current = el; }}
        className="flex items-center justify-center px-4 py-20 md:py-0 relative overflow-hidden"
        style={{ backgroundColor: 'var(--background)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="about"
      >
        {/* Foreground Content */}
        <motion.div
          className="relative z-10 text-center max-w-2xl"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl sm:text-5xl font-outfit text-primary mb-4 tracking-tight leading-tight drop-shadow-lg">
            What Are We <span className="text-info">Building</span>?
          </h3>

          <p className="text-base sm:text-lg text-secondary leading-relaxed px-4">
            At <span className="text-primary font-semibold" style={{ color: 'var(--button-primary-bg)' }}>Maxy</span>, we craft meaningful digital solutions that simplify life, spark creativity, and empower everyday experiences.
          </p>

          <div className="mt-6 flex justify-center px-2">
            <div className="inline-flex p-1 surface-secondary backdrop-blur-sm rounded-full overflow-x-auto max-w-full no-scrollbar gap-2 sm:gap-3">
              {['Solutions', 'Products', 'Services'].map((item, index) => (
                <button
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium text-secondary hover:text-primary hover:surface-hover transition-all duration-300 whitespace-nowrap"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>


      {/* Mission Statement */}
      <motion.div
        ref={el => { if (sectionRefs.current[2] && el) sectionRefs.current[2].current = el; }}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 relative"
        style={{ backgroundColor: 'var(--background)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl text-center space-y-8 sm:space-y-10">

          {/* Decorative Line */}
          <div className="relative inline-block">
            <div className="w-16 sm:w-20 h-12 absolute rounded-full blur-xl opacity-70 left-1/2 -translate-x-1/2" style={{ backgroundColor: 'var(--button-primary-bg)' }} />
            <div className="w-16 sm:w-20 h-1 relative mx-auto" style={{ backgroundColor: 'var(--button-primary-bg)' }} />
          </div>

          {/* Heading */}
          <h4 className="text-3xl sm:text-4xl lg:text-5xl font-outfit leading-tight px-2">
            We're not just building tools, <br className="hidden md:inline" />
            we're here to <span className="text-info">elevate everyday life</span>.
          </h4>

          {/* Short Description */}
          <p className="text-base sm:text-lg text-secondary font-poppins px-2">
            At <span className="text-primary font-semibold" style={{ color: 'var(--button-primary-bg)' }}>Maxy</span>, our mission is to simplify, inspire, and solve real-world problems, one digital experience at a time.
          </p>

          {/* Sub-heading */}
          <p className="text-lg sm:text-xl text-primary tracking-wide font-outfit mt-2">
            What drives us forward:
          </p>

          {/* Pulse Icon */}
          <div className="flex justify-center mt-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--button-primary-bg)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature Sections */}
      <FeatureSectionsScroll />

      {/* Call to Action Section */}
      <motion.div
        className="py-24 px-6 flex items-center justify-center bg-gradient-to-b from-[#0A0A0A] to-[#0b0b0b]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{}}
      >
        <div className="max-w-5xl w-full relative">
          <div className="card overflow-hidden">
            <div className="relative z-10 text-center">
              <h4 className="hidden sm:block text-4xl sm:text-5xl font-outfit mb-6 text-info">
                {/* Dive Into Platforms Built for You */}
                Dive Into Worlds Built for You
              </h4>
              <h5 className="block sm:hidden text-4xl sm:text-5xl font-outfit mb-6 text-info">
                {/* Dive Into Platforms Built for You */}
                Dive Into Worlds Built for You
              </h5>

              <p className="text-secondary mb-10 font-poppins max-w-2xl mx-auto">
                Whether you're streamlining your tasks, organizing your goals, or exploring fashion and lifestyle, Maxy brings you two worlds designed to help you grow, express, and live better.
                With Maxy, every step you take opens new possibilities to shape your journey.
              </p>
              {/* <p className="text-secondary mb-10 font-poppins max-w-2xl mx-auto">
                Whether you're optimizing your day, living your best moments, or exploring deeper with Corex and WoC, Maxy brings you curated platforms designed to help you evolve, express, and explore.
              </p> */}

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                {/* <a href="/corex">
                  <button className="bg-transparent cursor-pointer text-[#c0c0c0] border border-[--button-outline-border] px-4 py-2 rounded-full text-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#2a2a2a] hover:text-white">
                    Corex
                  </button>
                </a>
                <a href="/woc">
                  <button className="bg-transparent cursor-pointer text-[#c0c0c0] border border-[--button-outline-border] px-4 py-2 rounded-full text-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#2a2a2a] hover:text-white">
                    WoC
                  </button>
                </a> */}
                <a href="/productivity">
                  <button className="bg-transparent cursor-pointer text-[#c0c0c0] border border-[--button-outline-border] px-4 py-2 rounded-full text-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#2a2a2a] hover:text-white">
                    Productivity
                  </button>
                </a>
                <a href="/lifestyle">
                  <button className="bg-transparent cursor-pointer text-[#c0c0c0] border border-[--button-outline-border] px-4 py-2 rounded-full text-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#2a2a2a] hover:text-white">
                    Lifestyle
                  </button>
                </a>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
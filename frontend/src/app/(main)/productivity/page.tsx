"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, createRef } from "react";
import Image from "next/image";
import Loading from '../components/Loading';

export default function Productivity() {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });


  // Parallax effect: background moves slower than scroll
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
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
    <div className="min-h-screen w-full flex flex-col" style={{ background: 'var(--background)', color: 'var(--text-primary)' }}>

      {/* Section 1 - Hero */}
      {/* <motion.div
        ref={sectionRef}
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-14 md:py-16 overflow-hidden"
        id="home"
      >


        <motion.div
          style={{ y }} 
          className="absolute inset-0 z-0"
        >
          <img
            src="/Productivity/Tackle-tease-web.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>


        <motion.div
          variants={fadeInVariants}
          className="relative z-10 w-full h-full max-w-7xl flex flex-col items-start justify-start text-start mt-10 sm:mt-14 md:mt-16 mb-6 px-2 sm:px-6 md:px-10 lg:px-12"
        >
          <h2 className="text-[#cccccc] text-left 
  text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[110px] 
  font-outfit font-bold 
  mb-6 sm:mb-10 
  leading-[1.1] tracking-tight 
  drop-shadow-lg uppercase">
            THE <br /> WAIT IS <br /> ALMOST <br /> OVER
          </h2>


          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 md:gap-6 mt-4">
            
            <motion.a
              href="/productivity/tackle"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 cursor-pointer rounded-[30px] sm:rounded-[22px] md:rounded-[24px] border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all text-sm sm:text-base md:text-lg font-medium shadow-md">
                Explore Tackle
              </button>
            </motion.a>
          </div>
        </motion.div>
      </motion.div> */}


      {/* Section 2 - Title */}
      <div className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 text-center">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="auto"
            className="w-full h-full object-cover opacity-20"
            onContextMenu={(e) => e.preventDefault()}
            controls={false} // explicitly hide controls
            onPlay={() => videoRef.current && videoRef.current.play()}
          >
            <source src="/Productivity/productivity_bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>
        <div className="relative z-10">
          <h2 className="leading-tight text-center" style={{ fontFamily: "var(--font-sans)" }}>
            <span className="block text-lg sm:text-2xl md:text-4xl text-[var(--text-primary)]">
              Welcome to the world of
            </span>
            <span
              className="block mt-2 p-2 text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-[#334155] via-[#94a3b8] to-[#cbd5e1] bg-clip-text text-transparent"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Productivity
            </span>
          </h2>

        </div>

      </div>

      {/* Section 3 - Getting Things Done */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <h3 className="hidden sm:block text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-[#caffbf]">
            Getting Things Done
          </h3>
          <h4 className="block sm:hidden text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-[#caffbf]">
            Getting Things Done
          </h4>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Structure your day, stay on top of priorities, and complete tasks with ease...
          </p>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Task Management", desc: "Organize and prioritize your daily workflow", image: "/Productivity/task_management.jpeg" },
            { title: "Project Planning", desc: "Structure complex undertakings for maximum efficiency", image: "/Productivity/organization.jpeg" },
            { title: "Time Tracking", desc: "Measure and optimize your productivity patterns", image: "/Productivity/goals2.jpeg" }
          ].map((item, idx) => (
            <div key={idx} className="card group transition-all duration-500 ease-in-out">
              <div className="h-[200px] sm:h-[220px] relative overflow-hidden rounded-2xl mb-4">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="text-left">
                <h5 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h5>
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 - Stay Informed */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="hidden sm:block text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 text-[#b4e1ff]">
              Stay Informed
            </h3>
            <h4 className="block sm:hidden text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 text-[#b4e1ff]">
              Stay Informed
            </h4>
            <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Access the information that powers your progress...
            </p>
          </div>

          <div className="relative h-[280px] sm:h-[400px] md:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group">
            <Image src="/Productivity/stay_informed.jpeg" alt="Information Hub" fill className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="p-4 sm:p-12 max-w-lg">
                <h5 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 translate-x-0 group-hover:translate-x-4 transition-transform duration-500" style={{ color: 'var(--text-primary)' }}>
                  Knowledge at Your Fingertips
                </h5>
                <p className="text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" style={{ color: 'var(--text-secondary)' }}>
                  Access curated content, personalized news feeds, and vital industry updates...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Building Connections */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <h3 className="hidden sm:block text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6" style={{ color: 'var(--warning)' }}>
            Building Connections
          </h3>
          <h4 className="block sm:hidden text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6" style={{ color: 'var(--warning)' }}>
            Building Connections
          </h4>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Work today thrives on strong networks and seamless collaboration...
          </p>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Team Collaboration", image: "/Productivity/team_collab.jpeg" },
            { label: "Networking", image: "/productivity/ringhair.jpeg" },
            { label: "Idea Exchange", image: "/productivity/redcol.jpeg" },
            { label: "Communication", image: "/productivity/glassgirl.jpeg" }
          ].map((item, index) => (
            <div key={index} className="relative h-[200px] sm:h-[250px] rounded-2xl overflow-hidden shadow-lg group card">
              <Image src={item.image} alt={item.label} fill className="object-cover transition-all duration-700 filter group-hover:blur-[2px] group-hover:brightness-75" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="p-2 sm:p-4 text-lg sm:text-xl font-semibold transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" style={{ color: 'var(--text-primary)' }}>
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 - Managing What You Own */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <h3 className="hidden sm:block text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6" style={{ color: '#9B5DE5' }}>
            Managing What You Own
          </h3>
          <h4 className="block sm:hidden text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6" style={{ color: '#9B5DE5' }}>
            Managing What You Own
          </h4>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Stay in control of your professional assets...
          </p>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {[
            { title: "Digital Assets", desc: "Organize and secure your files and data", image: "/Productivity/digital_assets2.jpeg" },
            { title: "Financial Tools", desc: "Track expenses and manage resources efficiently", image: "/Productivity/finance_tools.jpeg" },
            { title: "Security Management", desc: "Protect your valuable professional assets", image: "/Productivity/security.jpeg" },
            { title: "Resource Organization", desc: "Streamline access to your essential tools", image: "/Productivity/organization2.jpeg" }
          ].map((item, idx) => (
            <div key={idx} className="relative h-[220px] sm:h-[300px] rounded-2xl overflow-hidden shadow-xl group card transition-all duration-500">
              <Image src={item.image} alt={item.title} fill className="object-cover transition-all duration-700 ease-in-out filter group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-6">
                <h5 className="text-lg sm:text-2xl font-bold mb-2 transform translate-y-0 group-hover:translate-y-[-8px] transition-transform duration-500" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h5>
                <p className="text-sm sm:text-base max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7 - Growing Every Day */}
      <section className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full" style={{ background: 'var(--surface-primary)' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl w-full mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h3 className="hidden sm:block text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4" style={{ color: '#F8A145' }}>
              Growing Every Day
            </h3>
            <h4 className="block sm:hidden text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4" style={{ color: '#F8A145' }}>
              Growing Every Day
            </h4>
            <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Progress is a journey...
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl h-[300px] sm:h-[400px] md:h-[500px] shadow-2xl card group">
              <Image src="/Productivity/skills.jpeg" alt="Skill Development" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/50 p-4 sm:p-8 flex flex-col justify-end hover:bg-black/40 transition-all duration-500">
                <h5 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--text-primary)' }}>
                  Skill Development
                </h5>
                <p className="text-sm sm:text-base max-w-md transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" style={{ color: 'var(--text-secondary)' }}>
                  Continuous learning is the cornerstone...
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              {[
                { title: "Reflection & Review", desc: "Track progress and refine your approach...", image: "/Productivity/reflection.jpeg" },
                { title: "Goal Setting", desc: "Define your future and plan your path...", image: "/Productivity/goals.jpeg" }
              ].map((item, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-2xl h-[180px] sm:h-[230px] shadow-xl group card">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                    <div className="p-4 sm:p-6 max-w-sm">
                      <h5 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </h5>
                      <p className="text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: 'var(--text-secondary)' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

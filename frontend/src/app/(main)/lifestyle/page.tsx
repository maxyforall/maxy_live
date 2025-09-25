"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, createRef } from "react";
import Image from "next/image";
import Loading from '../components/Loading';

export default function Lifestyle() {
  const [loading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

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
    <div className="w-full flex flex-col">
      {/* Hero Section */}
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
            src="/Lifestyle/ReveionTease_web.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        
        <motion.div
          variants={fadeInVariants}
          className="relative z-10 w-full h-full max-w-7xl flex flex-col items-center justify-center text-center mt-10 sm:mt-14 md:mt-16 mb-6 px-2 sm:px-6 md:px-10 lg:px-12"
        >
          <h3 className="text-[#AB91D6] text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-[80px] font-outfit font-medium mb-6 sm:mb-8 md:mb-10 drop-shadow-md leading-tight">
            Styling,<br /> Redefined.<br /> Coming Soon...
          </h3>


          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 md:gap-6 mt-4">
            
            <motion.a
              href="/lifestyle/reveion"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 cursor-pointer rounded-[30px] sm:rounded-[22px] md:rounded-[24px] border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white transition-all text-sm sm:text-base md:text-lg font-medium shadow-md">
                Explore Reveion
              </button>
            </motion.a>
          </div>
        </motion.div>
      </motion.div> */}



      {/* Welcome Section */}
      <div className="h-screen relative flex items-center justify-center px-6 text-primary">
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
  onPlay={() => videoRef.current && videoRef.current.play()} // forces play
>
  <source src="/Lifestyle/lifestyle_welcome.mp4" type="video/mp4" />
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
              Lifestyle
            </span>
          </h2>

        </div>
      </div>

      {/* Style Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-16 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h3 className="hidden sm:block text-6xl font-extrabold text-[#AB91D6] mb-6" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
              Dressing & Style
            </h3>
            <h4 className="block sm:hidden text-6xl font-extrabold text-[#AB91D6] mb-6" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
              Dressing & Style
            </h4>
            <p className="text-lg text-secondary leading-relaxed">
              Dressing up is more than just trends, it's how you express yourself. Make every outfit speak volumes.
            </p>
          </div>
          <div className="relative h-[300px] w-full rounded-3xl overflow-hidden shadow-lg group">
            <Image
              src="/dressing.png"
              alt="Fashion"
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-16 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="order-2 md:order-1 relative h-[400px] rounded-3xl overflow-hidden shadow-lg group hover:surface-hover transition-all duration-600">
            <Image
              src="/Lifestyle/food.jpeg?height=400&width=600"
              alt="Food"
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-110"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="hidden sm:block text-6xl font-extrabold text-warning mb-6" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
              Food & Recipes
            </h3>
            <h4 className="block sm:hidden text-6xl font-extrabold text-warning mb-6" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
              Food & Recipes
            </h4>
            <p className="text-lg text-secondary leading-relaxed">
              From fast bites to culinary delights, discover recipes and flavor inspiration for every mood and moment.
            </p>
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="hidden sm:block text-6xl font-extrabold text-info mb-6" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
            Travel & Explore
          </h3>
          <h4 className="block sm:hidden text-6xl font-extrabold text-info mb-6" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
            Travel & Explore
          </h4>
          <p className="text-lg text-secondary leading-relaxed">
            Embark on unforgettable journeys. From serene beaches to towering peaks, let your adventure begin here.
          </p>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Beach Getaways",
              image: "/Lifestyle/beach.jpeg"
            },
            {
              label: "Mountain Escapes",
              image: "/Lifestyle/mountain.jpeg"
            },
            {
              label: "City Adventures",
              image: "/Lifestyle/city.jpeg"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg group hover:surface-hover transition-all duration-600"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-600 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="p-4 text-primary text-xl font-semibold">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wellness Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-16 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h3 className="hidden sm:block text-6xl font-extrabold text-[#FFCBA4] mb-6" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
              Wellness & Self-Care
            </h3>
            <h4 className="block sm:hidden text-6xl font-extrabold text-[#FFCBA4] mb-6" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
              Wellness & Self-Care
            </h4>
            <p className="text-lg text-secondary leading-relaxed">
              Reset and recharge. Whether it's yoga, mindfulness, or simple breathing. Prioritize your inner peace.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              "/Lifestyle/yoga.jpeg",
              "/Lifestyle/meditation.jpeg",
              "/Lifestyle/spa.jpeg",
              "/Lifestyle/nature_walk.jpeg"
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square relative rounded-2xl overflow-hidden shadow-md group hover:surface-hover transition-all duration-600"
              >
                <Image
                  src={src}
                  alt={`Wellness ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home & Living Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="hidden sm:block text-6xl font-extrabold text-[#C19A6B] mb-4" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
            Home & Living
          </h3>
          <h4 className="block sm:hidden text-6xl font-extrabold text-[#C19A6B] mb-4" style={{ textShadow: '0 2px 8px rgba(247, 247, 247, 0.1)' }}>
            Home & Living
          </h4>
          <p className="text-lg text-secondary">
            Transform your space into a haven. Smart, stylish, and uniquely yours.
          </p>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Cozy Corners",
              desc: "Perfect reading nooks and relaxing spaces.",
              image: "/Lifestyle/cozy.jpeg"
            },
            {
              title: "Smart Organization",
              desc: "Functional layouts for tidy living.",
              image: "/Lifestyle/organization.jpeg"
            },
            {
              title: "Decor Ideas",
              desc: "Style your home with aesthetic charm.",
              image: "/Lifestyle/decor.jpeg"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="card group transition-shadow duration-300"
            >
              <div className="h-[220px] relative overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-110"
                />
              </div>
              <div className="pt-6 text-left">
                <h5 className="text-xl font-bold text-primary mb-2 group-hover:text-warning transition-colors duration-300">
                  {item.title}
                </h5>
                <p className="text-secondary group-hover:text-primary transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Support Section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="w-full max-w-[1050px] aspect-[21/9] rounded-3xl overflow-hidden relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover"
            onContextMenu={(e) => e.preventDefault()}
            onPlay={() => videoRef.current && videoRef.current.play()}
          >
            <source src="/Lifestyle/Lifestyle-Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom Play/Pause Button */}
          <button
            onClick={togglePlayback}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/60 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm shadow-md hover:bg-black/80 transition"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        {/* Headings */}
        <h3 className="hidden sm:block text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium text-primary mb-12 mt-10 leading-tight max-w-5xl">
          "Supporting your story, not just your schedule"
        </h3>
        <h4 className="block sm:hidden text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium text-primary mb-12 mt-10 leading-tight max-w-5xl">
          "Supporting your story, not just your schedule"
        </h4>
      </section>

    </div>
  );
}


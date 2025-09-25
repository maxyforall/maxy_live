"use client"

import { useState, useEffect } from "react"
import "@/app/globals.css";






const labeledStars = [
  { id: 1, top: "10%", left: "20%", text: "Innovation" },
  { id: 2, top: "30%", left: "50%", text: "Creativity" },
  { id: 3, top: "70%", left: "40%", text: "Passion" },
  { id: 4, top: "50%", left: "80%", text: "Teamwork" },
  { id: 5, top: "20%", left: "70%", text: "Vision" },
  { id: 6, top: "15%", left: "60%", text: "Excellence" },
  { id: 7, top: "40%", left: "25%", text: "Integrity" },
  { id: 8, top: "65%", left: "75%", text: "Curiosity" },
  { id: 9, top: "80%", left: "55%", text: "Ambition" },
  { id: 10, top: "35%", left: "15%", text: "Growth" },
  { id: 11, top: "55%", left: "10%", text: "Collaboration" },
  { id: 12, top: "75%", left: "20%", text: "Empathy" },
]

const labeledStarProperties = labeledStars.map((_, index) => ({
  size: 3 + (index % 3) * 0.8,
  opacity: 0.8 + (index % 3) * 0.07,
  animationDuration: `${2 + (index % 3)}s`,
  glowIntensity: 0.7 + (index % 4) * 0.1,
}))

export default function StarSection() {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [backgroundStars, setBackgroundStars] = useState<any[]>([])
  const [shootingStars, setShootingStars] = useState<any[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const stars = []
    for (let i = 0; i < 100; i++) {
      stars.push({
        id: i,
        top: `${(i * 7) % 100}%`,
        left: `${(i * 13) % 100}%`,
        size: 0.2 + (i % 8) * 0.1,
        opacity: 0.3 + (i % 7) * 0.1,
        animationDelay: `${(i % 30) * 0.1}s`,
      })
    }
    setBackgroundStars(stars)
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random()
      const newStar = {
        id,
        top: `${Math.random() * 40 + 2}%`,
        left: `${Math.random() * 90 + 2}%`,
        size: Math.random() * 4 + 2, // Bigger stars
      }
      setShootingStars((prev) => [...prev, newStar])

      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id))
      }, 2000)
    }, 800) // More frequent

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[1200px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[0a0a0a] via-[#111111] to-[#0a0a0a]">

      {/* Background twinkling stars */}
      {isMounted &&
        backgroundStars.map((star) => (
          <div
            key={`bg-star-${star.id}`}
            className="absolute rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              backgroundColor: "white",
              animation: "twinkle 2s infinite ease-in-out",
              animationDelay: star.animationDelay,
            }}
          />
        ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={`shooting-star-${star.id}`}
          className="absolute pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: "shooting 1s linear forwards",
            background: "linear-gradient(45deg, white, transparent)",
            transform: "rotate(45deg)",
            borderRadius: "9999px",
            boxShadow: "0 0 8px rgba(255,255,255,0.8)",
          }}
        />
      ))}

      {/* Main labeled stars */}
      {labeledStars.map((star, index) => {
        const baseOpacity = labeledStarProperties[index].opacity
        const peakOpacity = Math.min(baseOpacity * 1.2, 1)

        return (
          <div
            key={star.id}
            className={`absolute rounded-full transition transform hover:scale-150 animate-star-pulse ${hoveredStar === star.id ? "z-10" : "z-5"
              }`}
            style={{
              top: star.top,
              left: star.left,
              width: `${labeledStarProperties[index].size}px`,
              height: `${labeledStarProperties[index].size}px`,
              opacity: baseOpacity,
              backgroundColor: "white",
              animation: "6s ease-in-out infinite",
              boxShadow: `0 0 10px rgba(255, 255, 255, ${labeledStarProperties[index].glowIntensity}), 
                          0 0 20px rgba(255, 255, 255, ${labeledStarProperties[index].glowIntensity * 0.7}), 
                          0 0 30px rgba(255, 255, 255, ${labeledStarProperties[index].glowIntensity * 0.4})`,
            } as React.CSSProperties}
            onMouseEnter={() => setHoveredStar(star.id)}
            onMouseLeave={() => setHoveredStar(null)}
          >
            {hoveredStar === star.id && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1.5 text-xs rounded shadow backdrop-blur-md bg-gray-800/70 text-white float">
                {star.text}
              </div>
            )}
          </div>
        )
      })}

      {/* Main content */}
      <div className="flex flex-col  items-center text-center px-6 z-10">
        <div className="w-12 h-12 mb-4 animate-fade-in sm:w-14 sm:h-14 md:w-16 md:h-16">
          <img
            src="/brand/W_logo.png"
            alt="Maxy Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <h3 className="block sm:hidden text-4xl md:text-3xl mb-8 px-4 animate-fade-in text-primary drop-shadow-[0_0_3px_#cccccc33]">
          We are a creative<br /> technology startup
        </h3>
        <h2 className="hidden sm:block text-4xl md:text-3xl mb-8 px-4 animate-fade-in text-primary drop-shadow-[0_0_3px_#cccccc33]">
          We are a creative<br /> technology startup
        </h2>
      </div>
    </div>
  )
}

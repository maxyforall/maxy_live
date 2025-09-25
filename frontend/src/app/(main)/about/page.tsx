"use client";

import { useState, useEffect } from "react";
import Loading from '../components/Loading';
import React from 'react';
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col mt-16 text-primary">
      {/* Hero Section */}
      <section className="h-[750px] w-full py-12 md:py-16 lg:py-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] overflow-hidden">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 w-full max-w-5xl text-secondary mx-auto text-center md:text-center">About</h3>
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
          <img
            src="/about_maxy_bg.png"
            alt="about_maxy"
            className="w-full h-auto drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
          />
        </div>
        {/* Content layer */}
        <div className="relative z-10 mt-6">
          <h4 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-secondary">
            Redefining How We Live, Work, and Connect Online
          </h4>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-disabled">
            We are a team of passionate developers dedicated to building amazing
            applications. Our mission is to create user-friendly and efficient software that meets
            the needs of our users.
          </p>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"            // ✅ fills the parent box
            src="https://www.youtube.com/embed/hhN_EwpOHOA?si=ZYQway9p3D6F_UeS&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>


      {/* Our Story */}

      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        <h3 className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-8 md:mb-12 lg:mb-16 text-primary text-center">
          Our <span className="text-secondary">Story</span>
        </h3>
        <div className="max-w-5xl space-y-4 md:space-y-6 text-base md:text-lg text-secondary text-left md:text-justify">
          <p>
            Every big change begins with a simple question: <span className="italic">“Can this be done better?”</span>
          </p>
          <p>
            At <span className="font-bold text-primary">Maxy</span>, that question became the spark.
            We looked at the everyday challenges people face, work that takes longer than it should,
            information that feels scattered, connections that are harder to make than they need to be.
            And we knew technology could do more than just exist in the background.
            It could simplify. It could accelerate. It could inform. It could connect.
          </p>
          <p>
            From the very beginning, Maxy wasn’t about building just another app.
            It was about creating solutions with purpose, tools designed to solve real-world problems,
            not add more noise. Every idea we bring to life, whether it’s an application that helps manage productivity,
            or a platform that connects people, is guided by a single belief:
            <span className="font-semibold italic"> technology should serve people, not the other way around.</span>
          </p>
          <p>
            As we grow, each product we create carries a piece of this vision.
            Some solutions make work easier and faster. Some make life more informative.
            Some bring people closer together. But all of them share one goal:
            to create meaningful impact in the lives of those who use them.
          </p>
          <p>
            Maxy is more than a tech company. It’s a commitment, to innovation with intent,
            to design with clarity, and to solving problems that matter.
            Our journey has just begun, and with every step forward, we aim to make the world
            not just more connected, but more human.
          </p>
        </div>
      </section>



      {/* Our Ecosystem */}
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        <h3 className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-8 md:mb-12 lg:mb-16 text-primary">Our <span className="text-secondary">Ecosystem</span></h3>
        <p className="text-secondary max-w-3xl text-center mb-8 md:mb-12 text-base md:text-lg">
          Maxy is more than a platform—it's a growing digital ecosystem designed to empower productivity, enrich lifestyles, and build vibrant, knowledge-driven communities.
        </p>

        {/* Tree Structure */}
        <div className="max-w-4xl w-full text-secondary space-y-6">
          <div>
            {/* Maxy Logo */}
            <img
              src="/brand/W_logo.png"
              alt="Maxy Logo"
              className="h-8 md:h-10 mb-4 ml-3"
            />
            <div className="ml-4 md:ml-8 border-l border-standard pl-4 md:pl-6 space-y-4 md:space-y-6">

              {/* Productivity */}
              <div>
                <h5 className="text-primary font-semibold text-lg md:text-xl">Productivity</h5>
                <p className="ml-2 md:ml-4 text-disabled mt-1 text-sm md:text-base">
                  A space dedicated to helping individuals stay organized, manage time efficiently, and accomplish professional milestones with clarity and focus, by creating thoughtful, intuitive products that empower everyday progress.
                </p>
              </div>

              {/* Lifestyle */}
              <div>
                <h5 className="text-primary font-semibold text-lg md:text-xl mt-2 md:mt-4">Lifestyle</h5>
                <p className="ml-2 md:ml-4 text-disabled mt-1 text-sm md:text-base">
                  This branch supports creativity, well-being, and self-expression, offering tools and experiences that inspire everyday living and personal growth by creating meaningful, user-focused products.
                </p>
              </div>

              {/* Corex */}
              {/* <div>
                <h5 className="text-primary font-semibold text-lg md:text-xl mt-2 md:mt-4">Corex</h5>
                <p className="ml-2 md:ml-4 text-disabled mt-1 text-sm md:text-base">
                  Corex is Maxy's engagement hub, a dynamic digital space where knowledge, culture, and community come together. It encourages interaction, shared discovery, and creative freedom.
                </p>

                <div className="ml-3 md:ml-6 mt-2 md:mt-3 space-y-2">
                  <div>
                    <span className="text-primary font-medium">Keeropedia</span>
                    <p className="ml-2 md:ml-4 text-disabled text-sm md:text-base">
                      A knowledge-focused subspace that fuels curiosity and learning through professional insights, thoughtful discussion, and exploration.
                    </p>
                  </div>
                  <div>
                    <span className="text-primary font-medium">Thrillopia</span>
                    <p className="ml-2 md:ml-4 text-disabled text-sm md:text-base">
                      A vibrant, informal corner where users express creativity, dive into culture, explore trends, and contribute to a lively digital community.
                    </p>
                  </div>
                </div>
              </div> */}

              {/* WoC */}
              {/* <div>
                <h5 className="text-primary font-semibold text-lg md:text-xl mt-2 md:mt-4">WoC (World of Creators)</h5>
                <p className="ml-2 md:ml-4 text-disabled mt-1 text-sm md:text-base">
                  WoC is Maxy's developer-centric realm, empowering coders, makers, and tech explorers with challenges, insights, collaborations, and a platform to build the future together.
                </p>
              </div> */}

            </div>
          </div>
        </div>


        <p className="text-disabled mt-8 md:mt-12 max-w-3xl text-center text-xs md:text-sm">
          The ecosystem is built to grow with its community-supporting focused work, creative living, and meaningful connection through a unified digital space.
        </p>
      </section>

      {/* Our Mission */}
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        <h3 className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-8 md:mb-12 lg:mb-16 text-primary">Our <span className="text-secondary">Mission</span></h3>
        <div className="max-w-5xl space-y-4 text-base md:text-lg text-left md:text-justify">
          <p className="text-secondary">
            Our mission is to create human-centered digital ecosystems that bring clarity, creativity,
            and meaning to both professional productivity and personal lifestyle.
          </p>
          <p className="text-secondary">
            We are committed to building innovative, user-friendly software that empowers individuals
            to achieve their goals and express their creativity.
          </p>
          <p className="text-secondary">
            We strive to push the boundaries of technology, creating solutions that inspire, connect,
            and enhance human potential.
          </p>
          <p className="text-secondary">
            By fostering a culture of continuous learning, collaboration, and inclusivity, we aim to
            create digital experiences that are not just functional, but truly transformative.
          </p>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        <h3 className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-8 md:mb-12 lg:mb-16 text-primary">Our <span className="text-secondary">Purpose</span></h3>
        <div className="max-w-5xl space-y-4 text-base md:text-lg text-left md:text-justify">
          <p className="text-secondary">
            Our purpose is to reimagine the digital landscape by creating ecosystems that prioritize
            human experience, creativity, and meaningful connection.
          </p>
          <p className="text-secondary">
            We believe technology should simplify life, not complicate it. Our purpose is to develop
            intuitive, powerful tools that seamlessly integrate into users' lives, helping them
            navigate both professional and personal challenges with ease and inspiration.
          </p>
          <p className="text-secondary">
            We are driven by the conviction that digital platforms can be more than mere utilities –
            they can be spaces of empowerment, learning, and personal growth.
          </p>
          <p className="text-secondary">
            Through our carefully crafted ecosystems, we aim to create digital environments that
            respect individual uniqueness, foster creativity, and support holistic personal development.
          </p>
        </div>
      </section>

      {/* Our Goals */}
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        <h3 className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-8 md:mb-12 lg:mb-16 text-primary">Our <span className="text-secondary">Goals</span></h3>
        <div className="max-w-5xl space-y-4 text-base md:text-lg text-left md:text-justify">
          <p className="text-secondary">
            Our goals are ambitious yet focused: to revolutionize how people interact with digital technology.
          </p>
          <div className="space-y-3 md:space-y-4">
            {[
              "Create seamless, intuitive digital ecosystems that enhance productivity and personal growth",
              "Develop innovative platforms that prioritize user experience and emotional intelligence",
              "Foster a global community of users who are empowered, connected, and inspired",
              "Push the boundaries of technological innovation while maintaining a human-centric approach",
              "Cultivate a diverse, inclusive environment that celebrates creativity and individual potential",
              "Continuously evolve our products to meet the changing needs of our users",
              "Contribute positively to the global digital landscape by setting new standards of user experience"
            ].map((goal, index) => (
              <p key={index} className="text-secondary flex items-start">
                <span className="mr-2 md:mr-3 text-surface-tertiary text-lg md:text-xl flex-shrink-0">●</span>
                <span>{goal}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        <h3 className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-8 md:mb-12 lg:mb-16 text-primary">Our <span className="text-secondary">Core Values</span></h3>
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {[
            { title: "Innovation", description: "Pushing boundaries of technology and creativity" },
            { title: "User-Centricity", description: "Placing user needs at the heart of everything" },
            { title: "Collaboration", description: "Believing in the power of collective creativity" },
            { title: "Integrity", description: "Committed to transparency and ethical practices" },
            { title: "Empowerment", description: "Enabling users to control their digital lives" },
            { title: "Diversity", description: "Celebrating unique perspectives and backgrounds" },
            { title: "Community", description: "Fostering meaningful connections" },
            { title: "Learning", description: "Continuously growing and adapting" },
            { title: "Sustainability", description: "Creating positive, lasting impact" },
            { title: "Joy", description: "Finding delight in innovation and exploration" }
          ].map((value, index) => (
            <div
              key={index}
              className="card hover:surface-hover transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2"
            >
              <h5 className="font-semibold text-lg md:text-xl text-center mb-2 text-primary">{value.title}</h5>
              <p className="text-center text-sm md:text-base text-secondary">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Us */}
      <section className="w-full flex flex-col items-center justify-center py-12 md:py-16 px-4 sm:px-6">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-primary text-center">Join Our Journey</h3>
        <div className="max-w-3xl text-center">
          <p className="text-base md:text-lg text-secondary mb-6">
            Whether you're a potential user, collaborator, or future team member,
            we invite you to be part of our mission to create more meaningful digital experiences.
          </p>
          <div className="flex justify-center">
            <a href="/contact">
              <button className="btn-secondary cursor-pointer hover:surface-hover focus-ring text-sm md:text-base">
                Connect with Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="w-full text-primary py-10 md:py-12 text-center px-4">
        <p className="max-w-2xl mx-auto text-base md:text-xl italic text-secondary">
          "We're not just building technology. We're crafting digital spaces that understand,
          inspire, and empower human potential."
        </p>
      </section>
    </div>
  );
}

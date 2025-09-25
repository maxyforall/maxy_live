"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is WoC?",
    answer:
      "WoC is a platform where users can share their ideas or inventions through images and written descriptions. It’s a space to showcase creativity and connect with others."
  },
  {
    question: "Is a Maxy ID required to use WoC?",
    answer:
      " Yes, you must have a Maxy ID to post or engage with content in WoC."
  },
  {
    question: "What can I post in WoC?",
    answer:
      "You can post photos and brief explanations of your projects, inventions, or ideas."
  },
  {
    question: "Can other users interact with my posts?",
    answer:
      " Yes. Users can like your submissions and view the details you've shared."
  },
  {
    question: "Can I connect with people who post in WoC?",
    answer:
      "Yes. If the poster has made their contact or intent visible, you may reach out or connect based on the shared project"
  },
  {
    question: "Is there a review process for submissions?",
    answer:
      "Content may be moderated to ensure it aligns with Maxy’s community guidelines."
  },
  {
    question: "How can I contact support?",
    answer:
      "Email us at support@maxy.co.in or visit https://maxy.co.in."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen text-gray-200 px-6 py-16 bg-[#0b0b0b]">
      <div className="max-w-3xl mx-auto mt-16">
        <h3 className="text-4xl font-bold mb-12 text-center text-white">
          Frequently Asked Questions
        </h3>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentRef = useRef<HTMLDivElement>(null);
            const [height, setHeight] = useState("0px");

            useEffect(() => {
              if (isOpen && contentRef.current) {
                setHeight(`${contentRef.current.scrollHeight}px`);
              } else {
                setHeight("0px");
              }
            }, [isOpen]);

            return (
              <div key={index} className="border-b border-gray-700 pb-3">
                <button
                  className="w-full flex justify-between items-center py-2 text-left text-lg font-medium group"
                  onClick={() => toggleFAQ(index)}
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isOpen ? "text-[#8ECAE6]" : "text-white"
                    } group-hover:text-[#8ECAE6]`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#8ECAE6]" : ""
                    }`}
                  />
                </button>

                <div
                  ref={contentRef}
                  style={{ height }}
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                >
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

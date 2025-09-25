"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Maxy?",
    answer:
      "Maxy is a tech company providing creative solutions through applications and services, divided into Lifestyle and Productivity worlds. We also run Share Space for engaging content."
  },
  {
  question: "What is Corex?",
  answer:
    "Corex is a separate platform on Maxy where we share our thoughts, ideas, and interactive content through Keeropedia and Thrillopia."
  },
  {
    question: "What worlds does Maxy have?",
    answer:
      "Maxy is structured into two worlds: Lifestyle and Productivity. Each world includes unique apps and experiences tailored for its focus."
  },
  {
    question: "What is a Maxy ID?",
    answer:
      "A Maxy ID is your universal account used to access any Maxy product or platform. You only need to create it once through the Maxy website."
  },
  {
    question: "What information is required to create a Maxy ID?",
    answer:
      "To create a Maxy ID, you’ll need to enter your first name, last name, date of birth, gender, and professional email. You’ll also choose a unique Maxy ID (username) and set a secure password."
  },
  {
    question: "Can I use the same Maxy ID across different Maxy apps and platforms?",
    answer:
      "Yes, your Maxy ID works as a single unified login for all Maxy services, whether you’re using apps like Tackle and Reveion or web platforms like Corex and WoC. If you create a Maxy ID while signing up for one product (for example, Corex), your account will initially exist only in that product. Later, you can use the same Maxy ID to sign in to any other Maxy product, and a new account for that product will be created automatically—no separate sign-up needed. This system will also apply to all future Maxy products and platforms. One Maxy ID. Multiple product experiences."
  },
  {
    question: "Where do I create a Maxy ID?",
    answer:
      "You can create a Maxy ID by visiting https://maxy.co.in."
  },
  {
    question: "I already have a Maxy ID. Do I need to create a new one for other Maxy apps or platforms?",
    answer:
      "No. Use your existing Maxy ID to sign in to any Maxy product or platform."
  },
  {
    question: "Can I update my Maxy ID information?",
    answer:
      "Yes. You can update certain account details via the Maxy website."
  },
  {
    question: "Can I delete my Maxy ID?",
    answer:
      "You can request account deletion from the Maxy website. Note that this will remove access and data from all linked Maxy products."
  },
  {
    question: "Can I create a Maxy account?",
    answer:
      "Yes. You can create a Maxy account to log in to our apps like Tackle, with a unique Maxy ID and password."
  },
  {
    question: "How do I contact Maxy or get support?",
    answer:
      "You can reach us via our Contact page, email us at contact@maxy.com, or for technical assistance email support@maxy.co.in. You can also visit https://maxy.co.in for more help."
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

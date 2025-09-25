"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Corex?",
    answer:
      "Corex is a Maxy program offering educational and entertainment experiences through two main components: Keeropedia (learning-focused) and Thrillopia (entertainment-focused)."
  },
  {
    question: "Do I need a Maxy ID to access Corex?",
    answer:
      "Yes, a Maxy ID helps you access Corex features, track progress, and personalize your experience."
  },
  {
    question: "How is my personal data used?",
    answer:
      "We collect non-personal analytics (like quiz attempts or voting activity) to improve features. Any personal data is handled under Maxy’s Privacy Policy."
  },
  {
    question: "How do coding challenges work?",
    answer:
      "You can attempt challenges directly on the platform, track your progress, and view results in your dashboard."
  },
  {
    question: "Can I post anything on the Social Wall?",
    answer:
      "Yes, but all posts must follow community guidelines. Inappropriate content can be removed."
  },
  {
    question: "Who owns the content I submit?",
    answer:
      "You keep ownership, but by submitting, you give Maxy a license to use it within the platform."
  },
  {
    question: "Can my account be banned?",
    answer:
      "Yes, if you break the rules, harass others, or post illegal/offensive content, your access may be suspended or terminated."
  },
  {
    question: "Why can’t I access a feature sometimes?",
    answer:
      "We may update, suspend, or temporarily disable features for improvements or maintenance."
  },
  {
    question: "How is Keeropedia different from Thrillopia?",
    answer:
      "Keeropedia is your go-to space for learning from curated facts to in-depth articles. Thrillopia focuses on fun and engagement with features like Fun Fact of the Day, polls, contests, and the Social Wall."
  },
  {
    question: "How are Keeropedia’s facts verified?",
    answer:
      "All Keeropedia content is sourced from credible references, reviewed by our editorial team, and cross-checked for accuracy before publishing."
  },
  {
    question: "How can I contact support?",
    answer:
      "The Social Wall is a community space where users can share posts, images, thoughts and interact with others’ content."
  },
  {
    question: "How often is Corex updated with new content?",
    answer:
      "Keeropedia gets new articles and facts daily, while Thrillopia updates features like polls, fun facts, and contests daily."
  },
  {
    question: "Do I need to participate in every section?",
    answer:
      "No. You’re free to engage with only the sections or challenges that interest you."
  },
  {
    question: "What happens if I win a contest in Thrillopia?",
    answer:
      "Your \"win streak\" increases. This helps track your achievements within the platform."
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

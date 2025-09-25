"use client"

import { useParams } from "next/navigation"
import { faqData } from "./faqData"
import { useState, useRef } from "react"
import { ChevronDown, Search } from "lucide-react"

type FAQ = { q: string; a: string }

function FAQItem({
  faq,
  isOpen,
  onClick,
}: {
  faq: FAQ
  isOpen: boolean
  onClick: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border-b border-gray-700 pb-3">
  <button
    className="w-full flex justify-between items-center 
               py-2 sm:py-3 text-left 
               text-base sm:text-lg md:text-xl 
               font-medium group"
    onClick={onClick}
  >
    <span
      className={`transition-colors duration-300
        ${isOpen ? "text-[#8ECAE6]" : "text-white"}
        group-hover:text-[#8ECAE6]"`}
    >
      {faq.q}
    </span>

    {/* Chevron remains same size across breakpoints */}
    <ChevronDown
      className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-300
        ${isOpen ? "rotate-180 text-[#8ECAE6]" : ""}`}
    />
  </button>

  <div
    ref={contentRef}
    style={{ height: isOpen ? contentRef.current?.scrollHeight : 0 }}
    className="transition-all duration-300 ease-in-out overflow-hidden"
  >
    <p className="mt-2 text-gray-400 
                  text-sm sm:text-base md:text-lg 
                  leading-relaxed">
      {faq.a}
    </p>
  </div>
</div>

  )
}

export default function FAQPage() {
  const { slug } = useParams() as { slug: string }
  const category = faqData[slug]
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [query, setQuery] = useState("")

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h3 className="hidden sm:block text-2xl">FAQ category not found</h3>
        <h4 className="block sm:hidden text-lg">FAQ category not found</h4>
      </div>
    )
  }

  // Filtered FAQs
  const filteredFaqs = category.faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(query.toLowerCase()) ||
      faq.a.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main className="min-h-screen text-gray-200 px-6 py-16 bg-[#0b0b0b]">
      <div className="max-w-5xl mx-auto mt-10">
        {/* Title + Search row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <h3 className="hidden sm:block text-3xl md:text-4xl text-white text-center md:text-left">
            {category.title}
          </h3>
          <h4 className="block sm:hidden text-3xl md:text-4xl text-white text-center md:text-left">
            {category.title}
          </h4>

          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#50a8ff]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-gray-400">No results found.</p>
          ) : (
            filteredFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

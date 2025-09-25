"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Search, Mail, MessageSquare, BookOpen, User, CreditCard, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { faqData } from "./faq/[slug]/faqData"
import "@/app/globals.css";



// Simple Card Component
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl shadow-md ${className}`}>{children}</div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-5 sm:p-6 ${className}`}>{children}</div>
)

// Simple Button Component
const Button = ({
  children,
  className = "",
  variant = "solid",
  onClick,
}: {
  children: React.ReactNode
  className?: string
  variant?: "solid" | "outline"
  onClick?: () => void
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium transition-all"
  const solid = "bg-[#50a8ff] hover:bg-[#00f8ff] text-black"
  const outline = "border border-[#50a8ff] text-[#50a8ff] hover:bg-[#50a8ff]/10"

  return (
    <button onClick={onClick} className={`${base} ${variant === "solid" ? solid : outline} ${className}`}>
      {children}
    </button>
  )
}

export default function SupportPage() {
  const [query, setQuery] = useState("")
  const [highlightIndex, setHighlightIndex] = useState(0)
  const resultsRef = useRef<HTMLDivElement | null>(null)

  const categories = [
    {
      title: "Account & Login",
      icon: <User className="w-6 h-6 text-[#FB8500]" />,
      links: [
        { label: "Create Account", href: "/sign-up" },
        { label: "Reset Password", href: "/account" },
        { label: "Manage Maxy ID", href: "/account" },
        // { label: "Verification Issues", href: "/support/verification-issues" },
      ],
    },
    // {
    //   title: "Using Maxy Apps",
    //   icon: <BookOpen className="w-6 h-6 text-[#FFB703]" />,
    //   links: [
    //     { label: "Tackle Guide", href: "/support/tackle-guide" },
    //     { label: "Share Space Help", href: "/support/share-space-help" },
    //     { label: "Reveion Support", href: "/support/reveion-support" },
    //   ],
    // },
    // {
    //   title: "Billing & Payments",
    //   icon: <CreditCard className="w-6 h-6 text-[#8ECAE6]" />,
    //   links: [
    //     { label: "Subscription Plans", href: "/support/subscription-plans" },
    //     { label: "Refunds", href: "/support/refunds" },
    //     { label: "Payment Methods", href: "/support/payment-methods" },
    //   ],
    // },
    // {
    //   title: "Troubleshooting",
    //   icon: <AlertCircle className="w-6 h-6 text-red-500" />,
    //   links: [
    //     { label: "App Not Opening", href: "/support/app-not-opening" },
    //     { label: "Sync Issues", href: "/support/sync-issues" },
    //     { label: "Notification Problems", href: "/support/notification-problems" },
    //   ],
    // },
    {
      title: "Feedback & Suggestions",
      icon: <MessageSquare className="w-6 h-6 text-green-500" />,
      links: [
        { label: "Report a Bug", href: "/contact" },
        { label: "Request a Feature", href: "/contact" },
        { label: "Share Your Ideas", href: "/contact" },
      ],
    },
    {
      title: "FAQs",
      icon: <Search className="w-6 h-6 text-[#50a8ff]" />,
      links: [
        { label: "FAQ Maxy", href: "/support/faq/maxy" },
        // { label: "FAQ Corex", href: "/support/faq/corex" },
        // { label: "FAQ WoC", href: "/support/faq/woc" },
      ],
    },

  ]


  const filteredCategories = query
    ? categories.filter((cat) =>
      cat.links.some((link) =>
        link.label.toLowerCase().includes(query.toLowerCase())
      )
    )
    : categories


  const searchResults = query
    ? [
      // normal category links
      ...categories.flatMap((cat) =>
        cat.links
          .filter((link) =>
            link.label.toLowerCase().includes(query.toLowerCase())
          )
          .map((match) => ({
            category: cat.title,
            link: match.label,
            href: match.href,
          }))
      ),
      // faq entries
      ...Object.entries(faqData).flatMap(([slug, data]) =>
        data.faqs
          .filter((faq) =>
            faq.q.toLowerCase().includes(query.toLowerCase())
          )
          .map((faq) => ({
            category: data.title,
            link: faq.q,
            href: `/support/faq/${slug}`,
          }))
      ),
    ]
    : []




  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchResults.length) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightIndex((prev) => (prev + 1) % searchResults.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      const selected = searchResults[highlightIndex]
      if (selected) window.location.href = selected.href
    }
  }

  useEffect(() => {
    setHighlightIndex(0) // reset when query changes
  }, [query])

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-4 sm:px-6 py-6 sm:py-8 pt-12 sm:mt-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/brand/maxy_sup.png"
            alt="Support"
            width={120}
            height={120}
            className="w-48 sm:w-62 h-auto drop-shadow-lg"
          />
          <p className="text-gray-400 max-w-xl text-sm sm:text-base">
            Find answers, guides, and ways to get in touch with Maxy support.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-xl mx-auto w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for help..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#1a1a1a] border border-gray-700 focus:outline-none focus:border-[#50a8ff] text-sm sm:text-base text-gray-200"
          />

          {/* Search Dropdown */}
          {query && searchResults.length > 0 && (
            <div
              ref={resultsRef}
              className="absolute mt-3 w-full bg-[#111] border border-gray-700 rounded-xl shadow-xl max-h-64 overflow-y-auto z-10 text-left"
            >
              {searchResults.map((result, i) => (
                <Link
                  key={`${result.category}-${result.link}`}
                  href={result.href}
                  className={`block px-4 py-2.5 text-sm transition-colors ${i === highlightIndex
                      ? "bg-[#1a1a1a] text-[#50a8ff]"
                      : "text-gray-300 hover:bg-[#1a1a1a] hover:text-[#50a8ff]"
                    }`}
                >
                  {result.link}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Categories */}
      <section className="max-w-6xl mx-auto mt-10 sm:mt-12 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((cat) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-[#111] border border-gray-700 hover:border-[#50a8ff] transition-all">
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  {cat.icon}
                  <h6 className="text-base sm:text-xlg font-regular">{cat.title}</h6>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm">
                  {cat.links.map((link) => (
                    <li key={`${cat.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="hover:text-[#50a8ff] cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>


      {/* Contact Section */}
      <section className="max-w-3xl mx-auto text-center mt-12 sm:mt-16 space-y-4 sm:space-y-6">
        {/* <h4 className="text-xl sm:text-2xl font-bold text-[#50a8ff]">Still need help?</h4>
        <p className="text-gray-300 text-sm sm:text-base">
          Reach out to our team directly, or explore other ways to connect.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button variant="solid">
            <Mail className="w-5 h-5 mr-2" /> Email Support
          </Button>
          <Button variant="outline">
            <MessageSquare className="w-5 h-5 mr-2" /> Live Chat
          </Button>
        </div> */}

        {/* Cross-link to Contact Page */}
        <p className="text-gray-400 text-xs sm:text-sm mt-6 mb-8">
          📩 Looking to reach us for <span className="text-gray-200">business, media, or other inquiries</span>?{" "}
          <Link href="/contact" className="text-[#50a8ff] hover:underline">
            Visit our Contact Page
          </Link>.
        </p>
      </section>

    </main>
  )
}

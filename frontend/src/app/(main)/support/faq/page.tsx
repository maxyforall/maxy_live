"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FAQHome() {
    const faqSections = [
        {
            title: "Maxy FAQ",
            description: "Common questions about Maxy, accounts, and settings.",
            href: "/support/faq/maxy",
            icon: "/brand/W_logo.svg",
        },
        // {
        //     title: "Corex FAQ",
        //     description: "Get help with Corex features, usage, and troubleshooting.",
        //     href: "/support/faq/corex",
        //     icon: "/brand/corex/corex_logo.svg",
        // },
        // {
        //     title: "WoC FAQ",
        //     description: "Learn more about WoC, workflows, and best practices.",
        //     href: "/support/faq/woc",
        //     icon: "/brand/woc/woc_logo.svg",
        // },
        // {
        //   title: "Community FAQ",
        //   description: "Guidelines, contributions, and collaboration details.",
        //   href: "/support/faq/community",
        //   icon: "/faq/general.svg",
        // },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 mt-16 mb-16">
            {/* Heading */}
            <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-white">Frequently Asked Questions</h3>
                <p className="mt-3 text-gray-400 text-lg">
                    Find answers by exploring the FAQ sections below.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {faqSections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Link href={section.href}>
                            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 h-full flex flex-col gap-4 
                              hover:border-white/20 hover:shadow-lg hover:shadow-black/40 
                              transition-all duration-300 cursor-pointer">

                                {/* Icon */}
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5">

                                    <span className="flex items-center justify-center w-18 h-18 text-2xl font-bold">M</span>
                                </div>

                                {/* Title + Description */}
                                <div>
                                    <h4 className="text-xl font-semibold text-white mb-2">{section.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{section.description}</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

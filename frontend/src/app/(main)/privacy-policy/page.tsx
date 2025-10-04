"use client";

import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from './../components/Loading';

export default function PrivacyPolicy() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex max-w-screen-xl mx-auto mt-16 px-4 py-10 text-secondary">
      {/* Left Sidebar */}
      <aside className="w-70 mr-10 hidden md:block sticky top-20 self-start">
        <div className="mb-8">
          {/* Maxy Branding */}
          <h4 className="text-3xl font-bold mb-6 text-primary">Privacy Policy</h4>
          {/* <p className="text-secondary">
            <strong>Version:</strong> 1.0
          </p> */}
          <p className="text-secondary"><strong>Last updated:</strong> September 24, 2025</p>
        </div>
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
          <nav className="text-sm space-y-3 flex flex-col">
            <a href="#interpretation" className="block text-secondary hover:text-primary transition-colors">1. Interpretation and Definitions</a>
            <a href="#What We Collect" className="block text-secondary hover:text-primary transition-colors">2. What We Collect </a>
            <a href="#Tracking Technologies and Cookies" className="block text-secondary hover:text-primary transition-colors">3. Tracking Technologies and Cookies</a>
            <a href="#How We Use Your Data" className="block text-secondary hover:text-primary transition-colors">4. How We Use Your Data</a>
            <a href="#Sharing Your Data" className="block text-secondary hover:text-primary transition-colors">5. Sharing Your Data</a>
            <a href="#Data Retention" className="block text-secondary hover:text-primary transition-colors">6. Data Retention</a>
            <a href="#International Transfers" className="block text-secondary hover:text-primary transition-colors">7. International Transfers</a>
            <a href="#Your Rights and Choices" className="block text-secondary hover:text-primary transition-colors">8. Your Rights and Choices</a>
            <a href="#Childrens Privacy" className="block text-secondary hover:text-primary transition-colors">9. Children's Privacy</a>
            <a href="#Links to Other Websites" className="block text-secondary hover:text-primary transition-colors">10. Links to Other Websites</a>
            <a href="#Policy Updates" className="block text-secondary hover:text-primary transition-colors">11. Policy Updates</a>
            <a href="#Contact Us" className="block text-secondary hover:text-primary transition-colors">12. Contact Us</a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6 mb-10 mt-2 md:mt-12 animate-slide-up">

        <div className="mb-8 block md:hidden">
          {/* Maxy Branding */}
          <h4 className="text-3xl font-bold mb-6 text-primary">Privacy Policy</h4>
          {/* <p className="text-secondary">
            <strong>Version:</strong> 1.0
          </p> */}
          <p className="text-secondary">
            <strong>Last updated:</strong> September 24, 2025
          </p>
        </div>



        <p className="text-secondary leading-relaxed">
          Welcome to Maxy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you engage with Maxy and its unified account system.
        </p>

        <p className="text-secondary leading-relaxed">
          At Maxy (“Maxy,” “we,” “our,” or “us”), your privacy is important to us. We’re committed to safeguarding your data while delivering secure, human-centered digital experiences that empower productivity, creativity, and community connection.
        </p>

        <p className="text-secondary leading-relaxed">
          By using our website, mobile applications, or any of our services, you agree to the collection and use of your information under this Privacy Policy.
        </p>

        <section id="interpretation" className="space-y-4">
          <h5 className="text-2xl text-primary">1. Interpretation and Definitions</h5>

          <div className="space-y-4">
            <div>
              <strong className="text-primary">Interpretation</strong>
              <p className="text-secondary leading-relaxed">
                Words with capitalized first letters have specific meanings defined below. These definitions apply regardless of whether they appear in singular or plural form.
              </p>
            </div>

            <div>
              <strong className="text-primary">Definitions</strong>
            </div>

            <ul className="pl-2 space-y-2 text-secondary">
              <li><strong className="text-primary">Account:</strong> A unique profile created for you to access Maxy Services.</li>
              <li><strong className="text-primary">Affiliate:</strong> Any entity under common control with Maxy.</li>
              <li><strong className="text-primary">Company:</strong> Refers to Maxy, based in Hyderabad, Telangana, India.</li>
              <li><strong className="text-primary">Cookies:</strong> Small data files placed on your device for functionality, tracking, and personalization.</li>
              <li><strong className="text-primary">Country:</strong> Telangana, India.</li>
              <li><strong className="text-primary">Device:</strong> Any device used to access Maxy services, including mobile phones, tablets, or computers.</li>
              <li><strong className="text-primary">Personal Data:</strong> Information that identifies or could identify you.</li>
              <li><strong className="text-primary">Service:</strong> The Maxy website, its centralized account system, and related features.</li>
              <li><strong className="text-primary">Service Provider:</strong> Third parties that support the operation, improvement, and maintenance of our services.</li>
              <li><strong className="text-primary">Usage Data:</strong> Automatically collected information related to how our services are used.</li>
              <li><strong className="text-primary">Website:</strong> Refers to Maxy, available at <a href="https://maxy.co.in" className="text-blue-400">maxy.co.in</a>.</li>
              <li><strong className="text-primary">You:</strong> Any individual or entity accessing or using Maxy Services.</li>
            </ul>
          </div>
        </section>

        <section id="What We Collect" className="space-y-4">
          <h5 className="text-2xl text-primary">2. What We Collect</h5>

          <div className="space-y-4">
            <div>
              <h6 className="text-lg font-semibold text-primary mb-2">Personal Data</h6>
              <p className="text-secondary leading-relaxed">
                To access any Maxy service or platform, users must create a Maxy ID through our centralized account system. During registration, we collect the following personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-secondary mt-2">
                <li>First Name</li>
                <li>Last Name</li>
                <li>Date of Birth</li>
                <li>Gender</li>
                <li>Professional Email</li>
                <li>Maxy ID (a unique identifier used across all Maxy products)</li>
                <li>Password (encrypted and securely stored)</li>
                <li><strong>Profile Picture (optional):</strong> Users may upload a profile picture to personalize their account. Profile pictures are stored securely and used within the Maxy platform as described in this Privacy Policy.</li>
              </ul>
              <p className="text-secondary leading-relaxed mt-2">
                Your Maxy ID enables <strong>single sign-on access</strong> across the Maxy ecosystem. This ensures a unified identity, seamless login, and consistent data handling across all Maxy services.
              </p>
            </div>

            <div>
              <h6 className="text-lg font-semibold text-primary mb-2">Usage Data</h6>
              <p className="text-secondary leading-relaxed">
                When you interact with any Maxy service, we may automatically collect certain technical and usage information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-secondary mt-2">
                <li>IP address</li>
                <li>Browser type and version </li>
                <li>Pages visited and interaction history</li>
                <li>Timestamps and session duration</li>
                <li>Device type, operating system, and device identifiers</li>
                <li>Login activity and security logs</li>
              </ul>
              <p className="text-secondary leading-relaxed mt-2">
                This data helps us monitor service performance, enhance user experience, and improve platform stability and security.
              </p>
            </div>
          </div>
        </section>

        <section id="Tracking Technologies and Cookies" className="space-y-4">
          <h5 className="text-2xl text-primary">3. Tracking Technologies and Cookies</h5>
          <p className="text-secondary leading-relaxed">
            We use cookies and related technologies to enhance your experience.
          </p>
          <div>
            <strong className="text-primary">Types of Cookies:</strong>
            <ul className="list-disc pl-6 space-y-1 text-secondary mt-2">
              <li><strong>Essential Cookies:</strong> Required for basic functionality and authentication.</li>
              <li><strong>Preference Cookies:</strong> Store your settings and preferences.</li>
              <li><strong>Analytics Cookies:</strong> Help us improve performance and reliability.</li>
              <li><strong>Notice Cookies:</strong> Record cookie consent.</li>
            </ul>
          </div>
          <p className="text-secondary leading-relaxed">
            You can control cookies via your browser settings.
          </p>
        </section>

        <section id="How We Use Your Data" className="space-y-4">
          <h5 className="text-2xl text-primary">4. How We Use Your Data</h5>
          <p className="text-secondary leading-relaxed">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-secondary">
            <li>Create and manage your Maxy ID</li>
            <li>Authenticate you across the Maxy ecosystem</li>
            <li>Operate, maintain, and improve our account system</li>
            <li>Personalize your experience</li>
            <li>Communicate with you (e.g., security updates, account notices)</li>
            <li>Detect, prevent, and address fraud, abuse, or technical issues</li>
            <li>Enforce terms and meet legal obligations</li>
            <li><strong>Profile Pictures:</strong> Profile pictures are collected and stored securely. They are used to personalize your account, display on Maxy services, and enhance social features. You retain ownership of your profile picture.</li>
          </ul>
        </section>

        <section id="Sharing Your Data" className="space-y-4">
          <h5 className="text-2xl text-primary">5. Sharing Your Data</h5>
          <p className="text-secondary leading-relaxed">
            We may share your data with:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-secondary">
            <li><strong>Service Providers:</strong> For hosting, authentication, analytics, and technical support</li>
            <li><strong>Legal Authorities:</strong> When required to comply with applicable law</li>
            <li><strong>Business Transfers:</strong> During a merger, acquisition, or asset sale</li>
            <li><strong>With Your Consent:</strong> For any additional purposes not covered here</li>
          </ul>
          <p className="text-secondary leading-relaxed">
            We do <strong>not sell your personal data.</strong>
          </p>
        </section>

        <section id="Data Retention" className="space-y-4">
          <h5 className="text-2xl text-primary">6. Data Retention</h5>
          <p className="text-secondary leading-relaxed">
            We retain personal data only as long as necessary for the purposes described in this policy or to meet legal obligations. Upon deletion of your Maxy ID, associated data is permanently deleted unless retention is required by law.
          </p>
        </section>

        <section id="International Transfers" className="space-y-4">
          <h5 className="text-2xl text-primary">7. International Transfers</h5>
          <p className="text-secondary leading-relaxed">
            If you are outside India, your data may be transferred to and processed in India. We use appropriate safeguards for such international transfers.
          </p>
        </section>

        <section id="Your Rights and Choices" className="space-y-4">
          <h5 className="text-2xl text-primary">8. Your Rights and Choices</h5>
          <p className="text-secondary leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-secondary">
            <li>Access, update, or delete your data</li>
            <li>Object to certain data uses</li>
            <li>Withdraw consent (where applicable)</li>
            <li>Manage cookie preferences</li>
          </ul>
          <p className="text-secondary leading-relaxed">
            To exercise these rights, sign in to your Maxy account or contact us.
          </p>
        </section>

        <section id="Childrens Privacy" className="space-y-4">
          <h5 className="text-2xl text-primary">9. Children's Privacy</h5>
          <p className="text-secondary leading-relaxed">
            Maxy is intended for general audiences. We do not knowingly collect personal data from children under the age of 13 without parental consent. If such data is discovered, we will delete it promptly. Contact us at <strong>support@maxy.co.in</strong> if you believe this has occurred.
          </p>
        </section>

        <section id="Links to Other Websites" className="space-y-4">
          <h5 className="text-2xl text-primary">10. Links to Other Websites</h5>
          <p className="text-secondary leading-relaxed">
            Our website currently does not link to third-party websites. If this changes, we will update this policy. Linked sites have their own privacy policies.
          </p>
        </section>

        <section id="Policy Updates" className="space-y-4">
          <h5 className="text-2xl text-primary">11. Policy Updates</h5>
          <p className="text-secondary leading-relaxed">
            We may revise this policy occasionally. Updates will be posted with a new <strong>"Last updated"</strong> date. Significant changes may be communicated via email or within our services.
          </p>
        </section>

        <section id="Contact Us" className="space-y-4">
          <h5 className="text-2xl text-primary">12. Contact Us</h5>
          <div className="space-y-2">
            <p className="text-secondary leading-relaxed">
              For questions or concerns about this Privacy Policy:
            </p>
            <div className="space-y-1">
              <p className="text-secondary">Email: <strong>support@maxy.co.in</strong></p>
              <p className="text-secondary">Website: <a href="https://maxy.co.in" className="text-blue-400">maxy.co.in</a></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Loading from '../components/Loading';

export default function Contact() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    description: '',
  });
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | null>(null);

  // Add subscription state
  const [email, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log("Backend API:", API_URL);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/contact/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ fullname: '', email: '', subject: '', description: '' });
      } else {
        console.error('Error response:', result);
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
    }
  };

  // Subscription handler
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/subscribe/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      if (res.ok) {
        setSubscribeStatus('success');
        setSubscribeEmail('');
      } else {
        setSubscribeStatus('error');
      }
    } catch {
      setSubscribeStatus('error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen w-full flex flex-col mt-16" style={{ backgroundColor: 'var(--background)' }}>
      {/* Section 1 - Hero */}
      <div className="h-[760px] flex flex-col items-center justify-center px-4">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:space-x-20 space-y-8 md:space-y-0">
          <h2 className="hidden sm:block text-5xl md:text-7xl font-medium leading-tight text-center md:text-left opacity-95 text-primary">
            <span className="block">Let's</span>
            <span className="block">
              Connect
              <span className="text-secondary">!</span>
            </span>
          </h2>
          <h3 className="block sm:hidden text-5xl md:text-7xl font-medium leading-tight text-center md:text-left opacity-95 text-primary">
            <span className="block">Let's</span>
            <span className="block">
              Connect
              <span className="text-secondary">!</span>
            </span>
          </h3>
          <div className="w-[350px] h-[350px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px]">
            <DotLottieReact
              src="https://lottie.host/5d1b8f40-ac28-4180-b0b7-5fadf923dda7/wO7s1HwdmU.lottie"
              loop
              autoplay
            />
          </div>

        </div>
        <p className="mt-8 text-center text-base md:text-lg max-w-xl text-secondary">
          Have questions or want to stay updated on our progress? We'd love to hear from you.
        </p>
      </div>

      {/* Section 2 */}
      <div className="w-full flex flex-col items-center justify-center px-6 py-6" style={{ backgroundColor: 'var(--background)' }}>
        <p className="text-4xl text-center mt-6 bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent font-bold leading-tight max-w-4xl">
          Let's build something great together. Drop us a message below.
        </p>
      </div>

      {/* Section 3 - Form */}
      <div className="min-h-screen relative flex flex-col lg:flex-row items-center justify-center gap-40 px-6 py-10 ">
        <div className="w-full max-w-lg text-primary space-y-5">
          <h3 className="hidden sm:block text-3xl font-semibold text-center lg:text-left">
            We'd Love to Hear From You
          </h3>
          <h4 className="block sm:hidden text-3xl font-semibold text-center lg:text-left">
            We'd Love to Hear From You
          </h4>
          <p className="text-lg text-center lg:text-left text-secondary">
            If you have any questions, want to share feedback or suggestions, or wish to collaborate, we're here to help.
          </p>
          <p className="text-lg text-center lg:text-left text-secondary">
            Whether you're exploring opportunities, reporting an issue, or simply reaching out with a general inquiry, fill out the form and our team will respond within 24-48 hours.
          </p>
          <p className="text-lg text-center lg:text-left text-secondary">
            We truly value your input and look forward to connecting with you!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md form space-y-5">
          <h4 className="text-2xl font-semibold text-center text-primary">Contact Us</h4>

          <div>
            <label htmlFor="fullname" className="block mb-1 text-sm text-secondary">Full Name</label>
            <input
              type="text"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="input w-full focus-ring"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-secondary">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input w-full focus-ring"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-1 text-sm text-secondary">Subject</label>
            <div className="relative">
              <select
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input w-full appearance-none focus-ring"
                style={{ paddingRight: '2.5rem' }}
              >
                <option value="" disabled hidden>Select a subject</option>

                <optgroup label="General" className="surface-tertiary text-secondary px-2 py-1">
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="suggestions">Suggestions</option>
                </optgroup>

                <optgroup label="Involvement" className="surface-tertiary text-secondary px-2 py-1">
                  <option value="collaboration">Collaboration</option>
                  <option value="opportunities">Opportunities</option>
                </optgroup>

                <optgroup label="Support" className="surface-tertiary text-secondary px-2 py-1">
                  <option value="issue-reporting">Issue Reporting</option>
                  <option value="other">Other</option>
                </optgroup>
              </select>

              {/* Dropdown Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-disabled">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 text-sm text-secondary">Description</label>
            <textarea
              id="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              required
              className="input w-full resize-none focus-ring"
            />
          </div>

          <button type="submit" className="btn-primary w-full py-3 font-semibold">
            Submit
          </button>

          {status === 'loading' && <p className="text-warning text-sm text-center">Submitting...</p>}
          {status === 'success' && <p className="text-success text-sm text-center">Message sent successfully!</p>}
          {status === 'error' && <p className="text-error text-sm text-center">Submission failed. Please try again.</p>}

          {/* Cross-link to Support Page */}
          <p className="text-gray-500 text-xs sm:text-sm text-center mt-4">
            💡 Need technical help, troubleshooting, or product support?{" "}
            <a href="/support" className="text-primary hover:underline">
              Visit our Support Page
            </a>.
          </p>
        </form>
      </div>

      {/* Section 4 - Newsletter Subscription */}
      <div className="w-full flex flex-col items-center justify-center px-6 py-6" style={{ backgroundColor: 'var(--form-background)' }}>
        <form
          onSubmit={handleSubscribe}
          className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-4"
        >
          <p className="text-center md:text-left text-sm md:text-base md:w-1/3 w-full text-primary">
            Subscribe to get the latest updates and news from us:
          </p>
          <input
            type="email"
            value={email}
            onChange={e => setSubscribeEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input w-full md:flex-1 focus-ring"
          />
          <button
            type="submit"
            className={`btn-primary w-full md:w-auto px-6 py-3 font-semibold ${subscribeStatus === 'loading' ? 'disabled' : ''}`}
            disabled={subscribeStatus === 'loading'}
          >
            {subscribeStatus === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Subscribing...
              </span>
            ) : 'Subscribe'}
          </button>
        </form>

        <div className="w-full max-w-3xl mt-2 min-h-[28px] flex items-center justify-center">
          {subscribeStatus === 'success' && (
            <div className="w-full flex items-center justify-center">
              <span className="bg-success/10 text-success px-4 py-2 rounded-lg text-sm font-medium text-center w-full md:w-auto transition-all duration-200">
                <svg className="inline-block mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Subscribed successfully!
              </span>
            </div>
          )}
          {subscribeStatus === 'error' && (
            <div className="w-full flex items-center justify-center">
              <span className="bg-error/10 text-error px-4 py-2 rounded-lg text-sm font-medium text-center w-full md:w-auto transition-all duration-200">
                <svg className="inline-block mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Subscription failed. Please try again.
              </span>
            </div>
          )}
          {subscribeStatus === 'loading' && (
            <div className="w-full flex items-center justify-center">
              <span className="bg-warning/10 text-warning px-4 py-2 rounded-lg text-sm font-medium text-center w-full md:w-auto transition-all duration-200">
                <svg className="inline-block mr-2 h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Subscribing...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, AtSign, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

import Maintenance from '@/app/(main)/components/Maintenance';

const MAINTENANCE_MODE = true;

export default function SignIn() {
  if (MAINTENANCE_MODE) {
      return <Maintenance />;
    }
  const [formData, setFormData] = useState({ maxyId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log("Backend API:", API_URL);

  const validateMaxyId = (id: string) =>
    /^(?!.*\.\.)(?!\.)(?!\.$)[a-z0-9._]{3,30}$/.test(id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.maxyId.trim()) newErrors.maxyId = 'Maxy ID is required';
    else if (!validateMaxyId(formData.maxyId)) newErrors.maxyId = 'Format: username_1234';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in multiple locations for compatibility
        localStorage.setItem('token', data.token);
        localStorage.setItem('corex_token', data.token); // For Corex platform compatibility
        localStorage.setItem('user', JSON.stringify(data.user));

        toast.success('Login successful! Welcome back to Maxy!');
        window.location.href = '/';
      } else {
        toast.error(`Login failed: ${data.message || 'Invalid credentials'}`);
      }
    } catch (error: any) {
      toast.error(`Network error: ${error.message}. Please check if the server is running.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden bg-[#0b0b0b]">

      {/* Left Side (Image/Video) - only on large screens */}
      <div className="hidden lg:flex lg:w-3/5 h-screen p-10 relative">
        <div className="h-full w-full flex items-center justify-center relative rounded-[30px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.75)]">
          <Image
            src="/Auth/auth_bg.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute z-10 flex flex-col items-center justify-center">
            <img
              src="/brand/W_logo.png"
              alt="Maxy Logo"
              className="w-14 h-14 mb-4"
            />
          </div>
        </div>
      </div>

      {/* Right Side (Signin Form) */}
      <div className="w-full lg:w-2/5 flex items-start justify-center sm:items-center p-6 sm:p-8 ">
        <div className="w-full max-w-lg space-y-8">
          {/* Header */}
          <div className="text-center mb-10">
            {/* ✅ Maxy logo – visible only on small screens */}
            <img
              src="/brand/W_logo.png"
              alt="Maxy Logo"
              className="mx-auto mb-4 block sm:hidden w-10 h-auto"
            />
            <h3 className="hidden sm:block text-white text-2xl font-bold">Welcome Back</h3>
            <h4 className="block sm:hidden text-white text-2xl font-bold">Welcome Back</h4>
            <p className="text-gray-400">Sign in to your Maxy account</p>
          </div>

          {/* Card */}
          <div className="bg-neutral-800 rounded-2xl shadow-xl p-4 border border-neutral-700 space-y-5">

            {/* Maxy ID */}
            <div>
              <label htmlFor="maxyId" className="block text-sm font-semibold text-white mb-2">
                Maxy ID *
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="maxyId"
                  name="maxyId"
                  value={formData.maxyId}
                  onChange={handleInputChange}
                  placeholder="username_2024"
                  autoComplete="username"
                  className={`pl-10 w-full rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#50A8FF] outline-none transition-all duration-200 bg-neutral-900 text-white border ${errors.maxyId ? 'border-red-500' : 'border-neutral-700'}`}
                />
              </div>
              {errors.maxyId && <p className="mt-1 text-xs text-red-400">{errors.maxyId}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`pl-10 pr-10 w-full rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#50A8FF] outline-none transition-all duration-200 bg-neutral-900 text-white border ${errors.password ? 'border-red-500' : 'border-neutral-700'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
            </div>

            {/* Remember Me / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-gray-400 text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-600 bg-neutral-900"
                />
                <span>Remember me</span>
              </label>
              {/* <button type="button" className="text-sm text-[#50A8FF] hover:underline">
              Forgot password?
            </button> */}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-1 bg-gradient-to-r from-[#1E88E5] to-[#50A8FF] text-white disabled:opacity-50 disabled:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>

            {/* Sign Up */}
            <p className="text-sm text-gray-400 text-center">
              Don’t have an account?{' '}
              <a href="/sign-up" className="text-[#50A8FF] font-semibold hover:underline">
                Create Maxy ID
              </a>
            </p>
          </div>

          {/* Footer Links */}
          <div className="text-center text-xs text-gray-500 space-x-3">
            <a href="/privacy-policy" className="hover:text-[#50A8FF]">Privacy Policy</a>
            <span>•</span>
            <a href="/terms-of-service" className="hover:text-[#50A8FF]">Terms of Service</a>
            <span>•</span>
            <a href="/support" className="hover:text-[#50A8FF]">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
}

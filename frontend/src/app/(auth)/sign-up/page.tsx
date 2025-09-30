"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Calendar, UserCheck, Lock, Hash, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

// Current terms version
const CURRENT_TERMS_VERSION = "1.0";


export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    professionalMail: '',
    maxyId: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log("Backend API:", API_URL);


  const validateMaxyId = (id: string) => {
    const pattern = /^(?!.*\.\.)(?!\.)(?!\.$)[a-z0-9._]{3,13}$/;
    return pattern.test(id);
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateDateOfBirth = (dateStr: string) => {
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateStr.match(datePattern);

    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return false;
    }

    const today = new Date();
    if (date > today) return false;

    const age = today.getFullYear() - year;
    const monthDiff = today.getMonth() - (month - 1);
    const dayDiff = today.getDate() - day;

    if (age < 13 || (age === 13 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'dateOfBirth') {
      let formattedValue = value.replace(/\D/g, '');

      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
      }
      if (formattedValue.length >= 5) {
        formattedValue = formattedValue.substring(0, 5) + '/' + formattedValue.substring(5, 9);
      }

      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        if (!formData.dateOfBirth) {
          newErrors.dateOfBirth = 'Date of birth is required';
        } else if (!validateDateOfBirth(formData.dateOfBirth)) {
          if (formData.dateOfBirth.length !== 10) {
            newErrors.dateOfBirth = 'Please enter date in DD/MM/YYYY format';
          } else {
            newErrors.dateOfBirth = 'Please enter a valid date. You must be at least 13 years old';
          }
        }
        if (!formData.gender) {
          newErrors.gender = 'Gender is required';
        }
        break;

      case 2:
        if (!formData.professionalMail.trim()) {
          newErrors.professionalMail = 'Professional email is required';
        } else if (!validateEmail(formData.professionalMail)) {
          newErrors.professionalMail = 'Please enter a valid email address';
        }
        break;

      case 3:
        if (!formData.maxyId.trim()) {
          newErrors.maxyId = 'Maxy ID is required';
        } else if (!validateMaxyId(formData.maxyId)) {
          newErrors.maxyId = 'Format: username_1234';
        }
        break;

      case 4:
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else {
          const passwordValidation = validatePassword(formData.password);
          if (!passwordValidation.isValid) {
            newErrors.password = 'Password does not meet all requirements';
          }
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!termsAccepted) {
          newErrors.terms = 'You must accept the terms and conditions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      // Add terms acceptance data to the submission
      const submissionData = {
        ...formData,
        termsAccepted: termsAccepted,
        termsVersion: CURRENT_TERMS_VERSION,
        termsAcceptanceDate: new Date().toISOString()
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in multiple locations for compatibility
        localStorage.setItem('token', data.token);
        localStorage.setItem('corex_token', data.token); // For Corex platform compatibility

        // ✅ Themed success toast
        toast.success('🎉 Registration successful! Welcome to Maxy!');

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = '/sign-in';
        }, 1500);
      } else {
        toast.error(data.message || 'Registration failed. Please try again.');
      }
    } catch (error: any) {
      toast.error(`Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Personal Info';
      case 2: return 'Contact';
      case 3: return 'Maxy ID';
      case 4: return 'Security';
      default: return 'Registration';
    }
  };

  const passwordValidation = validatePassword(formData.password);

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

  {/* Right Side (Signup Form) */}
  <div className="w-full lg:w-2/5 flex items-start sm:items-center justify-center p-6 sm:p-8">
    <div className="w-full max-w-lg space-y-8">

      {/* Header */}
      <div className="text-center mb-6 sm:mb-10">
        <img
          src="/brand/W_logo.png"
          alt="Maxy Logo"
          className="mx-auto mb-4 sm:hidden w-10 h-auto"
        />
        <h4 className="text-white text-2xl font-bold">Create Maxy ID</h4>
        <p className="text-gray-400">Join the Maxy community today</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step < currentStep ? 'bg-[#50a8ff] text-white' :
                  step === currentStep ? 'bg-[#50a8ff] text-white' :
                  'bg-neutral-700 text-gray-400'
                }`}
              >
                {step < currentStep ? <Check className="h-4 w-4" /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`w-12 h-0.5 mx-2 transition-all duration-300 rounded-full ${
                    step < currentStep ? 'bg-[#50A8FF]' : 'bg-neutral-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h5 className="text-white font-semibold">{getStepTitle()}</h5>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-neutral-800 rounded-2xl shadow-xl p-4 border border-neutral-700 space-y-5">

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-white mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className={`pl-10 w-full rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#50A8FF] outline-none transition-all duration-200 bg-neutral-900 text-white border ${errors.firstName ? 'border-red-500' : 'border-neutral-700'
                        }`}
                    />
                  </div>
                  {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-white mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className={`pl-10 w-full rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#50A8FF] outline-none transition-all duration-200 bg-neutral-900 text-white border ${errors.lastName ? 'border-red-500' : 'border-neutral-700'
                        }`}
                    />
                  </div>
                  {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-white mb-2">
                  Date of Birth *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    maxLength={10}
                    placeholder="DD/MM/YYYY"
                    className={`pl-10 w-full rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#50A8FF] outline-none transition-all duration-200 bg-neutral-900 text-white border ${errors.dateOfBirth ? 'border-red-500' : 'border-neutral-700'}`}
                  />
                </div>
                {errors.dateOfBirth && <p className="mt-1 text-xs text-red-400">{errors.dateOfBirth}</p>}
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-semibold text-white mb-2">
                  Gender *
                </label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`pl-10 w-full rounded-xl px-3 py-2.5 mr-4 text-sm focus:ring-2 focus:ring-[#50A8FF] outline-none transition-all duration-200 bg-neutral-900 text-white border ${errors.gender ? 'border-red-500' : 'border-neutral-700'}`}
                  >
                    <option value="" className="text-gray-500">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                {errors.gender && <p className="mt-1 text-xs text-red-400">{errors.gender}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div>
              <label htmlFor="professionalMail" className="block text-sm font-semibold text-white mb-2">
                Professional Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  id="professionalMail"
                  name="professionalMail"
                  value={formData.professionalMail}
                  onChange={handleInputChange}
                  placeholder="your.email@company.com"
                  autoComplete="email"
                  className={`pl-10 w-full rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#50A8FF] outline-none transition-all duration-200 bg-neutral-900 text-white border ${errors.professionalMail ? 'border-red-500' : 'border-neutral-700'}`}
                />
              </div>
              <p className="mt-2 text-xs text-gray-400">
                We'll use this email to send you important updates.
              </p>
              {errors.professionalMail && <p className="mt-1 text-xs text-red-400">{errors.professionalMail}</p>}
            </div>
          )}

          {/* Step 3: Maxy ID */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="maxyId" className="block text-sm font-semibold text-white mb-2">
                  Maxy ID *
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="maxyId"
                    name="maxyId"
                    value={formData.maxyId}
                    onChange={handleInputChange}
                    placeholder="john.doe_2024"
                    autoComplete="username"
                    className={`pl-10 w-full rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#50A8FF] outline-none transition-all duration-200 bg-neutral-900 text-white border ${errors.maxyId ? 'border-red-500' : 'border-neutral-700'}`}
                    pattern="^(?!.*\.\.)(?!\.)(?!\.$)[a-z0-9._]{3,13}$"
                  />
                </div>
                {errors.maxyId && <p className="mt-1 text-xs text-red-400">{errors.maxyId}</p>}
              </div>

              <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-700">
                <p className="text-sm font-semibold mb-1 text-white">Format Requirements:</p>
                <p className="text-xs text-gray-400">
                  Must be 3–13 characters<br />
                  Only lowercase letters, numbers, dots (.), and underscores (_)<br />
                  Cannot start or end with a dot, and no consecutive dots
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Password */}
          {currentStep === 4 && (
            <div className="space-y-5">
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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
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
                {formData.password && (
                  <div className="mt-3 bg-neutral-900 rounded-xl p-4 border border-neutral-700">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${passwordValidation.minLength ? 'bg-green-500' : 'bg-neutral-600'}`}></div>
                        <span className={`text-xs ${passwordValidation.minLength ? 'text-green-500' : 'text-gray-400'}`}>8+ chars</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${passwordValidation.hasUpperCase ? 'bg-green-500' : 'bg-neutral-600'}`}></div>
                        <span className={`text-xs ${passwordValidation.hasUpperCase ? 'text-green-500' : 'text-gray-400'}`}>Uppercase</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${passwordValidation.hasLowerCase ? 'bg-green-500' : 'bg-neutral-600'}`}></div>
                        <span className={`text-xs ${passwordValidation.hasLowerCase ? 'text-green-500' : 'text-gray-400'}`}>Lowercase</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${passwordValidation.hasNumbers ? 'bg-green-500' : 'bg-neutral-600'}`}></div>
                        <span className={`text-xs ${passwordValidation.hasNumbers ? 'text-green-500' : 'text-gray-400'}`}>Number</span>
                      </div>
                      <div className="flex items-center space-x-2 col-span-2">
                        <div className={`w-2 h-2 rounded-full ${passwordValidation.hasSpecialChar ? 'bg-green-500' : 'bg-neutral-600'}`}></div>
                        <span className={`text-xs ${passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>Special character</span>
                      </div>
                    </div>
                  </div>
                )}
                {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className={`pl-10 pr-10 w-full rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#50A8FF] outline-none transition-all duration-200 bg-neutral-900 text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-neutral-700'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
              </div>
              {/* ✅ Terms & Privacy acknowledgement */}
              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-neutral-600 bg-neutral-900 text-[#50A8FF] focus:ring-[#50A8FF]"
                />
                <label htmlFor="terms" className="text-xs text-gray-400">
                  I agree to the{' '}
                  <a href="/terms-of-service" className="text-[#50A8FF] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and acknowledge the{' '}
                  <a href="/privacy-policy" className="text-[#50A8FF] hover:underline">
                    Privacy Policy
                  </a>.
                </label>
              </div>
              {errors.terms && <p className="mt-1 text-xs text-red-400">{errors.terms}</p>}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80 bg-neutral-700 text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-1 bg-gradient-to-r from-[#1E88E5] to-[#50A8FF] text-white"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 bg-[#50A8FF] text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  'Create ID'
                )}
              </button>
            )}
          </div>

          {/* Sign In Link */}
          <p className="text-sm text-gray-400 text-center">
            Already have an account?{' '}
            <a href="/sign-in" className="text-[#50A8FF] font-semibold hover:underline">
              Sign in here
            </a>
          </p>
        </div>

         {/* Footer Links */}
      <div className="text-center text-xs text-gray-500 space-x-3 mt-4 sm:mt-6">
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

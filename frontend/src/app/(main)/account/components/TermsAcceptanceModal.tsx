'use client';

import { useState } from 'react';
import { FaFileAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useProfile, TermsAcceptanceData } from '../hooks/useProfile';

export const TermsAcceptanceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentTermsAccepted: boolean;
  currentTermsVersion?: string;
}> = ({ isOpen, onClose, currentTermsAccepted, currentTermsVersion }) => {
  const { acceptTerms, updating } = useProfile();
  const [accepted, setAccepted] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);

  const LATEST_TERMS_VERSION = '1.0.0';
  const TERMS_LAST_UPDATED = 'January 1, 2025';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accepted) {
      toast.error('You must accept the terms and conditions to continue');
      return;
    }

    if (!hasReadTerms) {
      toast.error('Please confirm that you have read the terms and conditions');
      return;
    }

    const termsData: TermsAcceptanceData = {
      accepted: true,
      version: LATEST_TERMS_VERSION
    };

    const result = await acceptTerms(termsData);
    
    if (result.success) {
      setAccepted(false);
      setHasReadTerms(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <FaFileAlt className="w-6 h-6 text-blue-400" />
          <h5 className="text-2xl font-semibold text-white tracking-wide">
            Terms and Conditions
          </h5>
        </div>

        {currentTermsAccepted && currentTermsVersion === LATEST_TERMS_VERSION && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <div className="flex items-center gap-3">
              <FaCheck className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-300 font-medium">Terms Already Accepted</p>
                <p className="text-green-400 text-sm">
                  You have already accepted the latest terms and conditions (Version {LATEST_TERMS_VERSION}).
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
          <div className="flex items-center gap-3">
            <FaFileAlt className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-blue-300 font-medium">Version {LATEST_TERMS_VERSION}</p>
              <p className="text-blue-400 text-sm">
                Last updated: {TERMS_LAST_UPDATED}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg max-h-64 overflow-y-auto">
          <h6 className="text-lg font-semibold text-white mb-4">Maxy Terms of Service</h6>
          
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h3 className="font-medium text-white mb-2 block">1. Acceptance of Terms</h3>
              <p>
                By accessing and using Maxy services, you agree to be bound by these Terms of Service.
                If you do not agree with any part of these terms, you may not use our services.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-2 block">2. User Responsibilities</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account information
                and for all activities that occur under your account. You agree to notify us
                immediately of any unauthorized use of your account.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-2 block">3. Privacy and Data Protection</h3>
              <p>
                We are committed to protecting your privacy and personal information. Our Privacy
                Policy explains how we collect, use, and protect your data.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-2 block">4. Service Usage</h3>
              <p>
                You agree to use Maxy services only for lawful purposes and in accordance with these
                Terms. You may not use our services in any way that could damage, disable, or
                impair our services.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-2 block">5. Intellectual Property</h3>
              <p>
                All content, features, and functionality of Maxy services are owned by Maxy and are
                protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-2 block">6. Termination</h3>
              <p>
                We may terminate or suspend your account and access to our services at any time,
                with or without cause, with or without notice.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-2 block">7. Changes to Terms</h3>
              <p>
                We reserve the right to modify these terms at any time. We will notify you of any
                changes by posting the new terms on this page and updating the version number.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasReadTerms}
                onChange={(e) => setHasReadTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">
                I have read and understood the Terms and Conditions
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">
                I accept the Terms and Conditions and agree to be bound by them
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              disabled={updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={updating || !accepted || !hasReadTerms || (currentTermsAccepted && currentTermsVersion === LATEST_TERMS_VERSION)}
            >
              {updating ? 'Accepting...' : 'Accept Terms'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
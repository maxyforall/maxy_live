"use client";

import { FaEdit, FaLock, FaPowerOff, FaEnvelope, FaUser, FaCalendar, FaVenusMars, FaBriefcase, FaKey, FaShieldAlt, FaQuestionCircle, FaTrash, FaCamera, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, Hash, Shield, Settings, Trash2, Edit3, Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ToastProvider } from './components/ToastNotification';
import { useProfile } from './hooks/useProfile';
import { InlineEditableField } from './components/InlineEditableField';
import { PasswordChangeModal } from './components/PasswordChangeModal';
import { MaxyIdChangeModal } from './components/MaxyIdChangeModal';
import { TermsAcceptanceModal } from './components/TermsAcceptanceModal';
import DpUploadModal from './components/DpUploadModal';
import "@/app/globals.css";

import Loading from "../components/Loading";

// Service interface
interface Service {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  logo: string;
}

export default function AccountPage() {
  const router = useRouter();
  const {
    profile,
    loading,
    updating,
    uploadingDP,
    fetchProfile,
    updateProfile,
    changePassword,
    updateMaxyId,
    acceptTerms,
    deactivateAccount,
    uploadDisplayPicture
  } = useProfile();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("edit-details");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showMaxyIdModal, setShowMaxyIdModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [useInlineEdit, setUseInlineEdit] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editField, setEditField] = useState<{
    field: string;
    value: string;
    type?: string;
    options?: string[]
  } | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  console.log("Backend API:", API_URL);


  const handleSaveDp = async (file: File | null) => {
    try {
      await uploadDisplayPicture(file);
    } catch (error) {
      console.error('Error saving display picture:', error);
    }
  };



  const services: Service[] = [
    // {
    //   id: '1',
    //   name: "Tackle",
    //   status: "inactive",
    //   logo: "tackle_logo.png"
    // },
    // {
    //   id: '2',
    //   name: "Corex",
    //   status: "inactive",
    //   logo: "corex_logo.png"
    // },
    // {
    //   id: '3',
    //   name: "Woc",
    //   status: "inactive",
    //   logo: "woc_logo.png"
    // },
    // {
    //   id: '4',
    //   name: "CtoC",
    //   status: "inactive",
    //   logo: "ctoC_logo.png"
    // },
  ];

  // Sort services: Active first, then Inactive
  const sortedServices = services.sort((a, b) => {
    if (a.status === "active" && b.status === "inactive") return -1;
    if (a.status === "inactive" && b.status === "active") return 1;
    return 0;
  });

  const tabs = [
    { id: "edit-details", label: "Edit Details", icon: FaEdit },
    { id: "security", label: "Security", icon: FaLock },
    { id: "account-settings", label: "Account Settings", icon: FaUser },
    { id: "help-support", label: "Help & Support", icon: FaQuestionCircle },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is authenticated
      const mainToken = localStorage.getItem('token');
      const corexToken = localStorage.getItem('corex_token');
      const wocToken = localStorage.getItem('woc_token');

      const hasValidToken = mainToken || corexToken || wocToken;

      if (!hasValidToken) {
        setIsAuthenticated(false);
        router.push('/sign-in');
        return;
      }

      setIsAuthenticated(true);
      fetchProfile();
    };

    checkAuth();
  }, []);

  // Auto-refresh user details after modifications
  useEffect(() => {
    const handleProfileUpdate = () => {
      fetchProfile();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleInlineSave = async (field: string, newValue: string) => {
    const success = await handleSaveField(field, newValue);
    if (success) {
      // Dispatch custom event to trigger profile refresh
      window.dispatchEvent(new CustomEvent('profileUpdated'));
    }
  };

  const handleSaveField = async (field: string, newValue: string) => {
    try {
      const updates: Partial<{
        firstName?: string;
        lastName?: string;
        emailId?: string;
        dateOfBirth?: string;
        gender?: string;
      }> = {};

      // Handle individual field updates
      if (field === 'firstName') {
        if (!newValue.trim()) {
          toast.error('First name cannot be empty');
          return false;
        }
        updates.firstName = newValue.trim();
      }
      else if (field === 'lastName') {
        if (!newValue.trim()) {
          toast.error('Last name cannot be empty');
          return false;
        }
        updates.lastName = newValue.trim();
      }
      else if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newValue.trim())) {
          toast.error('Please enter a valid email address');
          return false;
        }
        updates.emailId = newValue.trim();
      }
      else if (field === 'dateOfBirth') {
        // Handle both dd/mm/yyyy and yyyy-mm-dd formats
        let dateToValidate = newValue;
        if (newValue.includes('/')) {
          const [day, month, year] = newValue.split('/');
          if (day && month && year) {
            dateToValidate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          }
        }

        const birthDate = new Date(dateToValidate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        if (age < 13) {
          toast.error('You must be at least 13 years old');
          return false;
        }

        if (age > 120) {
          toast.error('Please enter a valid date of birth');
          return false;
        }

        updates.dateOfBirth = newValue;
      }
      else if (field === 'gender') {
        updates.gender = newValue.toLowerCase();
      }
      else if (field === 'name') {
        const nameParts = newValue.trim().split(' ');
        if (nameParts.length < 2) {
          toast.error('Please enter both first and last name');
          return false;
        }
        updates.firstName = nameParts[0];
        updates.lastName = nameParts.slice(1).join(' ');
      }

      const result = await updateProfile(updates);

      if (result.success) {
        toast.success('Profile updated successfully!');
        window.dispatchEvent(new CustomEvent('profileUpdated'));
        return true;
      } else {
        toast.error(result.error || 'Failed to update profile');
        return false;
      }
    } catch (error) {
      console.error('Error saving field:', error);
      toast.error('An unexpected error occurred while updating your profile');
      return false;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !profile?._id) {
        toast.error('Authentication error');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/${profile._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account deleted successfully');
        // Use comprehensive logout function
        import('../utils/auth').then(({ logoutUser }) => {
          logoutUser(undefined, '/', undefined);
        });
      } else {
        toast.error(data.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error('An error occurred while deleting your account');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString && dateString.includes('/')) {
      return dateString;
    }

    if (dateString) {
      try {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      } catch (error) {
        return dateString;
      }
    }
    return '';
  };

  const getMaxyIdStatus = () => {
    if (!profile?.profile_created_at) {
      return { text: 'Loading...', className: 'text-gray-400' };
    }

    try {
      const createdAt = new Date(profile.profile_created_at);
      const now = new Date();
      const changeAvailableDate = new Date(createdAt);
      changeAvailableDate.setDate(createdAt.getDate() + 30);

      const timeDiff = changeAvailableDate.getTime() - now.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (daysRemaining <= 0) {
        return { text: 'Available to change', className: 'text-green-400' };
      } else {
        const formattedDate = changeAvailableDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        return {
          text: `Can change from ${formattedDate}`,
          className: 'text-yellow-400'
        };
      }
    } catch (error) {
      console.error('Error calculating Maxy ID status:', error);
      return { text: 'Status unavailable', className: 'text-gray-400' };
    }
  };

  const canChangeMaxyId = () => {
    if (!profile?.profile_created_at) return false;
    try {
      const createdAt = new Date(profile.profile_created_at);
      const now = new Date();
      const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceCreation >= 30;
    } catch (error) {
      console.error('Error calculating Maxy ID change eligibility:', error);
      return false;
    }
  };

  const getDaysRemainingForMaxyIdChange = () => {
    if (!profile?.profile_created_at) return 0;
    try {
      const createdAt = new Date(profile.profile_created_at);
      const now = new Date();
      const changeAvailableDate = new Date(createdAt);
      changeAvailableDate.setDate(createdAt.getDate() + 30);

      const timeDiff = changeAvailableDate.getTime() - now.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return Math.max(0, daysRemaining);
    } catch (error) {
      console.error('Error calculating days remaining:', error);
      return 0;
    }
  };

  // Validation functions for inline editing
  const validateEmail = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const validateName = (value: string): string | null => {
    if (!value.trim()) {
      return 'This field cannot be empty';
    }
    if (value.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    return null;
  };

  const validateDateOfBirth = (value: string): string | null => {
    // Check format (dd/mm/yyyy)
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(value)) {
      return 'Please enter date in DD/MM/YYYY format';
    }

    const [day, month, year] = value.split('/').map(Number);

    // Basic date validation
    if (month < 1 || month > 12) {
      return 'Invalid month';
    }
    if (day < 1 || day > 31) {
      return 'Invalid day';
    }

    // Create date and validate age
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 13) {
      return 'You must be at least 13 years old';
    }

    if (age > 120) {
      return 'Please enter a valid date of birth';
    }

    return null;
  };

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 md:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            You’re not signed in
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
            To continue, please sign in with your account.
            This helps us keep your data safe and personalized.
          </p>

          <button
            onClick={() => router.push('/sign-in')}
            className="bg-blue-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-lg
               hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Sign-In
          </button>
        </div>

      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (!profile && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8 py-6">
          {/* Error Icon */}
          <div className="text-red-400 mb-4">
            <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto" />
          </div>

          {/* Main Message */}
          <p className="text-gray-200 text-base sm:text-lg md:text-xl font-semibold mb-2">
            Oops! We couldn’t load your profile.
          </p>

          {/* User-level guidance */}
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-4">
            This might be a temporary issue. Please check your connection or try again in a moment.
          </p>

          {/* Retry Button */}
          <button
            onClick={fetchProfile}
            className="bg-blue-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-lg
               hover:bg-blue-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>

      </div>
    );
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case "edit-details":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h5 className="text-3xl font-light text-white mb-10">Personal Details</h5>
            </div>

            {updating && (
              <div className="flex items-center text-blue-400 mb-6">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-2"></div>
                <span className="text-sm">Updating...</span>
              </div>
            )}

            {/* Display Picture */}
            <div className="mb-12">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {profile?.displayPicture ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${profile.displayPicture}`}
                      alt="Profile Picture"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full flex items-center justify-center bg-blue-500 text-white text-5xl font-bold border-2 border-gray-700">
                      {profile?.firstName?.charAt(0) || ''}
                      {profile?.lastName?.charAt(0) || ''}
                    </div>
                  )}
                  {/* <button
                    onClick={() => setShowModal(true)}
                    className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition"
                  >
                    <FaEdit className="w-3 h-3 text-white" />
                  </button> */}
                  <DpUploadModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveDp}
                  />
                </div>
                <div className="space-y-2">
                </div>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="space-y-6 text-white">
              {/* Inline editing – always enabled */}
              <div className="space-y-6">
                <InlineEditableField
                  label="First Name"
                  value={profile?.firstName || ''}
                  field="firstName"
                  type="text"
                  onSave={handleInlineSave}
                  validate={validateName}
                  placeholder="Enter your first name"
                />

                <InlineEditableField
                  label="Last Name"
                  value={profile?.lastName || ''}
                  field="lastName"
                  type="text"
                  onSave={handleInlineSave}
                  validate={validateName}
                  placeholder="Enter your last name"
                />

                <InlineEditableField
                  label="Date of Birth"
                  value={formatDate(profile?.dateOfBirth || '')}
                  field="dateOfBirth"
                  type="text"
                  onSave={handleInlineSave}
                  validate={validateDateOfBirth}
                  placeholder="DD/MM/YYYY"
                />

                <InlineEditableField
                  label="Gender"
                  value={profile?.gender || 'Not specified'}
                  field="gender"
                  type="select"
                  options={['male', 'female', 'other', 'prefer_not_to_say']}
                  onSave={handleInlineSave}
                />

                <InlineEditableField
                  label="Professional Email"
                  value={profile?.emailId || ''}
                  field="email"
                  type="email"
                  onSave={handleInlineSave}
                  validate={validateEmail}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Maxy ID (always separate) */}
              <div className="flex items-center justify-between py-5 border-b border-gray-800">
                <div className="flex-1">
                  <label className="text-sm text-gray-400 block mb-1 font-medium">Maxy ID</label>
                  <span className="text-white text-lg break-all">{profile?.maxy_id}</span>
                  <p className={`text-xs mt-1 ${getMaxyIdStatus().className}`}>
                    {getMaxyIdStatus().text}
                  </p>
                  {profile?.maxy_id_created_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      Created on {formatDate(profile.maxy_id_created_at)}
                    </p>
                  )}
                </div>
                {canChangeMaxyId() ? (
                  <button
                    className="text-blue-400 hover:text-blue-300 transition p-2"
                    onClick={() => setShowMaxyIdModal(true)}
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                ) : (
                  <FaLock className="text-gray-500 w-4 h-4" />
                )}
              </div>
            </div>



            {/* Terms Acceptance Warning */}
            {!profile?.terms_accepted && (
              <div className="mt-8 bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-semibold text-yellow-400">Terms & Conditions</h5>
                    <p className="text-sm text-yellow-300 mt-1">
                      Please accept our terms and conditions to continue using our services.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTermsModal(true)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                  >
                    Accept
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "security":
        return (
          <div className="space-y-8">
            <h5 className="text-3xl font-light text-white mb-10">Security Settings</h5>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-5 border-b border-gray-800">
                <div className="flex-1">
                  <span className="text-white text-lg block mb-1">Change Password</span>
                  <span className="text-gray-400 text-sm">Update your Maxy password</span>
                </div>
                <button
                  className="text-blue-400 hover:text-blue-300 transition font-medium px-3 py-1 cursor-pointer"
                  onClick={() => setShowPasswordModal(true)}
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between py-5 border-b border-gray-800">
                <div className="flex-1">
                  <span className="text-white text-lg block mb-1">Two-Factor Authentication</span>
                  <span className="text-gray-400 text-sm">Add an extra layer of security</span>
                </div>
                <button className="text-gray-500 transition font-medium px-3 py-1 cursor-not-allowed">
                  Coming Soon
                </button>
              </div>

              <div className="flex items-center justify-between py-5 border-b border-gray-800">
                <div className="flex-1">
                  <span className="text-white text-lg block mb-1">Login Attempts</span>
                  <span className="text-gray-400 text-sm">Recent login activity</span>
                </div>
                <span className="text-gray-400 text-sm">
                  {profile?.login_attempts || 0} attempts
                </span>
              </div>

              <div className="flex items-center justify-between py-5 border-b border-gray-800">
                <div className="flex-1">
                  <span className="text-white text-lg block mb-1">Sign Out All Devices</span>
                  <span className="text-gray-400 text-sm">End all active sessions</span>
                </div>

                <button
                  disabled
                  className="text-red-400 font-medium px-3 py-1 cursor-not-allowed opacity-50 transition"
                >
                  Sign Out All
                </button>
              </div>
            </div>
          </div>
        );

      case "account-settings":
        return (
          <div className="space-y-8">
            <h5 className="text-3xl font-light text-white mb-10">Account Settings</h5>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-5 border-b border-gray-800">
                <div className="flex-1">
                  <span className="text-white text-lg block mb-1">Account Status</span>
                  <span className="text-gray-400 text-sm capitalize">{profile?.account_status || 'active'}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${profile?.account_status === 'active'
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-red-900/30 text-red-400'
                  }`}>
                  {profile?.account_status || 'active'}
                </span>
              </div>

              <div className="flex items-center justify-between py-5 border-b border-gray-800">
                <div className="flex-1">
                  <span className="text-white text-lg block mb-1">Newsletter Subscriptions</span>
                  <span className="text-gray-400 text-sm">Manage your email preferences</span>
                </div>
                <button className="text-blue-400 cursor-not-allowed hover:text-blue-300 transition font-medium px-3 py-1">
                  Manage
                </button>
              </div>

              <div className="flex items-center justify-between py-5 border-b border-gray-800">
                <div className="flex-1">
                  <span className="text-white text-lg block mb-1">Sign Out</span>
                  <span className="text-gray-400 text-sm">Log out from your account</span>
                </div>
                <button
                  onClick={() => {
                    import('../utils/auth').then(({ logoutUser }) => {
                      logoutUser(null, '/sign-in');
                    });
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white transition font-medium px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaPowerOff className="w-4 h-4" />
                  Sign Out
                </button>
              </div>

              <div className="mt-16 pt-8 border-t border-red-900/30">
                <div className="flex items-center justify-between py-5">
                  <div className="flex-1">
                    <span className="text-red-400 text-lg block mb-1">Delete Account</span>
                    <span className="text-gray-400 text-sm">This action cannot be undone</span>
                  </div>
                  <button
                    className="text-red-400 hover:text-red-300 transition font-medium px-3 py-1 border border-red-400 rounded-lg hover:bg-red-400/10"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "help-support":
        return (
          <div className="space-y-8">
            <h5 className="text-3xl font-light text-white mb-10">Help & Support</h5>

            <div className="space-y-10">
              <div>
                <h5 className="text-xl text-white mb-6 font-medium">Contact Support</h5>
                <div className="space-y-4">
                  {[
                    { icon: "📩", text: "support@maxy.co.in" },
                    // { icon: "💬", text: "Live Chat (9 AM - 6 PM IST)" },
                    // { icon: "📞", text: "+91-XXXX-XXXX-XX" }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg">
                      <span className="text-2xl">{contact.icon}</span>
                      <span className="text-gray-300">{contact.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-8 mt-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-3xl font-light mb-3">Account Management</h4>
                <p className="text-gray-400">Manage your Maxy identity and active services</p>
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-8">
            <div className="flex overflow-x-auto gap-1 p-1 rounded-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-[30px] whitespace-nowrap transition ${activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-8 space-y-8">
                <div>
                  <h5 className="hidden sm:block text-md font-medium mb-4 text-white">Account Menu</h5>
                  <h6 className="block sm:hidden text-md font-medium mb-4 text-white">Account Menu</h6>
                  <nav className="space-y-1 flex-col">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${activeTab === tab.id
                            ? "bg-blue-900 text-white"
                            : "text-gray-500 hover:text-white hover:bg-gray-900"
                            }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* User Info */}
                <div className="pt-6 border-t border-gray-800">
                  <div className="flex items-center gap-4">
                    {profile?.displayPicture ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${profile.displayPicture}`}
                        alt="Profile Picture"
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-700"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-600 text-white text-xl font-semibold border-2 border-gray-700">
                        {profile?.firstName?.charAt(0) || ''}
                        {profile?.lastName?.charAt(0) || ''}
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-white">
                        {profile?.firstName} {profile?.lastName}
                      </p>
                      <p className="text-xs text-blue-400">@{profile?.maxy_id}</p>
                      <p className="text-xs text-gray-500">
                        Member since {formatDate(profile?.profile_created_at || '')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="bg-gray-900/30 rounded-xl p-6 lg:p-8">
                {renderMainContent()}
              </div>
            </div>

            {/* Right Sidebar - Services */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="sticky top-8">
                <h5 className="text-lg font-medium mb-6 text-white">Services</h5>

                {/* If no services */}
                {sortedServices.length === 0 ? (
                  <p className="text-gray-400 text-sm">No services</p>
                ) : (
                  <>
                    {/* Active Services */}
                    <div className="mb-8">
                      <h6 className="text-sm font-semibold text-gray-400 mb-4">Active Services</h6>
                      <div className="grid grid-cols-4 gap-4">
                        {sortedServices
                          .filter((service) => service.status === "active")
                          .map((service) => (
                            <div
                              key={service.name}
                              className="relative group flex items-center justify-center cursor-pointer hover:scale-105 transition"
                            >
                              {/\.(png|jpe?g)$/i.test(service.logo) ? (
                                <img
                                  src={`/servicelogo/${service.logo}`}
                                  alt="logo"
                                  className="h-8 w-8 object-contain"
                                />
                              ) : (
                                <span className="text-2xl">{service.logo}</span>
                              )}
                              <div className="absolute bottom-[-1.75rem] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-white bg-black px-2 py-1 rounded shadow-lg transition whitespace-nowrap">
                                {service.name}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Inactive Services */}
                    <div>
                      <h6 className="text-sm font-semibold text-gray-400 mb-4">Inactive Services</h6>
                      <div className="grid grid-cols-4 gap-4 opacity-60">
                        {sortedServices
                          .filter((service) => service.status !== "active")
                          .map((service) => (
                            <div
                              key={service.name}
                              className="relative group flex items-center justify-center"
                            >
                              {/\.(png|jpe?g)$/i.test(service.logo) ? (
                                <img
                                  src={`/servicelogo/${service.logo}`}
                                  alt="logo"
                                  className="h-8 w-8 object-contain"
                                />
                              ) : (
                                <span className="text-2xl text-gray-500">{service.logo}</span>
                              )}
                              <div className="absolute bottom-[-1.75rem] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-white bg-black px-2 py-1 rounded shadow-lg transition whitespace-nowrap">
                                {service.name}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 pt-16 mt-16 border-t border-gray-900">
            <p>Maxy ID is your universal login across all Maxy services</p>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordChangeModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
        />
      )}

      {showMaxyIdModal && (
        <MaxyIdChangeModal
          isOpen={showMaxyIdModal}
          onClose={() => setShowMaxyIdModal(false)}
          currentMaxyId={profile?.maxy_id || ''}
          canChange={profile?.can_change_maxy_id || false}
          daysRemaining={profile?.days_remaining_for_maxy_id_change || 0}
        />
      )}

      {showTermsModal && (
        <TermsAcceptanceModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          currentTermsAccepted={profile?.terms_accepted || false}
          currentTermsVersion={profile?.terms_version}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-[#0a0a0a] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Delete Account</h4>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data will be permanently removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-400 hover:text-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastProvider>
  );
}


'use client';

import { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useProfile, ChangePasswordData } from '../hooks/useProfile';

interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

export const PasswordChangeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { changePassword, updating } = useProfile();
  const [formData, setFormData] = useState<ChangePasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    isValid: false,
    errors: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (password: string): PasswordValidation => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('At least 8 characters');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('One lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('One uppercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('One number');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push('One special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    
    // Base strength from length
    if (password.length >= 12) strength += 30;
    else if (password.length >= 10) strength += 20;
    else if (password.length >= 8) strength += 15;
    
    // Character variety bonus
    checks.forEach(check => {
      if (check) strength += 14;
    });
    
    // Bonus for very long passwords
    if (password.length >= 16) strength += 10;
    
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (field: keyof ChangePasswordData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'newPassword') {
      const validation = validatePassword(value);
      setPasswordValidation(validation);
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.currentPassword.trim()) {
      return 'Current password is required';
    }
    
    if (!formData.newPassword.trim()) {
      return 'New password is required';
    }
    
    if (!formData.confirmPassword.trim()) {
      return 'Password confirmation is required';
    }
    
    if (formData.currentPassword === formData.newPassword) {
      return 'New password must be different from current password';
    }
    
    if (!passwordValidation.isValid) {
      return `Password requirements not met: ${passwordValidation.errors.join(', ')}`;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      return 'New passwords do not match';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await changePassword(formData);
      
      if (result.success) {
        toast.success('Password changed successfully!');
        // Reset form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordStrength(0);
        setPasswordValidation({ isValid: false, errors: [] });
        onClose();
      } else {
        // Handle specific error cases
        const errorMessage = result.error || 'Failed to change password';
        if (errorMessage.toLowerCase().includes('current password')) {
          toast.error('Current password is incorrect');
        } else if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('connection')) {
          toast.error('Network error. Please check your connection and try again');
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error('Password change error:', error);
      toast.error('An unexpected error occurred. Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      // Reset form state
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordStrength(0);
      setPasswordValidation({ isValid: false, errors: [] });
      setShowPasswords({ current: false, new: false, confirm: false });
      onClose();
    }
  };

  const getStrengthColor = (strength: number): string => {
    if (strength >= 80) return 'bg-green-500';
    if (strength >= 60) return 'bg-yellow-500';
    if (strength >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStrengthText = (strength: number): string => {
    if (strength >= 80) return 'Very Strong';
    if (strength >= 60) return 'Strong';
    if (strength >= 40) return 'Medium';
    if (strength >= 20) return 'Weak';
    return 'Very Weak';
  };

  if (!isOpen) return null;

  const isFormValid = formData.currentPassword && 
                     formData.newPassword && 
                     formData.confirmPassword && 
                     passwordValidation.isValid && 
                     formData.newPassword === formData.confirmPassword &&
                     formData.currentPassword !== formData.newPassword;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl mx-4">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <h5 className="mb-6 text-center text-2xl font-semibold text-white tracking-wide">
          Change Password
        </h5>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || updating}
                required
                autoComplete="current-password"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50"
                disabled={isSubmitting || updating}
                tabIndex={-1}
              >
                {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || updating}
                required
                autoComplete="new-password"
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50"
                disabled={isSubmitting || updating}
                tabIndex={-1}
              >
                {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Password Strength</span>
                  <span className={passwordStrength >= 60 ? 'text-green-400' : passwordStrength >= 40 ? 'text-yellow-400' : 'text-red-400'}>
                    {getStrengthText(passwordStrength)}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {[
                    { check: formData.newPassword.length >= 8, text: 'At least 8 characters' },
                    { check: /[a-z]/.test(formData.newPassword), text: 'One lowercase letter' },
                    { check: /[A-Z]/.test(formData.newPassword), text: 'One uppercase letter' },
                    { check: /[0-9]/.test(formData.newPassword), text: 'One number' },
                    { check: /[^A-Za-z0-9]/.test(formData.newPassword), text: 'One special character' }
                  ].map((req, index) => (
                    <div key={index} className={`flex items-center gap-2 ${req.check ? 'text-green-400' : 'text-gray-500'}`}>
                      {req.check ? <FaCheck className="w-3 h-3" /> : <FaExclamationTriangle className="w-3 h-3" />}
                      <span>{req.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 disabled:opacity-50 disabled:cursor-not-allowed ${
                  formData.confirmPassword && formData.newPassword !== formData.confirmPassword 
                    ? 'border-red-500' 
                    : 'border-gray-700'
                }`}
                disabled={isSubmitting || updating}
                required
                autoComplete="new-password"
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50"
                disabled={isSubmitting || updating}
                tabIndex={-1}
              >
                {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
            )}
            {formData.confirmPassword && formData.newPassword === formData.confirmPassword && formData.newPassword && (
              <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                <FaCheck className="w-3 h-3" /> Passwords match
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={!isFormValid || isSubmitting || updating}
            >
              {(isSubmitting || updating) ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Changing...
                </>
              ) : (
                'Change Password'
              )}
            </button>
          </div>
        </form>

        {/* Security Note */}
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <p className="text-xs text-blue-300 text-center">
            Your password will be securely encrypted and stored.
          </p>
        </div>
      </div>
    </div>
  );
};

// 'use client';

// import { useState } from 'react';
// import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { toast } from 'react-hot-toast';
// import { useProfile, ChangePasswordData } from '../hooks/useProfile';

// export const PasswordChangeModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
// }> = ({ isOpen, onClose }) => {
//   const { changePassword, updating } = useProfile();
//   const [formData, setFormData] = useState<ChangePasswordData>({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false
//   });
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const calculatePasswordStrength = (password: string): number => {
//     let strength = 0;
//     if (password.length >= 8) strength += 25;
//     if (/[a-z]/.test(password)) strength += 25;
//     if (/[A-Z]/.test(password)) strength += 25;
//     if (/[0-9]/.test(password)) strength += 25;
//     if (/[^A-Za-z0-9]/.test(password)) strength += 25;
//     return Math.min(strength, 100);
//   };

//   const handlePasswordChange = (field: keyof ChangePasswordData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
    
//     if (field === 'newPassword') {
//       setPasswordStrength(calculatePasswordStrength(value));
//     }
//   };

//   const validateForm = (): string | null => {
//     if (formData.newPassword !== formData.confirmPassword) {
//       return 'New passwords do not match';
//     }
//     if (formData.newPassword.length < 8) {
//       return 'New password must be at least 8 characters long';
//     }
//     if (passwordStrength < 50) {
//       return 'New password is too weak. Please use a stronger password';
//     }
//     return null;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const validationError = validateForm();
//     if (validationError) {
//       toast.error(validationError);
//       return;
//     }

//     const result = await changePassword(formData);
    
//     if (result.success) {
//       setFormData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//       setPasswordStrength(0);
//       onClose();
//     }
//   };

//   const getStrengthColor = (strength: number): string => {
//     if (strength >= 80) return 'bg-green-500';
//     if (strength >= 60) return 'bg-yellow-500';
//     if (strength >= 40) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   const getStrengthText = (strength: number): string => {
//     if (strength >= 80) return 'Very Strong';
//     if (strength >= 60) return 'Strong';
//     if (strength >= 40) return 'Medium';
//     if (strength >= 20) return 'Weak';
//     return 'Very Weak';
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl">
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           <FaTimes className="w-5 h-5" />
//         </button>

//         <h5 className="mb-6 text-center text-2xl font-semibold text-white tracking-wide">
//           Change Password
//         </h5>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Current Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPasswords.current ? 'text' : 'password'}
//                 value={formData.currentPassword}
//                 onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
//                 disabled={updating}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//               >
//                 {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               New Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPasswords.new ? 'text' : 'password'}
//                 value={formData.newPassword}
//                 onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
//                 disabled={updating}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//               >
//                 {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
            
//             {formData.newPassword && (
//               <div className="mt-2">
//                 <div className="flex justify-between text-xs text-gray-400 mb-1">
//                   <span>Password Strength</span>
//                   <span>{getStrengthText(passwordStrength)}</span>
//                 </div>
//                 <div className="w-full bg-gray-700 rounded-full h-2">
//                   <div
//                     className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
//                     style={{ width: `${passwordStrength}%` }}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Confirm New Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPasswords.confirm ? 'text' : 'password'}
//                 value={formData.confirmPassword}
//                 onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
//                 disabled={updating}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//               >
//                 {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
//               disabled={updating}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
//               disabled={updating}
//             >
//               {updating ? 'Changing...' : 'Change Password'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

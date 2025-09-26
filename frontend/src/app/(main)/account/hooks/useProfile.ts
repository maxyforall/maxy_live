import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  maxy_id: string;
  maxy_id_created_at: string;
  can_change_maxy_id: boolean;
  days_remaining_for_maxy_id_change: number;
  dateOfBirth?: string;
  gender?: string;
  terms_accepted: boolean;
  terms_accepted_at?: string;
  terms_version?: string;
  profile_completed: boolean;
  profile_created_at?: string;
  account_status: string;
  last_login?: string;
  last_modified?: string;
  login_attempts: number;
  displayPicture?: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  emailId?: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateMaxyIdData {
  newMaxyId: string;
}

export interface TermsAcceptanceData {
  accepted: boolean;
  version: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingDP, setUploadingDP] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log("Backend API:", API_URL);

  const getAuthHeaders = () => {
    // Try multiple token storage locations
    let token = localStorage.getItem('token'); // Main Maxy token
    
    // If no main token, try platform-specific tokens
    if (!token) {
      const corexToken = localStorage.getItem('corex_token');
      const wocToken = localStorage.getItem('woc_token');
      token = corexToken || wocToken;
    }
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const headers = getAuthHeaders();
      
      if (!headers.Authorization) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
        headers
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Failed to fetch profile: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load profile data');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: UpdateProfileData) => {
    try {
      setUpdating(true);
      
      // Validate input data
      if (profileData.firstName && profileData.firstName.trim().length < 2) {
        throw new Error('First name must be at least 2 characters long');
      }
      
      if (profileData.lastName && profileData.lastName.trim().length < 2) {
        throw new Error('Last name must be at least 2 characters long');
      }
      
      if (profileData.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.emailId)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (profileData.dateOfBirth) {
        const birthDate = new Date(profileData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 13) {
          throw new Error('You must be at least 13 years old');
        }
        
        if (age > 120) {
          throw new Error('Please enter a valid date of birth');
        }
      }
      
      if (profileData.gender && !['male', 'female', 'other', 'prefer_not_to_say'].includes(profileData.gender.toLowerCase())) {
        throw new Error('Please select a valid gender option');
      }
      console.log('Updating profile with data:', profileData);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        
        // Handle specific error cases
        let errorMessage = 'Failed to update profile';
        
        if (response.status === 400) {
          errorMessage = errorData.message || 'Invalid profile data provided';
        } else if (response.status === 401) {
          errorMessage = 'Not authorized to update profile';
        } else if (response.status === 403) {
          errorMessage = 'Access denied';
        } else if (response.status === 404) {
          errorMessage = 'User profile not found';
        } else if (response.status === 409) {
          errorMessage = 'Email address already in use';
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later';
        }
        
        throw new Error(errorMessage);
      }

      const updatedProfile = await response.json();
      console.log('Profile updated:', updatedProfile);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      
      let userMessage = 'Failed to update profile';
      
      if (error.message.includes('fetch')) {
        userMessage = 'Network error. Please check your connection and try again';
      } else if (error.message.includes('JSON')) {
        userMessage = 'Server error. Invalid response format';
      } else {
        userMessage = error.message;
      }
      
      toast.error(userMessage);
      return { success: false, error: userMessage };
    } finally {
      setUpdating(false);
    }
  };

  const changePassword = async (passwordData: ChangePasswordData) => {
    try {
      setUpdating(true);
      
      // Validate input data
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        throw new Error('All password fields are required');
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New password and confirmation do not match');
      }
      
      if (passwordData.newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }
      
      if (passwordData.currentPassword === passwordData.newPassword) {
        throw new Error('New password must be different from current password');
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        
        // Handle specific error cases
        let errorMessage = 'Failed to change password';
        
        if (response.status === 400) {
          errorMessage = errorData.message || 'Invalid password data provided';
        } else if (response.status === 401) {
          errorMessage = 'Current password is incorrect';
        } else if (response.status === 403) {
          errorMessage = 'Not authorized to change password';
        } else if (response.status === 404) {
          errorMessage = 'User not found';
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later';
        }
        
        throw new Error(errorMessage);
      }

      toast.success('Password changed successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Error changing password:', error);
      
      let userMessage = 'Failed to change password';
      
      if (error.message.includes('fetch')) {
        userMessage = 'Network error. Please check your connection and try again';
      } else if (error.message.includes('JSON')) {
        userMessage = 'Server error. Invalid response format';
      } else {
        userMessage = error.message;
      }
      
      toast.error(userMessage);
      return { success: false, error: userMessage };
    } finally {
      setUpdating(false);
    }
  };

  const updateMaxyId = async (maxyIdData: UpdateMaxyIdData) => {
    try {
      setUpdating(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update-maxy-id`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(maxyIdData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update Maxy ID');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      toast.success('Maxy ID updated successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Error updating Maxy ID:', error);
      toast.error(error.message || 'Failed to update Maxy ID');
      return { success: false, error: error.message };
    } finally {
      setUpdating(false);
    }
  };

  const acceptTerms = async (termsData: TermsAcceptanceData) => {
    try {
      setUpdating(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/accept-terms`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(termsData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to accept terms');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      toast.success('Terms accepted successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Error accepting terms:', error);
      toast.error(error.message || 'Failed to accept terms');
      return { success: false, error: error.message };
    } finally {
      setUpdating(false);
    }
  };

  const getAccountDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account-details`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch account details');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const deactivateAccount = async () => {
    try {
      setUpdating(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deactivate-account`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to deactivate account');
      }

      toast.success('Account deactivated successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Error deactivating account:', error);
      toast.error(error.message || 'Failed to deactivate account');
      return { success: false, error: error.message };
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Upload display picture
  const uploadDisplayPicture = async (file: File | null) => {
    try {
      setUploadingDP(true);
      
      if (!file) {
        // Handle DP removal
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/dp`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(`Failed to remove display picture: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        setProfile(data.user);
        toast.success('Display picture removed successfully');
        return data.user;
      } else {
        // Handle DP upload
        const formData = new FormData();
        formData.append('displayPicture', file);

        const headers = getAuthHeaders();
        // When using FormData, browser will automatically set the correct Content-Type with boundary
        // We should not include Content-Type header when sending FormData
        const { 'Content-Type': contentType, ...headersWithoutContentType } = headers;

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/dp`, {
          method: 'POST',
          headers: headersWithoutContentType,
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(`Failed to upload display picture: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        setProfile(data.user);
        toast.success('Display picture uploaded successfully');
        return data.user;
      }
    } catch (error) {
      console.error('Error handling display picture:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update display picture');
      throw error;
    } finally {
      setUploadingDP(false);
    }
  };

  return {
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
    uploadDisplayPicture,
    getAccountDetails
  };
};
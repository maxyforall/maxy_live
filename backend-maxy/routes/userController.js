import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { generateMaxyId, validateMaxyId, canModifyMaxyId } from '../utils/maxyIdGenerator.js';
import { validatePasswordStrength, sanitizePassword, isPasswordDifferent } from '../utils/passwordUtils.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
export const registerUser = async (req, res) => {
  try {
    console.log('📨 Registration request body:', req.body);
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      professionalMail,
      password,
      termsAccepted,
      termsVersion = '1.0',
      maxyId: requestedMaxyId
    } = req.body;

    if (!firstName || !lastName || !dateOfBirth || !gender || !professionalMail || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate terms acceptance
    const isTermsAccepted = termsAccepted === true || termsAccepted === 'true' || termsAccepted === 1;
    if (!isTermsAccepted) {
      return res.status(400).json({ message: 'You must accept the terms and conditions' });
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: 'Password does not meet requirements', 
        errors: passwordValidation.errors 
      });
    }

    const existingByEmail = await User.findOne({ emailId: professionalMail.toLowerCase() });
    if (existingByEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Handle Maxy ID - use requested one if provided and valid, otherwise generate new one
    let maxyId;
    
    if (requestedMaxyId) {
      // Check if the requested Maxy ID is already taken
      console.log('📝 Using requested Maxy ID:', requestedMaxyId);
      const existingByMaxyId = await User.findOne({ maxy_id: requestedMaxyId });
      if (existingByMaxyId) {
        return res.status(400).json({ message: 'Maxy ID is already taken' });
      }
      maxyId = requestedMaxyId;
    } else {
      // Generate unique Maxy ID
      try {
        maxyId = await generateMaxyId();
      } catch (error) {
        return res.status(500).json({ message: 'Unable to generate unique Maxy ID' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      dateOfBirth,
      gender: gender.toLowerCase(),
      emailId: professionalMail.toLowerCase(),
      maxy_id: maxyId,
      maxy_id_created_at: new Date(),
      password: hashedPassword,
      terms_accepted: isTermsAccepted,
      terms_accepted_at: new Date(),
      terms_version: termsVersion,
      profile_completed: true,
      profile_created_at: new Date(),
      account_status: 'active'
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        maxy_id: user.maxy_id,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        terms_accepted: user.terms_accepted,
        terms_accepted_at: user.terms_accepted_at,
        terms_version: user.terms_version,
        profile_completed: user.profile_completed,
        account_status: user.account_status
      },
    });
    
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
export const loginUser = async (req, res) => {
  try {
    const { maxyId, password } = req.body;
    if (!maxyId || !password) {
      return res.status(400).json({ message: 'Maxy ID and password are required' });
    }

    const user = await User.findOne({ maxy_id: maxyId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is active
    if (user.account_status !== 'active') {
      return res.status(403).json({ message: 'Account is not active' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Increment login attempts
      user.login_attempts += 1;
      await user.save();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    user.login_attempts = 0;
    user.last_login = new Date();
    await user.save();

    const token = generateToken(user._id);

    return res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        maxy_id: user.maxy_id,
        terms_accepted: user.terms_accepted,
        profile_completed: user.profile_completed,
        account_status: user.account_status,
        last_login: user.last_login
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user
export const logoutUser = (req, res) => {
  // Since JWT is stateless, we can't invalidate tokens on server
  // Client should remove token from storage
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
export const getUserProfile = async (req, res) => {
  try {
    // req.user is populated by the protect middleware
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const canChangeMaxyId = canModifyMaxyId(user.maxy_id_created_at);
    const daysRemaining = canChangeMaxyId ? 0 : Math.ceil((30 * 24 * 60 * 60 * 1000 - (new Date().getTime() - new Date(user.maxy_id_created_at).getTime())) / (24 * 60 * 60 * 1000));

    return res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      maxy_id: user.maxy_id,
      maxy_id_created_at: user.maxy_id_created_at,
      can_change_maxy_id: canChangeMaxyId,
      days_remaining_for_maxy_id_change: daysRemaining,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      terms_accepted: user.terms_accepted,
      terms_accepted_at: user.terms_accepted_at,
      terms_version: user.terms_version,
      profile_completed: user.profile_completed,
      profile_created_at: user.profile_created_at,
      account_status: user.account_status,
      last_login: user.last_login,
      last_modified: user.last_modified,
      login_attempts: user.login_attempts
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, emailId, dateOfBirth, gender } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate email format if provided
    if (emailId && emailId !== user.emailId) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailId)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      
      // Check if email is already taken
      const existingUser = await User.findOne({ emailId: emailId.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
    }

    // Validate date of birth format if provided
    if (dateOfBirth && dateOfBirth !== user.dateOfBirth) {
      const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dobRegex.test(dateOfBirth)) {
        return res.status(400).json({ message: 'Invalid date of birth format. Use DD/MM/YYYY' });
      }
    }

    // Validate gender if provided
    if (gender && gender !== user.gender) {
      const validGenders = ['male', 'female', 'other', 'prefer not to say'];
      if (!validGenders.includes(gender.toLowerCase())) {
        return res.status(400).json({ message: 'Invalid gender value' });
      }
    }

    // Update fields if provided
    if (firstName) user.firstName = firstName.trim();
    if (lastName) user.lastName = lastName.trim();
    if (emailId) user.emailId = emailId.toLowerCase().trim();
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender.toLowerCase();
    
    user.last_modified = new Date();
    const updatedUser = await user.save();

    return res.json({
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        emailId: updatedUser.emailId,
        maxy_id: updatedUser.maxy_id,
        dateOfBirth: updatedUser.dateOfBirth,
        gender: updatedUser.gender,
        terms_accepted: updatedUser.terms_accepted,
        profile_completed: updatedUser.profile_completed,
        account_status: updatedUser.account_status,
        last_modified: updatedUser.last_modified
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Ensure user can only delete their own account (unless admin)
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this user' });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: 'User account deleted successfully',
    });

  } catch (error) {
    console.error('❌ Delete user error:', error);
    return res.status(500).json({ success: false, message: 'Server error during deletion' });
  }
};

// @desc    Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: 'New password does not meet requirements', 
        errors: passwordValidation.errors 
      });
    }

    // Check if new password is different from current password
    const isDifferent = await isPasswordDifferent(newPassword, user.password, bcrypt);
    if (!isDifferent) {
      return res.status(400).json({ message: 'New password must be different from current password' });
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.last_modified = new Date();
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update Maxy ID
export const updateMaxyId = async (req, res) => {
  try {
    const { newMaxyId } = req.body;
    
    if (!newMaxyId) {
      return res.status(400).json({ message: 'New Maxy ID is required' });
    }

    // Validate Maxy ID format
    if (!validateMaxyId(newMaxyId)) {
      return res.status(400).json({ message: 'Invalid Maxy ID format' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if Maxy ID can be modified (30-day restriction)
    if (!canModifyMaxyId(user.maxy_id_created_at)) {
      const daysRemaining = Math.ceil((30 * 24 * 60 * 60 * 1000 - (new Date().getTime() - new Date(user.maxy_id_created_at).getTime())) / (24 * 60 * 60 * 1000));
      return res.status(400).json({ 
        message: `Maxy ID can only be changed after 30 days. ${daysRemaining} days remaining.` 
      });
    }

    // Check if new Maxy ID is already taken
    const existingUser = await User.findOne({ maxy_id: newMaxyId });
    if (existingUser) {
      return res.status(400).json({ message: 'Maxy ID already taken' });
    }

    // Update Maxy ID and creation timestamp
    user.maxy_id = newMaxyId;
    user.maxy_id_created_at = new Date();
    user.last_modified = new Date();
    await user.save();

    res.json({ 
      message: 'Maxy ID updated successfully',
      newMaxyId: user.maxy_id,
      maxy_id_created_at: user.maxy_id_created_at
    });
  } catch (error) {
    console.error('Update Maxy ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Accept terms and conditions
export const acceptTerms = async (req, res) => {
  try {
    const { termsVersion = '1.0' } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.terms_accepted = true;
    user.terms_accepted_at = new Date();
    user.terms_version = termsVersion;
    user.last_modified = new Date();
    await user.save();

    res.json({ 
      message: 'Terms and conditions accepted successfully',
      terms_accepted: user.terms_accepted,
      terms_accepted_at: user.terms_accepted_at,
      terms_version: user.terms_version
    });
  } catch (error) {
    console.error('Accept terms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get account status and details
export const getAccountDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const canChangeMaxyId = canModifyMaxyId(user.maxy_id_created_at);
    const daysRemaining = canChangeMaxyId ? 0 : Math.ceil((30 * 24 * 60 * 60 * 1000 - (new Date().getTime() - new Date(user.maxy_id_created_at).getTime())) / (24 * 60 * 60 * 1000));

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      maxy_id: user.maxy_id,
      maxy_id_created_at: user.maxy_id_created_at,
      can_change_maxy_id: canChangeMaxyId,
      days_remaining_for_maxy_id_change: daysRemaining,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      terms_accepted: user.terms_accepted,
      terms_accepted_at: user.terms_accepted_at,
      terms_version: user.terms_version,
      profile_completed: user.profile_completed,
      profile_created_at: user.profile_created_at,
      account_status: user.account_status,
      last_login: user.last_login,
      last_modified: user.last_modified,
      login_attempts: user.login_attempts
    });
  } catch (error) {
    console.error('Get account details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Deactivate account
export const deactivateAccount = async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ message: 'Password is required to deactivate account' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Deactivate account
    user.account_status = 'inactive';
    user.last_modified = new Date();
    await user.save();

    res.json({ message: 'Account deactivated successfully' });
  } catch (error) {
    console.error('Deactivate account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
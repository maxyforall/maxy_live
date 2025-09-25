import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/UserModel.js';
import { protect } from '../middleware/authMiddleware.js';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/profile');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use user ID + timestamp to ensure uniqueness
    const uniqueSuffix = `${req.user._id}-${Date.now()}`;
    const fileExt = path.extname(file.originalname);
    cb(null, `dp-${uniqueSuffix}${fileExt}`);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg and .png files are allowed'), false);
  }
};

// Configure upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: fileFilter
});

// @route   POST /api/upload/dp
// @desc    Upload display picture
// @access  Private
router.post('/dp', protect, upload.single('displayPicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get relative path for storing in DB
    const relativePath = `/uploads/profile/${req.file.filename}`;
    
    // Update user's display picture in database
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { displayPicture: relativePath },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Display picture uploaded successfully',
      user
    });
  } catch (error) {
    console.error('Error uploading display picture:', error);
    res.status(500).json({ 
      message: 'Error uploading display picture',
      error: error.message 
    });
  }
});

// @route   DELETE /api/upload/dp
// @desc    Remove display picture
// @access  Private
router.delete('/dp', protect, async (req, res) => {
  try {
    // Get current user
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user has a display picture, delete the file
    if (user.displayPicture) {
      const filePath = path.join(__dirname, '..', user.displayPicture);
      
      // Check if file exists before attempting to delete
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Update user to remove display picture reference
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { displayPicture: null },
      { new: true }
    ).select('-password');

    res.status(200).json({
      message: 'Display picture removed successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error removing display picture:', error);
    res.status(500).json({ 
      message: 'Error removing display picture',
      error: error.message 
    });
  }
});

export default router;
import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';
import User from '../models/UserModel.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
  changePassword,
  updateMaxyId,
  acceptTerms,
  getAccountDetails,
  deactivateAccount
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sendVerificationEmail } from '../services/emailService.js';

dotenv.config();
const router = express.Router();

/* ===========================
   PUBLIC ROUTES
=========================== */

// Register & Login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Send verification email
router.post("/send-verification", async (req, res) => {
  try {
    const { professionalMail } = req.body;
    if (!professionalMail) return res.status(400).json({ message: "Email required" });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

    await User.updateOne(
      { professionalMail },
      { professionalMail, emailVerificationToken: token, emailVerificationExpires: expires },
      { upsert: true }
    );

    const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${professionalMail}`;
    await sendVerificationEmail(professionalMail, link);

    res.json({ message: "Verification email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send verification email" });
  }
});

// Verify the email
router.get("/verify-email", async (req, res) => {
  try {
    const { token, email } = req.query;
    const user = await User.findOne({ professionalMail: email });

    if (!user || user.emailVerificationToken !== token) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (Date.now() > user.emailVerificationExpires) {
      return res.status(400).json({ message: "Link expired" });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.redirect(`${process.env.FRONTEND_URL}/verified-success`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
  }
});

// Check if email is verified
router.get("/check-email-verified", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ professionalMail: email });
    res.json({ verified: user?.emailVerified || false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to check verification status" });
  }
});

/* ===========================
   PROTECTED ROUTES
=========================== */

// Logout & Profile
router.post('/logout', protect, logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Account Management
router.post('/change-password', protect, changePassword);
router.put('/update-maxy-id', protect, updateMaxyId);
router.post('/accept-terms', protect, acceptTerms);
router.get('/account-details', protect, getAccountDetails);
router.post('/deactivate-account', protect, deactivateAccount);


/* ===========================
   ADMIN ROUTES
=========================== */

router.get('/getallusers', getAllUsers);
router.delete('/:id', protect, deleteUser);

export default router;

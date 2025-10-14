import express from 'express';
import User from '../models/UserModel.js';

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Public (Admin panel)
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PATCH /api/users/:id/deactivate
 * @desc    Deactivate user account
 * @access  Public (Admin panel)
 */
router.patch('/:id/deactivate', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.account_status = 'deactivated';
    await user.save();

    res.json({ message: 'User deactivated successfully', user });
  } catch (error) {
    console.error('❌ Error deactivating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Permanently delete a user
 * @access  Public (Admin panel)
 */
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

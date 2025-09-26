import express from 'express';
import Subscribe from '../models/Subscribe.js';

const router = express.Router();

// @route   POST /api/subscribe/create
// @desc    Subscribe with email only
// @access  Public
router.post('/create', async (req, res) => {
  try {
    const { email } = req.body;

    // Basic email validation
    if (
      !email ||
      !/^(?!\.)[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: 'A valid email is required.'
      });
    }

    // Check if email is already subscribed
    const existing = await Subscribe.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed.'
      });
    }

    // Create new subscription entry
    const newSubscribe = new Subscribe({ email });
    const savedSubscribe = await newSubscribe.save();

    res.status(201).json({
      success: true,
      message: 'Subscription successful',
      data: savedSubscribe
    });
  } catch (error) {
    console.error('Error submitting subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
});

// @route   GET /api/subscribe
// @desc    Get all subscription entries (could be protected in production)
// @access  Private (in production)
router.get('/', async (req, res) => {
  try {
    const subscribes = await Subscribe.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: subscribes.length,
      data: subscribes
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
});

// @route   DELETE /api/subscribe/:id
// @desc    Delete a subscription by ID
// @access  Private (or public, depending on your needs)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Subscribe.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully',
      data: deleted
    });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
});

export default router;

// routes/productRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js'; // Maxy user model

const router = express.Router();

/**
 * POST /auth/verify
 * Verify a Maxy user's credentials for any Maxy product.
 */
router.post('/auth/verify', async (req, res) => {
  try {
    const { maxyId, password, productId } = req.body;

    if (!maxyId || !password || !productId) {
      return res.status(400).json({
        success: false,
        message: 'MaxyID, password, and productId are required'
      });
    }

    // Find user by MaxyID
    const user = await User.findOne({ maxy_id: maxyId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Check if user has access to the product
    const hasAccess = user.hasProduct(productId);

    res.json({
      success: true,
      verified: true,
      hasAccess,
      user: {
        name: `${user.firstName} ${user.lastName || ''}`.trim(),
        email: user.emailId,
        maxyId: user.maxy_id
      }
    });
  } catch (error) {
    console.error('Error in /auth/verify:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * POST /users/update
 * Update a Maxy user to add or remove access for a specific product.
 */
router.post('/users/update', async (req, res) => {
  try {
    const { maxyId, productId, enable = true } = req.body;

    if (!maxyId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'MaxyID and productId are required'
      });
    }

    const user = await User.findOne({ maxy_id: maxyId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let changed = false;

    if (enable) {
      changed = await user.addProduct(productId);
    } else {
      changed = await user.removeProduct(productId);
    }

    res.json({
      success: true,
      message: `Product access ${enable ? 'added' : 'removed'} for ${maxyId}`,
      changed,
      products: user.products
    });
  } catch (error) {
    console.error('Error in /users/update:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;

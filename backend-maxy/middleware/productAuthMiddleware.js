// middleware/productAuthMiddleware.js
import axios from 'axios';

/**
 * Middleware to verify Maxy user for a specific product.
 * Usage: pass productId when using the middleware.
 */
export const verifyProductUser = (productId) => async (req, res, next) => {
  try {
    const { maxyId, password } = req.body;

    if (!maxyId || !password) {
      return res.status(400).json({
        success: false,
        message: 'MaxyID and password are required'
      });
    }

    // Call MaxyDB API to verify credentials
    const response = await axios.post(`${process.env.MAXYDB_URL}/api/product/auth/verify`, {
      maxyId,
      password,
      productId
    });

    if (response.data.success && response.data.verified) {
      // Attach user info to request for downstream routes
      req.user = response.data.user;
      req.hasAccess = response.data.hasAccess;
      return next();
    } else {
      return res.status(401).json({
        success: false,
        message: 'User verification failed'
      });
    }
  } catch (error) {
    console.error('Error in verifyProductUser middleware:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

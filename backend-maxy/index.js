import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import contactRoutes from './routes/contactRoutes.js';
import subscribeRoutes from './routes/subscribeRoutes.js';
import productRoutes from './routes/productRoutes.js'; // ✅ generalized for all products
import userRoutes from './routes/userRoutes.js'; // ✅ new user management routes
import authRoutes from './routes/authRoutes.js'; // ✅ new auth routes

// import {
//   registerUser,
//   loginUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
//   changePassword,
//   updateMaxyId,
//   acceptTerms,
//   getAccountDetails,
// } from './routes/userController.js';

// import { protect } from './middleware/authMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',                                         // local development
  'http://fn-alb-maxy-1454129065.ap-south-1.elb.amazonaws.com',    // AWS ALB
  'https://maxy.co.in'                                             // production
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
}));

// Middleware
app.use(express.json());

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/upload', (await import('./routes/uploadRoutes.js')).default);

// Product verification and access route (works for all Maxy products)
app.use('/api/product', productRoutes);

// ✅ Centralized user management routes
app.use('/api/users', userRoutes);

// // Auth routes (login, register, profile, etc.)
// app.post('/api/auth/register', registerUser);
// app.post('/api/auth/login', loginUser);
// app.post('/api/auth/logout', protect, logoutUser);
// app.get('/api/auth/profile', protect, getUserProfile);
// app.put('/api/auth/profile', protect, updateUserProfile);
// app.post('/api/auth/change-password', protect, changePassword);
// app.put('/api/auth/update-maxy-id', protect, updateMaxyId);
// app.post('/api/auth/accept-terms', protect, acceptTerms);
// app.get('/api/auth/account-details', protect, getAccountDetails);

// ✅ Centralized auth routes
app.use('/api/auth', authRoutes);

// Root
app.get('/', (req, res) => {
  res.send('🚀 Maxy Website Backend API - Contact Form & Product Verification Service');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// 500 handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 MaxyDB running on port ${PORT}`);
});
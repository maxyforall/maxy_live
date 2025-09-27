import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import contactRoutes from './routes/contactRoutes.js';
import subscribeRoutes from './routes/subscribeRoutes.js';
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
} from './routes/userController.js';
import { protect } from './middleware/authMiddleware.js';

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',                                         // for local development
  'http://fn-alb-maxy-1454129065.ap-south-1.elb.amazonaws.com',    // your AWS ALB URL
  'https://maxy.co.in'                                             // your final production domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
}));


// Set up static file serving for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/upload', (await import('./routes/uploadRoutes.js')).default);

// Auth routes
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);
app.post('/api/auth/logout', protect, logoutUser);
app.get('/api/auth/profile', protect, getUserProfile);
app.put('/api/auth/profile', protect, updateUserProfile);
app.get('/api/getallusers', getAllUsers); // renamed for consistency
app.delete('/api/auth/:id', protect, deleteUser);

// User management routes
app.post('/api/auth/change-password', protect, changePassword);
app.put('/api/auth/update-maxy-id', protect, updateMaxyId);
app.post('/api/auth/accept-terms', protect, acceptTerms);
app.get('/api/auth/account-details', protect, getAccountDetails);
app.post('/api/auth/deactivate-account', protect, deactivateAccount);

// Root
app.get('/', (req, res) => {
  res.send('Maxy Website Backend API - Contact Form Service');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

//500 handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});

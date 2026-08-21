import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';

import { env } from './config/env';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import apiRoutes from './routes/apiRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

// Connect to MongoDB
connectDB();

// CORS Middleware BEFORE all routes & helmet
app.use(
  cors({
    origin: true, // Dynamically allow requesting origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

// Pre-Flight OPTIONS handler for all endpoints
app.options('*', cors());

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Body Parsers & Cookie Parser BEFORE routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api', limiter);

// Static Files Uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Root Endpoint Test
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Mahakal Pandit Express API Server Live' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Mahakal Pandit Backend Server Running' });
});

// Error Handling Middleware
app.use(errorHandler);

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Mahakal Pandit Backend running on port ${PORT} in ${env.NODE_ENV} mode`);
});

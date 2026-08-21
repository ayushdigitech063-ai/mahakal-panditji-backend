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

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Strict Security CORS Configuration
const allowedOrigins = [
  'https://ujjain-mahakal.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

if (env.CLIENT_URL) {
  allowedOrigins.push(env.CLIENT_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman or server-to-server)
      if (!origin) return callback(null, true);

      // Check exact match or any Vercel preview domain
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app');

      if (isAllowed) {
        return callback(null, true);
      } else {
        return callback(new Error(`CORS Policy: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Explicit Pre-Flight Handlers for CORS
app.options('*', cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api', limiter);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static Files Uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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

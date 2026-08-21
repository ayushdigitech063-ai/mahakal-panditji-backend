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

// 1. HARDENED UNIVERSAL MANUAL CORS HEADERS MIDDLEWARE (RUNS BEFORE EVERYTHING)
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  // Instantly respond 200 OK to browser OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});

// 2. Additional standard CORS package fallback
app.use(cors());

// 3. Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 4. Body Parsers & Cookie Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 5. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api', limiter);

// 6. Static Files Uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 7. Root & Health Test Endpoints
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Mahakal Pandit Express API Server Live' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Mahakal Pandit Backend Server Running' });
});

// 8. API Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// 9. Error Handling Middleware
app.use(errorHandler);

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Mahakal Pandit Backend running on port ${PORT} in ${env.NODE_ENV} mode`);
});

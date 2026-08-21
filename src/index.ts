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

// 1. Clean & Official CORS Package Configuration (Must execute BEFORE all routes)
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
      // Allow requests with no origin (like mobile apps, server-to-server, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    optionsSuccessStatus: 200, // Preflight OPTIONS response 200 OK
  })
);

// 2. Explicit Preflight OPTIONS handler for all endpoints
app.options('*', cors());

// 3. Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 4. Body & Cookie Parsers
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

// 6. Static File Uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 7. Root & Health Endpoints
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

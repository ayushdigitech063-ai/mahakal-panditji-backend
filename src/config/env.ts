import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const env = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mahakalpandit',
  JWT_SECRET: process.env.JWT_SECRET || 'MahakalSuperSecretJWTKey2026!',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'https://ujjain-mahakal.vercel.app',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@mahakalpandit.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'MahakalAdmin2026!',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
};

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { env } from '../config/env';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'general';
    const folderParam = req.params.folder;
    if (typeof folderParam === 'string' && ['pandits', 'poojas', 'blogs', 'general'].includes(folderParam)) {
      folder = folderParam;
    }
    
    const targetDir = path.join(__dirname, '../../uploads', folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed.'));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: env.MAX_FILE_SIZE },
  fileFilter,
});

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { env } from '../config/env';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file: Express.Multer.File) => {
    let folder = 'mahakal_general';
    const folderParam = req.params.folder;
    if (typeof folderParam === 'string' && ['pandits', 'poojas', 'blogs', 'gallery', 'general'].includes(folderParam)) {
      folder = `mahakal_${folderParam}`;
    }

    const isPandit = folderParam === 'pandits';

    return {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'jfif'],
      transformation: isPandit
        ? [
            {
              width: 800,
              height: 1000,
              crop: 'fill',
              gravity: 'face', // Auto Face Detection Crop for Passport/Portrait Style
              quality: 'auto',
            },
          ]
        : [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
    };
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/jfif'];
  if (allowedTypes.includes(file.mimetype) || file.originalname.match(/\.(jpg|jpeg|png|webp|jfif)$/i)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, WEBP, and JFIF images are allowed.'));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: env.MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

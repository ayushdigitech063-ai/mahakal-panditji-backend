import { Request, Response } from 'express';

export const handleFileUpload = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }

  // Cloudinary returns the full HTTPS URL in req.file.path
  const fileUrl = (req.file as any).path || (req.file as any).secure_url || `/uploads/${req.params.folder || 'general'}/${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: 'File uploaded successfully to Cloudinary',
    data: {
      url: fileUrl, // Permanent HTTPS Cloudinary URL stored directly in Database
      fullUrl: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
};

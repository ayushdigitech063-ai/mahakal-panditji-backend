import { Request, Response } from 'express';

export const handleFileUpload = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }

  const folder = req.params.folder || 'general';
  
  // Return relative path so frontend and backend can construct full URL dynamically using protocol + host or SERVER_ORIGIN
  const relativeUrl = `/uploads/${folder}/${req.file.filename}`;

  // Full origin URL constructed dynamically from request host header
  const protocol = req.protocol === 'https' || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
  const fullUrl = `${protocol}://${req.get('host')}${relativeUrl}`;

  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    data: {
      url: relativeUrl, // Relative path for clean DB storing
      fullUrl: fullUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
};

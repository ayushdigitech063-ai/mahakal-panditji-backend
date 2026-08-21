import { Request, Response } from 'express';

export const handleFileUpload = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }

  const folder = req.params.folder || 'general';
  const imageUrl = `http://localhost:5000/uploads/${folder}/${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    data: {
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
};

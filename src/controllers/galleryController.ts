import { Request, Response } from 'express';
import { Gallery } from '../models/Gallery';

// Seed default gallery images if empty
const defaultGalleryItems = [
  { title: 'श्री महाकालेश्वर ज्योतिर्लिंग उज्जैन', image: '/images/general/earth_india.jpg', category: 'Mahakal Temple' },
  { title: 'महाकाल भस्म आरती दर्शन', image: '/images/pandits/pandit1.jpg', category: 'Bhasma Aarti' },
  { title: 'सिद्धवट घाट शिप्रा नदी आरती', image: '/images/pandits/pandit2.jpg', category: 'Shipra Aarti' },
  { title: 'मंगलनाथ मंदिर अंगारक पूजा', image: '/images/pandits/pandit3.jpg', category: 'Mangalnath' },
];

export const getPublicGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    let items = await Gallery.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    if (items.length === 0) {
      await Gallery.insertMany(defaultGalleryItems);
      items = await Gallery.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    }
    res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, message: 'Gallery item created', data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Gallery item deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

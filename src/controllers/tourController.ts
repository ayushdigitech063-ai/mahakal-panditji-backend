import { Request, Response } from 'express';
import { TourModel } from '../models/Tour';
import { slugify } from '../utils/slugify';

export const getPublicTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const tours = await TourModel.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tours.length, data: tours });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicTourBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const tour = await TourModel.findOne({ slug, isActive: true });
    if (!tour) {
      res.status(404).json({ success: false, message: 'Tour package not found' });
      return;
    }
    res.status(200).json({ success: true, data: tour });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const tours = await TourModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tours.length, data: tours });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, coverImage, description, startingPrice, duration, destination } = req.body;
    if (!name || !coverImage || !description) {
      res.status(400).json({ success: false, message: 'Name, cover image, and description are required' });
      return;
    }

    const slug = req.body.slug ? slugify(req.body.slug) : slugify(name);
    const existing = await TourModel.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: 'Tour with this name/slug already exists' });
      return;
    }

    const tour = await TourModel.create({
      ...req.body,
      slug,
      startingPrice: Number(startingPrice) || 4999,
      duration: duration || '2 Days / 1 Night',
      destination: destination || 'Ujjain',
    });

    res.status(201).json({ success: true, message: 'Tour package created successfully', data: tour });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (req.body.name && !req.body.slug) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await TourModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Tour package not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Tour package updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleTourStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tour = await TourModel.findById(id);
    if (!tour) {
      res.status(404).json({ success: false, message: 'Tour package not found' });
      return;
    }
    tour.isActive = !tour.isActive;
    await tour.save();
    res.status(200).json({ success: true, message: `Tour ${tour.isActive ? 'activated' : 'hidden'} successfully`, data: tour });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await TourModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Tour package deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import { Request, Response } from 'express';
import { HotelModel } from '../models/Hotel';
import { slugify } from '../utils/slugify';

export const getPublicHotels = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotels = await HotelModel.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: hotels.length, data: hotels });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicHotelBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const hotel = await HotelModel.findOne({ slug, isActive: true });
    if (!hotel) {
      res.status(404).json({ success: false, message: 'Hotel not found' });
      return;
    }
    res.status(200).json({ success: true, data: hotel });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminHotels = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotels = await HotelModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: hotels.length, data: hotels });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, coverImage, location, description, startingPrice, propertyType } = req.body;
    if (!name || !coverImage || !description) {
      res.status(400).json({ success: false, message: 'Name, cover image, and description are required' });
      return;
    }

    const slug = req.body.slug ? slugify(req.body.slug) : slugify(name);
    const existing = await HotelModel.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: 'Hotel with this name/slug already exists' });
      return;
    }

    const hotel = await HotelModel.create({
      ...req.body,
      slug,
      propertyType: propertyType || 'Hotel',
      startingPrice: Number(startingPrice) || 1499,
      location: location || 'Ujjain, Madhya Pradesh',
    });

    res.status(201).json({ success: true, message: 'Hotel created successfully', data: hotel });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (req.body.name && !req.body.slug) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await HotelModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Hotel not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Hotel updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleHotelStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const hotel = await HotelModel.findById(id);
    if (!hotel) {
      res.status(404).json({ success: false, message: 'Hotel not found' });
      return;
    }
    hotel.isActive = !hotel.isActive;
    await hotel.save();
    res.status(200).json({ success: true, message: `Hotel ${hotel.isActive ? 'activated' : 'hidden'} successfully`, data: hotel });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await HotelModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Hotel deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

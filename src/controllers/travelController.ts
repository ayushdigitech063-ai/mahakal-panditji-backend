import { Request, Response } from 'express';
import { TravelServiceModel } from '../models/TravelService';
import { slugify } from '../utils/slugify';

export const getPublicTravelServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await TravelServiceModel.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminTravelServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await TravelServiceModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTravelService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, image, vehicleType, capacity, startingPrice } = req.body;
    if (!name || !image) {
      res.status(400).json({ success: false, message: 'Vehicle name and image are required' });
      return;
    }

    const slug = req.body.slug ? slugify(req.body.slug) : slugify(name);
    const existing = await TravelServiceModel.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: 'Travel service with this vehicle name already exists' });
      return;
    }

    const travelService = await TravelServiceModel.create({
      ...req.body,
      slug,
      vehicleType: vehicleType || 'Sedan',
      capacity: Number(capacity) || 4,
      startingPrice: Number(startingPrice) || 1499,
    });

    res.status(201).json({ success: true, message: 'Travel cab service created successfully', data: travelService });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTravelService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (req.body.name && !req.body.slug) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await TravelServiceModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Travel cab service not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Travel cab service updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleTravelServiceStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await TravelServiceModel.findById(id);
    if (!service) {
      res.status(404).json({ success: false, message: 'Travel cab service not found' });
      return;
    }
    service.isActive = !service.isActive;
    await service.save();
    res.status(200).json({ success: true, message: `Travel service ${service.isActive ? 'activated' : 'hidden'} successfully`, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTravelService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await TravelServiceModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Travel cab service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

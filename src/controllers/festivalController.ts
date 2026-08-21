import { Request, Response } from 'express';
import { Festival } from '../models/Festival';

export const getPublicFestivals = async (req: Request, res: Response): Promise<void> => {
  try {
    const festivals = await Festival.find({ isVisible: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: festivals.length, data: festivals });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminFestivals = async (req: Request, res: Response): Promise<void> => {
  try {
    const festivals = await Festival.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: festivals.length, data: festivals });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFestival = async (req: Request, res: Response): Promise<void> => {
  try {
    const festival = await Festival.create(req.body);
    res.status(201).json({ success: true, message: 'Festival created successfully', data: festival });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFestival = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Festival.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Festival not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Festival updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFestival = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Festival.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Festival deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

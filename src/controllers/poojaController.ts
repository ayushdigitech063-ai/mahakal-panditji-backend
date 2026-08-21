import { Request, Response } from 'express';
import { Pooja } from '../models/Pooja';
import { poojaSchema } from '../utils/validators';
import { slugify } from '../utils/slugify';

export const getPublicPoojas = async (req: Request, res: Response): Promise<void> => {
  try {
    const poojas = await Pooja.find({ isActive: true, isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: poojas.length, data: poojas });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicPoojaBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const pooja = await Pooja.findOne({ slug, isActive: true, isDeleted: false });
    if (!pooja) {
      res.status(404).json({ success: false, message: 'Pooja not found' });
      return;
    }
    res.status(200).json({ success: true, data: pooja });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminPoojas = async (req: Request, res: Response): Promise<void> => {
  try {
    const poojas = await Pooja.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: poojas.length, data: poojas });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPooja = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = poojaSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parseResult.data;
    const slug = data.slug ? slugify(data.slug) : slugify(data.name);

    const existing = await Pooja.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: 'Pooja with this name/slug already exists' });
      return;
    }

    const pooja = await Pooja.create({ ...data, slug });
    res.status(201).json({ success: true, message: 'Pooja created successfully', data: pooja });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePooja = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (req.body.name && !req.body.slug) {
      req.body.slug = slugify(req.body.name);
    }
    const updatedPooja = await Pooja.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPooja) {
      res.status(404).json({ success: false, message: 'Pooja not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Pooja updated successfully', data: updatedPooja });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const togglePoojaStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const pooja = await Pooja.findById(id);
    if (!pooja) {
      res.status(404).json({ success: false, message: 'Pooja not found' });
      return;
    }
    pooja.isActive = !pooja.isActive;
    await pooja.save();
    res.status(200).json({ success: true, message: `Pooja ${pooja.isActive ? 'activated' : 'hidden'} successfully`, data: pooja });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePooja = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const pooja = await Pooja.findById(id);
    if (!pooja) {
      res.status(404).json({ success: false, message: 'Pooja not found' });
      return;
    }
    pooja.isDeleted = true;
    pooja.isActive = false;
    await pooja.save();
    res.status(200).json({ success: true, message: 'Pooja deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

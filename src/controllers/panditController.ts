import { Request, Response } from 'express';
import { Pandit } from '../models/Pandit';
import { panditSchema } from '../utils/validators';
import { slugify } from '../utils/slugify';

// Public API: get all active pandits
export const getPublicPandits = async (req: Request, res: Response): Promise<void> => {
  try {
    const pandits = await Pandit.find({ isActive: true, isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: pandits.length,
      data: pandits,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Public API: get pandit by slug
export const getPublicPanditBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const pandit = await Pandit.findOne({ slug, isActive: true, isDeleted: false });
    if (!pandit) {
      res.status(404).json({ success: false, message: 'Pandit Ji profile not found' });
      return;
    }
    res.status(200).json({ success: true, data: pandit });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin API: get all pandits (including hidden)
export const getAdminPandits = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, isVerified, isActive } = req.query;
    const query: any = { isDeleted: false };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { specializations: { $regex: search, $options: 'i' } },
      ];
    }
    if (isVerified !== undefined) query.isVerified = isVerified === 'true';
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const pandits = await Pandit.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: pandits.length,
      data: pandits,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin API: create pandit
export const createPandit = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = panditSchema.safeParse(req.body);
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

    // Check slug uniqueness
    const existing = await Pandit.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: 'A Pandit with this slug or name already exists' });
      return;
    }

    const pandit = await Pandit.create({
      ...data,
      slug,
    });

    res.status(201).json({
      success: true,
      message: 'Pandit created successfully',
      data: pandit,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin API: update pandit
export const updatePandit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const pandit = await Pandit.findById(id);
    if (!pandit) {
      res.status(404).json({ success: false, message: 'Pandit not found' });
      return;
    }

    if (req.body.name && !req.body.slug) {
      req.body.slug = slugify(req.body.name);
    }

    const updatedPandit = await Pandit.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Pandit updated successfully',
      data: updatedPandit,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin API: toggle active status
export const togglePanditStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const pandit = await Pandit.findById(id);
    if (!pandit) {
      res.status(404).json({ success: false, message: 'Pandit not found' });
      return;
    }

    pandit.isActive = !pandit.isActive;
    await pandit.save();

    res.status(200).json({
      success: true,
      message: `Pandit ${pandit.isActive ? 'activated/shown' : 'deactivated/hidden'} successfully`,
      data: pandit,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin API: soft delete pandit
export const deletePandit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const pandit = await Pandit.findById(id);
    if (!pandit) {
      res.status(404).json({ success: false, message: 'Pandit not found' });
      return;
    }

    pandit.isDeleted = true;
    pandit.isActive = false;
    await pandit.save();

    res.status(200).json({
      success: true,
      message: 'Pandit deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

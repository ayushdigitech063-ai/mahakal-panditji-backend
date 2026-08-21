import { Request, Response } from 'express';
import { HomepageSettings } from '../models/HomepageSettings';
import { SiteSettings } from '../models/SiteSettings';

export const getPublicHomepage = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await HomepageSettings.findOne();
    if (!settings) {
      settings = await HomepageSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHomepage = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await HomepageSettings.findOne();
    if (!settings) {
      settings = await HomepageSettings.create(req.body);
    } else {
      settings = await HomepageSettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, message: 'Homepage settings updated successfully', data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicSiteSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSiteSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, message: 'Site settings updated successfully', data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

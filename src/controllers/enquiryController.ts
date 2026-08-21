import { Request, Response } from 'express';
import { Enquiry } from '../models/Enquiry';
import { enquirySchema } from '../utils/validators';

export const submitEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = enquirySchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const enquiry = await Enquiry.create(parseResult.data);
    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received successfully. Pandit Ji team will call you shortly.',
      data: enquiry,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['new', 'contacted', 'resolved'].includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status' });
      return;
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!enquiry) {
      res.status(404).json({ success: false, message: 'Enquiry not found' });
      return;
    }
    res.status(200).json({ success: true, message: `Enquiry status updated to ${status}`, data: enquiry });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

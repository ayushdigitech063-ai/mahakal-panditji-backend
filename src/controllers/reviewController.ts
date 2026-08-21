import { Request, Response } from 'express';
import { Review } from '../models/Review';

export const getPublicReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ isApproved: true, isVisible: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReviewStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isApproved, isVisible } = req.body;
    const updateData: any = {};
    if (isApproved !== undefined) updateData.isApproved = isApproved;
    if (isVisible !== undefined) updateData.isVisible = isVisible;

    const review = await Review.findByIdAndUpdate(id, updateData, { new: true });
    if (!review) {
      res.status(404).json({ success: false, message: 'Review not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Review updated successfully', data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

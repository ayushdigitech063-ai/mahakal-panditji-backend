import { Request, Response } from 'express';
import { Pandit } from '../models/Pandit';
import { Pooja } from '../models/Pooja';
import { Blog } from '../models/Blog';
import { Review } from '../models/Review';
import { Enquiry } from '../models/Enquiry';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalPandits = await Pandit.countDocuments({ isDeleted: false });
    const activePandits = await Pandit.countDocuments({ isActive: true, isDeleted: false });
    const hiddenPandits = await Pandit.countDocuments({ isActive: false, isDeleted: false });

    const totalPoojas = await Pooja.countDocuments({ isDeleted: false });
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });

    const totalReviews = await Review.countDocuments();
    const pendingReviews = await Review.countDocuments({ isApproved: false });

    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'new' });

    // Enquiries chart data (past 7 days or mock curve based on DB dates)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const enquiriesData = await Enquiry.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const recentPandits = await Pandit.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(5);
    const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);
    const recentReviews = await Review.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalPandits,
        activePandits,
        hiddenPandits,
        totalPoojas,
        totalBlogs,
        publishedBlogs,
        totalReviews,
        pendingReviews,
        totalEnquiries,
        newEnquiries,
        enquiriesChart: enquiriesData,
        recentPandits,
        recentEnquiries,
        recentBlogs,
        recentReviews,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

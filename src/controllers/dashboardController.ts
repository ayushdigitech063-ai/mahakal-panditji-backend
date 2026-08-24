import { Request, Response } from 'express';
import { Pandit } from '../models/Pandit';
import { Pooja } from '../models/Pooja';
import { Blog } from '../models/Blog';
import { Review } from '../models/Review';
import { Enquiry } from '../models/Enquiry';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Run all count and query aggregations in parallel using Promise.all for maximum speed
    const [
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
      enquiriesData,
      recentPandits,
      recentEnquiries,
      recentBlogs,
      recentReviews,
    ] = await Promise.all([
      Pandit.countDocuments({ isDeleted: false }),
      Pandit.countDocuments({ isActive: true, isDeleted: false }),
      Pandit.countDocuments({ isActive: false, isDeleted: false }),
      Pooja.countDocuments({ isDeleted: false }),
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      Review.countDocuments(),
      Review.countDocuments({ isApproved: false }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Enquiry.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Pandit.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(5).lean(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
      Blog.find().sort({ createdAt: -1 }).limit(5).lean(),
      Review.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

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

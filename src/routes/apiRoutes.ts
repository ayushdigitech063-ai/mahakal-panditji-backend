import { Router } from 'express';
import {
  getPublicPandits,
  getPublicPanditBySlug,
  getAdminPandits,
  createPandit,
  updatePandit,
  togglePanditStatus,
  deletePandit,
} from '../controllers/panditController';
import {
  getPublicPoojas,
  getPublicPoojaBySlug,
  getAdminPoojas,
  createPooja,
  updatePooja,
  togglePoojaStatus,
  deletePooja,
} from '../controllers/poojaController';
import {
  getPublicBlogs,
  getPublicBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  toggleBlogStatus,
  deleteBlog,
} from '../controllers/blogController';
import {
  getPublicReviews,
  getAdminReviews,
  updateReviewStatus,
  deleteReview,
} from '../controllers/reviewController';
import {
  getPublicFestivals,
  getAdminFestivals,
  createFestival,
  updateFestival,
  deleteFestival,
} from '../controllers/festivalController';
import {
  submitEnquiry,
  getAdminEnquiries,
  updateEnquiryStatus,
} from '../controllers/enquiryController';
import {
  getPublicHomepage,
  updateHomepage,
  getPublicSiteSettings,
  updateSiteSettings,
} from '../controllers/cmsController';
import { getDashboardStats } from '../controllers/dashboardController';
import { handleFileUpload } from '../controllers/uploadController';
import {
  getPublicGallery,
  getAdminGallery,
  createGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController';
import { authenticateAdmin } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

// ================= PUBLIC ROUTES =================
router.get('/pandits', getPublicPandits);
router.get('/pandits/:slug', getPublicPanditBySlug);

router.get('/poojas', getPublicPoojas);
router.get('/poojas/:slug', getPublicPoojaBySlug);

router.get('/blogs', getPublicBlogs);
router.get('/blogs/:slug', getPublicBlogBySlug);

router.get('/reviews', getPublicReviews);
router.get('/festivals', getPublicFestivals);

router.get('/homepage', getPublicHomepage);
router.get('/settings', getPublicSiteSettings);
router.get('/gallery', getPublicGallery);

router.post('/enquiries', submitEnquiry);

// ================= PROTECTED ADMIN ROUTES =================
router.use(authenticateAdmin as any);

// Dashboard
router.get('/admin/dashboard', getDashboardStats);

// Uploads
router.post('/uploads/:folder', upload.single('image'), handleFileUpload);

// Pandits Admin
router.get('/admin/pandits', getAdminPandits);
router.post('/admin/pandits', createPandit);
router.put('/admin/pandits/:id', updatePandit);
router.patch('/admin/pandits/:id/status', togglePanditStatus);
router.delete('/admin/pandits/:id', deletePandit);

// Poojas Admin
router.get('/admin/poojas', getAdminPoojas);
router.post('/admin/poojas', createPooja);
router.put('/admin/poojas/:id', updatePooja);
router.patch('/admin/poojas/:id/status', togglePoojaStatus);
router.delete('/admin/poojas/:id', deletePooja);

// Blogs Admin
router.get('/admin/blogs', getAdminBlogs);
router.post('/admin/blogs', createBlog);
router.put('/admin/blogs/:id', updateBlog);
router.patch('/admin/blogs/:id/status', toggleBlogStatus);
router.delete('/admin/blogs/:id', deleteBlog);

// Reviews Admin
router.get('/admin/reviews', getAdminReviews);
router.patch('/admin/reviews/:id/status', updateReviewStatus);
router.delete('/admin/reviews/:id', deleteReview);

// Festivals Admin
router.get('/admin/festivals', getAdminFestivals);
router.post('/admin/festivals', createFestival);
router.put('/admin/festivals/:id', updateFestival);
router.delete('/admin/festivals/:id', deleteFestival);

// Enquiries Admin
router.get('/admin/enquiries', getAdminEnquiries);
router.patch('/admin/enquiries/:id/status', updateEnquiryStatus);

// CMS Homepage & Settings Admin
router.get('/admin/homepage', getPublicHomepage);
router.put('/admin/homepage', updateHomepage);

router.get('/admin/settings', getPublicSiteSettings);
router.put('/admin/settings', updateSiteSettings);

// Gallery Admin
router.get('/admin/gallery', getAdminGallery);
router.post('/admin/gallery', createGalleryItem);
router.delete('/admin/gallery/:id', deleteGalleryItem);

export default router;

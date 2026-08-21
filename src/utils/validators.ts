import { z } from 'zod';

export const phoneRegex = /^[6-9]\d{9}$/;

export const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(2, 'Service selection is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export const panditSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().optional(),
  image: z.string().min(1, 'Profile image is required'),
  experience: z.number().min(0, 'Experience must be a positive number'),
  location: z.string().min(2, 'Location is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  specializations: z.array(z.string()).min(1, 'At least one specialization is required'),
  tags: z.array(z.string()).optional(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  poojasCompleted: z.number().min(0).optional(),
  rating: z.number().min(1).max(5).optional(),
  reviewsCount: z.number().min(0).optional(),
  phone: z.string().regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
  email: z.string().email('Invalid email address'),
  whatsAppNumber: z.string().optional(),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters'),
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  isVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const poojaSchema = z.object({
  name: z.string().min(2, 'Pooja name is required'),
  slug: z.string().optional(),
  image: z.string().min(1, 'Image is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  benefits: z.array(z.string()),
  procedure: z.array(z.string()),
  duration: z.string().min(2, 'Duration is required'),
  samagri: z.array(z.string()),
  price: z.number().min(0, 'Price must be non-negative'),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const blogSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().optional(),
  featuredImage: z.string().min(1, 'Featured image is required'),
  category: z.string().min(2, 'Category is required'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(20, 'Content is required'),
  author: z.string().optional(),
  readTime: z.string().optional(),
  status: z.enum(['draft', 'published', 'hidden']).optional(),
});

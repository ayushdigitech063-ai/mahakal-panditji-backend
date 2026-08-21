import { Request, Response } from 'express';
import { Blog } from '../models/Blog';
import { blogSchema } from '../utils/validators';
import { slugify } from '../utils/slugify';

export const getPublicBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, status: 'published' });
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog article not found' });
      return;
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = blogSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parseResult.data;
    const slug = data.slug ? slugify(data.slug) : slugify(data.title);

    const existing = await Blog.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: 'Blog with this title/slug already exists' });
      return;
    }

    const blog = await Blog.create({ ...data, slug });
    res.status(201).json({ success: true, message: 'Blog created successfully', data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (req.body.title && !req.body.slug) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Blog updated successfully', data: updatedBlog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleBlogStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['draft', 'published', 'hidden'].includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid blog status' });
      return;
    }
    const blog = await Blog.findByIdAndUpdate(id, { status }, { new: true });
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }
    res.status(200).json({ success: true, message: `Blog status changed to ${status}`, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

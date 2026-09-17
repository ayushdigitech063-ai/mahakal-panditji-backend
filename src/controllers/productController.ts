import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { Pandit } from '../models/Pandit';
import { slugify } from '../utils/slugify';

export const getPublicProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { panditId, category } = req.query;
    const query: any = { isActive: true, isDeleted: false };
    if (panditId) {
      query.panditId = panditId;
    }
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).populate('panditId', 'name image slug phone whatsAppNumber').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug, isActive: true, isDeleted: false }).populate('panditId', 'name image slug phone whatsAppNumber');
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ isDeleted: false }).populate('panditId', 'name image slug').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, slug: customSlug, image, price, originalPrice, category, description, panditId, inStock, isActive } = req.body;

    if (!name || !image || price === undefined || !description) {
      res.status(400).json({ success: false, message: 'Name, image, price and description are required' });
      return;
    }

    const slug = customSlug ? slugify(customSlug) : slugify(name);
    const existing = await Product.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: 'Product with this name or slug already exists' });
      return;
    }

    let panditName = '';
    if (panditId) {
      const pandit = await Pandit.findById(panditId);
      if (pandit) {
        panditName = pandit.name;
      }
    }

    const product = await Product.create({
      name,
      slug,
      image,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category: category || 'Puja Samagri',
      description,
      panditId: panditId || null,
      panditName,
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, slug: customSlug, image, price, originalPrice, category, description, panditId, inStock, isActive } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (customSlug || name) updateData.slug = customSlug ? slugify(customSlug) : slugify(name);
    if (image) updateData.image = image;
    if (price !== undefined) updateData.price = Number(price);
    if (originalPrice !== undefined) updateData.originalPrice = originalPrice ? Number(originalPrice) : null;
    if (category) updateData.category = category;
    if (description) updateData.description = description;
    if (inStock !== undefined) updateData.inStock = Boolean(inStock);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    if (panditId !== undefined) {
      updateData.panditId = panditId || null;
      if (panditId) {
        const pandit = await Pandit.findById(panditId);
        updateData.panditName = pandit ? pandit.name : '';
      } else {
        updateData.panditName = '';
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleProductStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    product.isActive = !product.isActive;
    await product.save();
    res.status(200).json({ success: true, message: `Product ${product.isActive ? 'activated' : 'hidden'} successfully`, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    product.isDeleted = true;
    product.isActive = false;
    await product.save();
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

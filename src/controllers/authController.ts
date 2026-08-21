import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SuperAdmin } from '../models/SuperAdmin';
import { env } from '../config/env';
import { loginSchema } from '../utils/validators';
import { AuthRequest } from '../middleware/authMiddleware';

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { email, password } = parseResult.data;

    if (require('mongoose').connection.readyState !== 1) {
      res.status(503).json({
        success: false,
        message: 'MongoDB is not connected. Please start MongoDB service or check MONGODB_URI in backend/.env',
      });
      return;
    }

    let admin = await SuperAdmin.findOne({ email }).select('+password');
    let isMatch = false;

    if (admin) {
      isMatch = await bcrypt.compare(password, admin.password || '');
    }

    // Fallback for default admin credentials if database is empty or not seeded yet
    if (!admin && email === env.ADMIN_EMAIL && password === env.ADMIN_PASSWORD) {
      isMatch = true;
      const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
      admin = await SuperAdmin.create({
        name: 'Super Admin',
        email: env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'super_admin',
        isActive: true,
      });
    }

    if (!admin || !isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify email & password.',
      });
      return;
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const admin = await SuperAdmin.findById(req.user?.id);
    if (!admin) {
      res.status(404).json({ success: false, message: 'Admin not found' });
      return;
    }
    res.status(200).json({
      success: true,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutAdmin = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

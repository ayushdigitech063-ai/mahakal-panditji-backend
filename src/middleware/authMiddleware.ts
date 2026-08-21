import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { SuperAdmin } from '../models/SuperAdmin';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticateAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized. Missing token.',
      });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };
    
    if (decoded.role !== 'super_admin') {
      res.status(403).json({
        success: false,
        message: 'Forbidden. Access restricted to Super Admin.',
      });
      return;
    }

    const admin = await SuperAdmin.findById(decoded.id);
    if (!admin || !admin.isActive) {
      res.status(401).json({
        success: false,
        message: 'Not authorized. Account inactive or not found.',
      });
      return;
    }

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized. Invalid or expired token.',
    });
  }
};

import { Schema, model, Document } from 'mongoose';

export interface ISuperAdmin extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'super_admin';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const superAdminSchema = new Schema<ISuperAdmin>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['super_admin'], default: 'super_admin' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const SuperAdmin = model<ISuperAdmin>('SuperAdmin', superAdminSchema);

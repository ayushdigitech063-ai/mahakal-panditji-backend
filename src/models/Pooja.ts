import { Schema, model, Document } from 'mongoose';

export interface IPooja extends Document {
  name: string;
  slug: string;
  image: string;
  description: string;
  benefits: string[];
  procedure: string[];
  duration: string;
  samagri: string[];
  price: number;
  category: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const poojaSchema = new Schema<IPooja>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    benefits: [{ type: String }],
    procedure: [{ type: String }],
    duration: { type: String, required: true },
    samagri: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    category: { type: String, default: 'General' },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

poojaSchema.index({ isActive: 1, isDeleted: 1 });

export const Pooja = model<IPooja>('Pooja', poojaSchema);

import { Schema, model, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  image: string;
  category: string;
  description: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: { type: String, default: 'Mandir & Rituals', trim: true },
    description: { type: String, default: 'पवित्र उज्जैन धाम के दिव्य दर्शन एवं वैदिक अनुष्ठान।', trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Gallery = model<IGalleryItem>('Gallery', gallerySchema);

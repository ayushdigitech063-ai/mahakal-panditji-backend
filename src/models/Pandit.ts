import { Schema, model, Document } from 'mongoose';

export interface IPanditFaq {
  question: string;
  answer: string;
}

export interface IPandit extends Document {
  name: string;
  slug: string;
  image: string;
  experience: number;
  location: string;
  languages: string[];
  specializations: string[];
  tags: string[];
  faqs: IPanditFaq[];
  poojasCompleted: number;
  rating: number;
  reviewsCount: number;
  phone: string;
  email: string;
  whatsAppNumber: string;
  shortDescription: string;
  bio: string;
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const panditSchema = new Schema<IPandit>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, required: true },
    experience: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    languages: [{ type: String, required: true }],
    specializations: [{ type: String, required: true }],
    tags: [{ type: String, trim: true }],
    faqs: [
      {
        question: { type: String, required: true, trim: true },
        answer: { type: String, required: true, trim: true },
      },
    ],
    poojasCompleted: { type: Number, default: 100, min: 0 },
    rating: { type: Number, default: 5.0, min: 1, max: 5 },
    reviewsCount: { type: Number, default: 0, min: 0 },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    whatsAppNumber: { type: String, default: '919876543210', trim: true },
    shortDescription: { type: String, required: true, trim: true },
    bio: { type: String, required: true },
    isVerified: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

panditSchema.index({ isActive: 1, isDeleted: 1 });

export const Pandit = model<IPandit>('Pandit', panditSchema);

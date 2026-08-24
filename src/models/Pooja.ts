import { Schema, model, Document } from 'mongoose';

export interface IPoojaFaq {
  question: string;
  answer: string;
}

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
  faqs?: IPoojaFaq[];
  tags?: string[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PoojaFaqSchema = new Schema<IPoojaFaq>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

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
    faqs: [PoojaFaqSchema],
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

poojaSchema.index({ isActive: 1, isDeleted: 1 });

export const Pooja = model<IPooja>('Pooja', poojaSchema);

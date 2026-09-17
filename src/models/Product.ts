import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  panditId?: Types.ObjectId;
  panditName?: string;
  inStock: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    category: { type: String, default: 'Puja Samagri', trim: true },
    description: { type: String, required: true, trim: true },
    panditId: { type: Schema.Types.ObjectId, ref: 'Pandit', default: null },
    panditName: { type: String, default: '', trim: true },
    inStock: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ isActive: 1, isDeleted: 1 });
productSchema.index({ panditId: 1 });

export const Product = model<IProduct>('Product', productSchema);

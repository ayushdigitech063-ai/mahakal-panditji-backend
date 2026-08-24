import mongoose, { Schema, Document } from 'mongoose';

export interface ITravelService extends Document {
  name: string;
  slug: string;
  image: string;
  vehicleType: string;
  capacity: number;
  startingPrice: number;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TravelServiceSchema = new Schema<ITravelService>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, required: true },
    vehicleType: { type: String, required: true, default: 'Sedan' },
    capacity: { type: Number, required: true, default: 4 },
    startingPrice: { type: Number, required: true, default: 1499 },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TravelServiceModel =
  mongoose.models.TravelService || mongoose.model<ITravelService>('TravelService', TravelServiceSchema);

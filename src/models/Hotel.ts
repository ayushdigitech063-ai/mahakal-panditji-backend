import mongoose, { Schema, Document } from 'mongoose';

export interface IHotelRoom {
  id?: string;
  name: string;
  image?: string;
  pricePerNight: number;
  maxGuests: number;
  bedType: string;
  amenities: string[];
}

export interface IHotel extends Document {
  name: string;
  slug: string;
  propertyType: 'Hotel' | 'Dharmashala';
  coverImage: string;
  galleryImages: string[];
  location: string;
  description: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  amenities: string[];
  rooms: IHotelRoom[];
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IHotelRoom>({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  pricePerNight: { type: Number, required: true, default: 999 },
  maxGuests: { type: Number, required: true, default: 2 },
  bedType: { type: String, default: 'Double Bed' },
  amenities: [{ type: String }],
});

const HotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    propertyType: { type: String, enum: ['Hotel', 'Dharmashala'], default: 'Hotel' },
    coverImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    location: { type: String, required: true, default: 'Ujjain, Madhya Pradesh' },
    description: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 120 },
    startingPrice: { type: Number, required: true, default: 1499 },
    amenities: [{ type: String }],
    rooms: [RoomSchema],
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const HotelModel = mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', HotelSchema);

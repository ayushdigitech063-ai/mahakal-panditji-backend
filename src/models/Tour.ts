import mongoose, { Schema, Document } from 'mongoose';

export interface ITourItinerary {
  day: number;
  title: string;
  details: string;
}

export interface ITour extends Document {
  name: string;
  slug: string;
  coverImage: string;
  duration: string;
  destination: string;
  startingPrice: number;
  description: string;
  highlights: string[];
  placesCovered: string[];
  itinerary: ITourItinerary[];
  inclusions: string[];
  exclusions: string[];
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ItinerarySchema = new Schema<ITourItinerary>({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  details: { type: String, required: true },
});

const TourSchema = new Schema<ITour>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    coverImage: { type: String, required: true },
    duration: { type: String, required: true, default: '2 Days / 1 Night' },
    destination: { type: String, required: true, default: 'Ujjain' },
    startingPrice: { type: Number, required: true, default: 4999 },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    placesCovered: [{ type: String }],
    itinerary: [ItinerarySchema],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TourModel = mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema);

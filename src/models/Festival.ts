import { Schema, model, Document } from 'mongoose';

export interface IFestival extends Document {
  title: string;
  year: string;
  festivalName: string;
  dateText: string;
  poojaName: string;
  description: string;
  image: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const festivalSchema = new Schema<IFestival>(
  {
    title: { type: String, required: true, trim: true },
    year: { type: String, default: '2026' },
    festivalName: { type: String, required: true, trim: true },
    dateText: { type: String, required: true, trim: true },
    poojaName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

festivalSchema.index({ isVisible: 1 });

export const Festival = model<IFestival>('Festival', festivalSchema);

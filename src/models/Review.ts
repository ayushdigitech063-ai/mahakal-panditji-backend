import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  name: string;
  rating: number;
  comment: string;
  panditId?: Types.ObjectId;
  panditName?: string;
  isApproved: boolean;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    panditId: { type: Schema.Types.ObjectId, ref: 'Pandit' },
    panditName: { type: String, trim: true },
    isApproved: { type: Boolean, default: true },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

reviewSchema.index({ isApproved: 1, isVisible: 1 });

export const Review = model<IReview>('Review', reviewSchema);

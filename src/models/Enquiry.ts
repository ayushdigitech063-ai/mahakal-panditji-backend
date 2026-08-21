import { Schema, model, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    service: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
  },
  { timestamps: true }
);

enquirySchema.index({ status: 1 });

export const Enquiry = model<IEnquiry>('Enquiry', enquirySchema);

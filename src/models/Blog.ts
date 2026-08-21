import { Schema, model, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  featuredImage: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  status: 'draft' | 'published' | 'hidden';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    featuredImage: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Mahakal Pandit Editorial' },
    readTime: { type: String, default: '5 min read' },
    status: { type: String, enum: ['draft', 'published', 'hidden'], default: 'published' },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

blogSchema.index({ slug: 1 });
blogSchema.index({ status: 1 });

export const Blog = model<IBlog>('Blog', blogSchema);

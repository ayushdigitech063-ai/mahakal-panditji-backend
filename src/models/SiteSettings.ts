import { Schema, model, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  siteName: string;
  logo: string;
  favicon: string;
  phone: string;
  email: string;
  whatsApp: string;
  address: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  footerText: string;
  copyrightText: string;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteName: { type: String, default: 'Mahakal Pandit' },
    logo: { type: String, default: '/images/general/logo.png' },
    favicon: { type: String, default: '/favicon.ico' },
    phone: { type: String, default: '+91 98765 43210' },
    email: { type: String, default: 'contact@mahakalpandit.com' },
    whatsApp: { type: String, default: '+91 98765 43210' },
    address: { type: String, default: 'Mahakal Marg, Near Shri Mahakaleshwar Temple, Ujjain, Madhya Pradesh 456001' },
    socialMedia: {
      facebook: { type: String, default: 'https://facebook.com' },
      instagram: { type: String, default: 'https://instagram.com' },
      youtube: { type: String, default: 'https://youtube.com' },
      twitter: { type: String, default: 'https://twitter.com' },
    },
    footerText: { type: String, default: 'Connecting devotees with authentic Vedic Pandits in Ujjain for sacred rituals and spiritual peace.' },
    copyrightText: { type: String, default: '© 2026 Mahakal Pandit. All Rights Reserved.' },
    seoTitle: { type: String, default: 'Mahakal Pandit — Book Authentic Ujjain Pooja & Pandits Online' },
    seoDescription: { type: String, default: 'Book verified Pandits for Mahakal Rudrabhishek, Kaal Sarp Dosh Pooja, Mangal Dosh Nivaran, and Navgraha Shanti in Ujjain.' },
  },
  { timestamps: true }
);

export const SiteSettings = model<ISiteSettings>('SiteSettings', siteSettingsSchema);

import { Schema, model, Document } from 'mongoose';

export interface IStatItem {
  number: string;
  label: string;
  iconName: string;
  isVisible: boolean;
}

export interface IHomepageFaq {
  question: string;
  answer: string;
}

export interface IHomepageSettings extends Document {
  announcement: {
    text: string;
    ctaText: string;
    ctaLink: string;
    isVisible: boolean;
  };
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
    videoUrl: string;
    fallbackImageUrl: string;
    isVisible: boolean;
  };
  stats: IStatItem[];
  panditSection: {
    heading: string;
    description: string;
    countToShow: number;
    isVisible: boolean;
  };
  poojaSection: {
    heading: string;
    description: string;
    isVisible: boolean;
  };
  festivalSection: {
    heading: string;
    year: string;
    isVisible: boolean;
  };
  blogSection: {
    heading: string;
    countToShow: number;
    isVisible: boolean;
  };
  contactSection: {
    heading: string;
    description: string;
    isVisible: boolean;
  };
  homepageFaqs: IHomepageFaq[];
  homepageTags: string[];
  websiteShortDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const homepageSettingsSchema = new Schema<IHomepageSettings>(
  {
    announcement: {
      text: { type: String, default: '🔱 Special Mahakal Pooja Bookings Open — Connect With Experienced Pandit Ji' },
      ctaText: { type: String, default: 'Book Now' },
      ctaLink: { type: String, default: '/pooja' },
      isVisible: { type: Boolean, default: true },
    },
    hero: {
      eyebrow: { type: String, default: '🔱 Trusted Spiritual Guidance in Ujjain' },
      heading: { type: String, default: 'Connect With Experienced Pandit Ji For Sacred Pooja & Spiritual Services' },
      description: { type: String, default: 'Perform authentic Mahakal Rudrabhishek, Kaal Sarp Dosh Pooja, and Vedic Rituals with verified Pandits of Ujjain.' },
      primaryBtnText: { type: String, default: 'Find Pandit Ji' },
      primaryBtnLink: { type: String, default: '/pandits' },
      secondaryBtnText: { type: String, default: 'Explore Pooja' },
      secondaryBtnLink: { type: String, default: '/pooja' },
      videoUrl: { type: String, default: '/videos/hero.mp4' },
      fallbackImageUrl: { type: String, default: '/images/general/hero-bg.jpg' },
      isVisible: { type: Boolean, default: true },
    },
    stats: [
      {
        number: { type: String, default: '500+' },
        label: { type: String, default: 'Experienced Pandits' },
        iconName: { type: String, default: 'UserCheck' },
        isVisible: { type: Boolean, default: true },
      },
      {
        number: { type: String, default: '10K+' },
        label: { type: String, default: 'Pooja Performed' },
        iconName: { type: String, default: 'Flame' },
        isVisible: { type: Boolean, default: true },
      },
      {
        number: { type: String, default: '50+' },
        label: { type: String, default: 'Cities Served' },
        iconName: { type: String, default: 'MapPin' },
        isVisible: { type: Boolean, default: true },
      },
      {
        number: { type: String, default: '4.9/5' },
        label: { type: String, default: 'Customer Rating' },
        iconName: { type: String, default: 'Star' },
        isVisible: { type: Boolean, default: true },
      },
    ],
    panditSection: {
      heading: { type: String, default: 'Find Your Pandit Ji' },
      description: { type: String, default: 'Connect with verified & authentic Vedic Scholars from Ujjain for sacred rites.' },
      countToShow: { type: Number, default: 6 },
      isVisible: { type: Boolean, default: true },
    },
    poojaSection: {
      heading: { type: String, default: 'Mukhya Pooja Services' },
      description: { type: String, default: 'Sacred ceremonies performed strictly according to Vedic traditions.' },
      isVisible: { type: Boolean, default: true },
    },
    festivalSection: {
      heading: { type: String, default: 'Special Pooja & Seva For 2026' },
      year: { type: String, default: '2026' },
      isVisible: { type: Boolean, default: true },
    },
    blogSection: {
      heading: { type: String, default: 'Spiritual Knowledge & Guidance' },
      countToShow: { type: Number, default: 6 },
      isVisible: { type: Boolean, default: true },
    },
    contactSection: {
      heading: { type: String, default: 'Book Your Sacred Ritual Today' },
      description: { type: String, default: 'Have questions or need assistance? Fill out the form and our priest coordination team will reach out.' },
      isVisible: { type: Boolean, default: true },
    },
    homepageFaqs: [
      {
        question: { type: String, default: 'उज्जैन में महाकाल पूजा की अग्रिम बुकिंग कैसे करें?' },
        answer: { type: String, default: 'हमारी वेबसाइट के माध्यम से आप सीधे प्रमाणित पंडित जी से व्हाट्सएप या कॉल पर बात करके अपनी सुविधानुसार तिथि एवं समय पर संकल्पित पूजा बुक कर सकते हैं।' },
      },
      {
        question: { type: String, default: 'कालसर्प दोष और मंगल दोष पूजा का मुख्य स्थान कौन सा है?' },
        answer: { type: String, default: 'उज्जैन में कालसर्प दोष निवारण हेतु महाकालेश्वर मंदिर परिसर एवं सिद्धवट घाट तथा मंगल दोष निवारण हेतु प्रसिद्ध मंगलनाथ मंदिर मुख्य स्थान माने जाते हैं।' },
      },
      {
        question: { type: String, default: 'क्या ऑनलाइन वीडियो कॉल पर पूजा संपन्न हो सकती है?' },
        answer: { type: String, default: 'जी हाँ, जो भक्त उज्जैन नहीं आ सकते, उनके नाम एवं गोत्र का संकल्प लेकर पंडित जी द्वारा सीधे मंदिर परिसर या क्षिप्रा तट पर ऑनलाइन (लाइव वीडियो कॉल) पूजा संपन्न कराई जाती है।' },
      },
    ],
    homepageTags: [
      { type: String, default: 'उज्जैन महाकाल मंदिर' }
    ],
    websiteShortDescription: {
      type: String,
      default: 'महाकाल पंडित उज्जैन — पवित्र अवंतिका धाम में कालसर्प दोष, मंगल दोष, महाकाल रुद्राभिषेक एवं समस्त वैदिक पूजा अनुष्ठानों के लिए सीधे प्रामाणिक विद्वान पंडित जी से संपर्क करें।',
    },
  },
  { timestamps: true }
);

export const HomepageSettings = model<IHomepageSettings>('HomepageSettings', homepageSettingsSchema);

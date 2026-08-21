import mongoose from 'mongoose';
import { Pandit } from '../models/Pandit';
import { Pooja } from '../models/Pooja';
import { Blog } from '../models/Blog';
import { Review } from '../models/Review';
import { Festival } from '../models/Festival';
import { HomepageSettings } from '../models/HomepageSettings';
import { SiteSettings } from '../models/SiteSettings';
import { env } from '../config/env';

export const seedInitialData = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB for initial data seeding...');

    // 1. Seed Pandits
    const panditsCount = await Pandit.countDocuments();
    if (panditsCount === 0) {
      await Pandit.insertMany([
        {
          name: 'Pandit Rajesh Sharma',
          slug: 'pandit-rajesh-sharma',
          image: '/images/pandits/pandit1.jpg',
          experience: 18,
          location: 'Mahakal Temple Marg, Ujjain',
          languages: ['Hindi', 'Sanskrit', 'Gujarati'],
          specializations: ['Kaal Sarp Dosh Pooja', 'Mahakal Rudrabhishek', 'Mangal Shanti'],
          rating: 4.9,
          reviewsCount: 142,
          phone: '9876543210',
          email: 'rajesh.sharma@mahakalpandit.com',
          shortDescription: 'Gold Medalist Acharya from Kashi Vidyapeeth specializing in Mahakal Rudrabhishek & Kaal Sarp Dosh rituals.',
          bio: 'Pandit Rajesh Sharma has over 18 years of dedicated experience conducting sacred Havans, Mahakal Abhishek, and Vedic Anushthans in Ujjain. Educated in ancient Sanskrit scriptures at Sampurnanand Sanskrit University, Kashi.',
          isVerified: true,
          isActive: true,
        },
        {
          name: 'Acharya Suresh Shastri',
          slug: 'acharya-suresh-shastri',
          image: '/images/pandits/pandit2.jpg',
          experience: 22,
          location: 'Ram Ghat, Ujjain',
          languages: ['Hindi', 'Sanskrit', 'Marathi'],
          specializations: ['Mahamrityunjaya Jaap', 'Navgraha Shanti', 'Grah Pravesh'],
          rating: 5.0,
          reviewsCount: 198,
          phone: '9876543211',
          email: 'suresh.shastri@mahakalpandit.com',
          shortDescription: 'Senior Vedic Scholar specializing in Mahamrityunjaya Anushthan and complex Graha Dosh remedies.',
          bio: 'Acharya Suresh Shastri is a renowned authority on Vedic astrology and Tantrik Shanti Vidhi in Ujjain. He has assisted thousands of devotees globally in mitigating malefic planetary influences.',
          isVerified: true,
          isActive: true,
        },
        {
          name: 'Pandit Aniket Joshi',
          slug: 'pandit-aniket-joshi',
          image: '/images/pandits/pandit3.jpg',
          experience: 12,
          location: 'Harsiddhi Temple Road, Ujjain',
          languages: ['Hindi', 'English', 'Sanskrit'],
          specializations: ['Mangal Dosh Shanti', 'Chandi Path', 'Kaal Sarp Dosh'],
          rating: 4.8,
          reviewsCount: 89,
          phone: '9876543212',
          email: 'aniket.joshi@mahakalpandit.com',
          shortDescription: 'Fluent in English and Hindi, expert in Mangal Dosh Nivaran at Siddhavat, Ujjain.',
          bio: 'Pandit Aniket Joshi belongs to a traditional family of Ujjain priests. He combines traditional scriptural purity with clear guidance for modern devotees.',
          isVerified: true,
          isActive: true,
        },
        {
          name: 'Pandit Vikramaditya Dave',
          slug: 'pandit-vikramaditya-dave',
          image: '/images/pandits/pandit4.jpg',
          experience: 15,
          location: 'Mangalnath Marg, Ujjain',
          languages: ['Hindi', 'Sanskrit'],
          specializations: ['Mangal Dosh Nivaran', 'Pitru Dosh Shanti', 'Satyanarayan Katha'],
          rating: 4.9,
          reviewsCount: 115,
          phone: '9876543213',
          email: 'vikram.dave@mahakalpandit.com',
          shortDescription: 'Specialist in Mangalnath Mandir rituals & Pitru Dosh Shanti at Kshipra river banks.',
          bio: 'Deeply knowledgeable in Karma Kanda rituals. Certified priest with decades of experience at Mangalnath Temple.',
          isVerified: true,
          isActive: true,
        },
      ]);
      console.log('✅ Pandits seeded');
    }

    // 2. Seed Poojas
    const poojasCount = await Pooja.countDocuments();
    if (poojasCount === 0) {
      await Pooja.insertMany([
        {
          name: 'Mahakal Rudrabhishek Pooja',
          slug: 'mahakal-rudrabhishek-pooja',
          image: '/images/poojas/rudrabhishek.jpg',
          description: 'Sacred bathing and chanting ritual of Lord Shiva with milk, honey, sugarcane juice, and Panchamrit to invoke health, prosperity, and protection.',
          benefits: ['Removes negative energies', 'Ensures physical health & longevity', 'Invokes blessings of Lord Mahakal'],
          procedure: ['Sankalp & Ganpati Pujan', 'Abhishek with 11 sacred dravyans', 'Chanting of Laghu Rudra Mantras', 'Aarti & Prasad Distribution'],
          duration: '2.5 Hours',
          samagri: ['Panchamrit', 'Belpatra (108)', 'Bhasma', 'Gangajal', 'Dhatura'],
          price: 3100,
          category: 'Rudrabhishek',
          isActive: true,
        },
        {
          name: 'Kaal Sarp Dosh Pooja',
          slug: 'kaal-sarp-dosh-pooja',
          image: '/images/poojas/kaalsarp.jpg',
          description: 'Special Rahu-Ketu shanti ritual performed at Ujjain Kshipra Sangam to alleviate obstacles in career, marriage, and personal peace.',
          benefits: ['Clears career hurdles & financial blockages', 'Restores marital harmony', 'Relieves mental anxiety and bad dreams'],
          procedure: ['Rahu-Ketu Jaap', 'Naag-Naagin Pair Pujan', 'Havan and Tarpan at Kshipra River'],
          duration: '3.5 Hours',
          samagri: ['Silver Naag Pair', 'Black Sesame', 'Kush Grass', 'Navgraha Wood'],
          price: 4500,
          category: 'Dosh Nivaran',
          isActive: true,
        },
        {
          name: 'Mangal Dosh Shanti Pooja',
          slug: 'mangal-dosh-shanti-pooja',
          image: '/images/poojas/mangaldosh.jpg',
          description: 'Performed at the holy birth land of Mars (Mangalnath Temple, Ujjain) to eliminate delay or obstacles in marriage.',
          benefits: ['Accelerates marriage prospects', 'Neutralizes aggressive planetary influences', 'Harmonizes relationship compatibility'],
          procedure: ['Bhat Pujan (Rice Offering)', 'Red Flower Abhishek', 'Mangal Graha Stotra Jaap'],
          duration: '2 Hours',
          samagri: ['Boiled Rice', 'Red Cloth', 'Kumkum', 'Coral Symbol'],
          price: 3500,
          category: 'Dosh Nivaran',
          isActive: true,
        },
        {
          name: 'Maha Mrityunjaya Jaap & Havan',
          slug: 'maha-mrityunjaya-jaap-havan',
          image: '/images/poojas/mahamrityunjaya.jpg',
          description: 'Potent Vedic chanting (11,000 to 1,25,000 counts) for critical illness recovery, long life, and spiritual shield.',
          benefits: ['Grants health protection', 'Destroys fear of untimely mishaps', 'Imparts deep mental serenity'],
          procedure: [' संकल्प & Viniyoga', 'Continuous Chanting by 5 Pandits', 'Sacred Ahuti Havan'],
          duration: '5 Hours',
          samagri: ['Durva', 'Pure Desi Ghee', 'Special Ayurvedic Herbs', 'Kamalgatta'],
          price: 11000,
          category: 'Anushthan',
          isActive: true,
        },
      ]);
      console.log('✅ Poojas seeded');
    }

    // 3. Seed Blogs
    const blogsCount = await Blog.countDocuments();
    if (blogsCount === 0) {
      await Blog.insertMany([
        {
          title: 'What Is Mahakal Rudrabhishek & Why Is Ujjain The Sacred Center?',
          slug: 'what-is-mahakal-rudrabhishek-ujjain-guide',
          featuredImage: '/images/blogs/blog1.jpg',
          category: 'Vedic Knowledge',
          excerpt: 'Discover the profound spiritual significance of performing Rudrabhishek in the holy city of Ujjain, abode of Lord Mahakaleshwar.',
          content: '<p>Ujjain is recognized as the eternal center of time (Mahakal). Performing Rudrabhishek here invokes cosmic healing and washes away karma accumulation across lifetimes...</p>',
          author: 'Acharya Suresh Shastri',
          readTime: '6 min read',
          status: 'published',
        },
        {
          title: 'Complete Guide To Kaal Sarp Dosh: Symptoms, Types & Remedies',
          slug: 'complete-guide-to-kaal-sarp-dosh-remedies',
          featuredImage: '/images/blogs/blog2.jpg',
          category: 'Astrology & Dosh',
          excerpt: 'Learn how Rahu and Ketu placement causes Kaal Sarp Dosh and why Kshipra Sangam Pujan provides ultimate liberation.',
          content: '<p>When all seven classical planets are trapped between Rahu and Ketu, Kaal Sarp Dosh is formed. Symptoms include sudden career setbacks, fear of snakes, and chronic anxiety...</p>',
          author: 'Pandit Rajesh Sharma',
          readTime: '8 min read',
          status: 'published',
        },
      ]);
      console.log('✅ Blogs seeded');
    }

    // 4. Seed Reviews
    const reviewsCount = await Review.countDocuments();
    if (reviewsCount === 0) {
      await Review.insertMany([
        {
          name: 'Rameshwar Vyas (Mumbai)',
          rating: 5,
          comment: 'Performed Kaal Sarp Dosh Pooja with Pandit Rajesh Sharma Ji in Ujjain. The devotion and detailed explanations were truly peaceful. Highly recommended!',
          isApproved: true,
          isVisible: true,
        },
        {
          name: 'Priya Agarwal (Delhi)',
          rating: 5,
          comment: 'Booked Mahakal Rudrabhishek online for my father’s health. The video confirmation and samagri purity were exceptional.',
          isApproved: true,
          isVisible: true,
        },
      ]);
      console.log('✅ Reviews seeded');
    }

    // 5. Seed Festivals
    const festivalCount = await Festival.countDocuments();
    if (festivalCount === 0) {
      await Festival.insertMany([
        {
          title: 'Maha Shivratri Mahotsav 2026',
          year: '2026',
          festivalName: 'Maha Shivratri',
          dateText: 'February 15, 2026',
          poojaName: 'Char Prahar Mahakal Abhishek',
          description: 'Special night-long abhishek and Bhasma Aarti booking during Maha Shivratri festival in Ujjain.',
          image: '/images/general/festival1.jpg',
          isVisible: true,
        },
        {
          title: 'Shravan Maas Divine Seva 2026',
          year: '2026',
          festivalName: 'Shravan Month',
          dateText: 'July 15 - August 15, 2026',
          poojaName: 'Daily Bilvarchana & Rudrabhishek',
          description: 'Book month-long daily bilva patra arcana for divine blessings of Mahakal during holy Shravan.',
          image: '/images/general/festival2.jpg',
          isVisible: true,
        },
      ]);
      console.log('✅ Festivals seeded');
    }

    // 6. Seed Homepage & Site Settings
    const homepageExists = await HomepageSettings.findOne();
    if (!homepageExists) {
      await HomepageSettings.create({});
      console.log('✅ Homepage settings initialized');
    }

    const settingsExists = await SiteSettings.findOne();
    if (!settingsExists) {
      await SiteSettings.create({});
      console.log('✅ Site settings initialized');
    }

    console.log('🎉 Initial data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedInitialData();
}

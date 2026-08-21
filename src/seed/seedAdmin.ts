import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { SuperAdmin } from '../models/SuperAdmin';
import { env } from '../config/env';

export const seedSuperAdmin = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB for admin seeding...');

    const existingAdmin = await SuperAdmin.findOne({ email: env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log(`Super Admin (${env.ADMIN_EMAIL}) already exists. Skipping.`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
    await SuperAdmin.create({
      name: 'Super Admin',
      email: env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'super_admin',
      isActive: true,
    });

    console.log(`✅ Super Admin created successfully!`);
    console.log(`Email: ${env.ADMIN_EMAIL}`);
    console.log(`Password: [CONFIGURED IN ENV]`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Super Admin:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedSuperAdmin();
}

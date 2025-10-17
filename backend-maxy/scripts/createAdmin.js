import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/UserModel.js'; // make sure this path is correct

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/maxy';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = 'admin@maxy.co.in'; // change to your admin email
    const maxyId = 'admin01_maxy'; // admin maxyId
    const password = 'Cnubunny@04'; // change to a strong password

    // Check if admin already exists
    const existingAdmin = await User.findOne({ emailId: email });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      firstName: 'Manideep',
      lastName: 'Nera',
      emailId: email.toLowerCase(),
      maxy_id: maxyId,
      password: hashedPassword,
      isAdmin: true,
      gender: 'male',                // ✅ required
      dateOfBirth: '15/10/2004', // ✅ required
      account_status: 'active',
      profile_completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('✅ Admin created successfully!');
    console.log('Email:', email);
    console.log('Maxy ID:', maxyId);
    console.log('Password:', password);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();

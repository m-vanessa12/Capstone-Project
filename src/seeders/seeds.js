// Import necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define an array of default users including one admin
const defaultUsers = [
  // Other mentee users
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'user@admin.com',
    password: 'admin@123',
    role: 'Admin', 
  },
  
];

// Function to seed users
const seedUsers = async () => {
  try {
    for (const user of defaultUsers) {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        console.log(`User with email ${user.email} already exists. Skipping...`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        role: user.role || 'Mentee', // Use 'Mentee' as the default role if not specified
      });

      await newUser.save();
      console.log(`User with email ${user.email} added successfully.`);
    }

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();

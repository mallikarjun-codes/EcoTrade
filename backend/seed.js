require('dotenv').config();
console.log("DEBUG: Loading URI...", process.env.MONGO_URI); // Debug line

const mongoose = require('mongoose');
const Project = require('./models/Project');
const seedData = require('./data/seedProjects.json');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔌 MongoDB Connected for Seeding'))
  .catch(err => {
    console.error('❌ Connection Failed:', err.message);
    // If SSL error persists, it's usually IP blocking
  });

const seedDB = async () => {
  try {
    // 1. Clear existing data
    await Project.deleteMany({});
    console.log('🧹 Old data cleared.');

    // 2. Insert new data
    await Project.insertMany(seedData);
    console.log('🌱 Seed Data Injected Successfully!');

    // 3. Disconnect
    mongoose.connection.close();
    console.log('🔌 Disconnected.');
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    mongoose.connection.close();
  }
};

seedDB();
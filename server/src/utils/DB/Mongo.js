// database.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  console.log('Connecting to MongoDB...');
  try {

    const connectionString = process.env.DB_CONNECTION_STRING;

    const options = {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
    };

    await mongoose.connect(connectionString, options);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
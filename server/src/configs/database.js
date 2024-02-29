// database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use your MongoDB connection string
    const connectionString = 'mongodb://localhost:27017/firstdb';
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  console.log('Connecting to MongoDB...');
  try {
    const connectionString = process.env.DB_CONNECTION_STRING as string;

    const options: mongoose.ConnectOptions = {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
    };

    await mongoose.connect(connectionString, options);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;

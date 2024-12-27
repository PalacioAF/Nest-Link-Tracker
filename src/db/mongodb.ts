import mongoose from 'mongoose';

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.DB_MONGO);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
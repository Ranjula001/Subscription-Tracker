import { mongoose } from 'mongoose';
import { DB_URI } from '../config/config.js';

if (!DB_URI) {
    throw new Error('please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Successfully connected to the database in ${process.env.NODE_ENV} environment`);
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

export default connectDB;
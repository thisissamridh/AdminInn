import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectToDB = async () => {
    try {


        // Your MongoDB URI should be stored in environment variables for security reasons
        const database = 'HotelSuite';
        const dbUri = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/${database}` : null;
        if (!dbUri) {
            console.error('MONGODB_URI environment variable is not set.');
            return;
        }
        await mongoose.connect(dbUri);
        console.log('Connected successfully to MongoDB server with Mongoose');
    } catch (err) {
        console.error('Could not connect to MongoDB', err);
    }
};

export default connectToDB

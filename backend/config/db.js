// backend/config/db.js

require('dotenv').config(); // Ensure this is at the top of the file

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Log the MONGO_URI to verify it's being loaded
    console.log('MONGO_URI:', process.env.MONGO_URI);

    // Connect to MongoDB without deprecated options
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

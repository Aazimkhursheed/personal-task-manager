const mongoose = require('mongoose');
const dns = require('dns');

// Set DNS servers to resolve MongoDB Atlas SRV records
dns.setServers(['1.1.1.1']);

// Function to connect to MongoDB using connection string from .env
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

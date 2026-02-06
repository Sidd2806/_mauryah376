import 'dotenv/config';  // Load environment variables FIRST
import express from "express";
import { testConnection } from './config/database.js';
import { connectRedis } from './config/redis.js';

const app = express();
app.use(express.json());  // Parse incoming JSON requests

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 3000;

// Async function to initialize everything
const startServer = async () => {
  try {
    await testConnection();  // Test MySQL connection
    await connectRedis();    // Connect to Redis
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);  // Exit if connections fail
  }
};

startServer();
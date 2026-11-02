const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route (No CRUD implemented yet)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Task Manager Backend is running successfully'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

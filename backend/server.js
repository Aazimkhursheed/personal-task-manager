const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// 1. Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Standard Middleware
app.use(cors());
app.use(express.json());

// 3. Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Task Manager API is running smoothly',
  });
});

// 4. API Routes (mounted at /tasks and /api/tasks for convenience)
app.use('/tasks', taskRoutes);
app.use('/api/tasks', taskRoutes);

// 5. Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// 6. Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

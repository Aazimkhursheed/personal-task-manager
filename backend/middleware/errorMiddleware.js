// Middleware to handle requests to non-existent routes
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  // Default to 500 if response status code is currently 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';

  // Handle invalid MongoDB ObjectId
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid task ID format';
  }

  // Handle Mongoose schema validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const validationErrors = Object.values(err.errors).map((item) => item.message);
    message = validationErrors.join(', ');
  }

  // Never return raw stack traces to clients
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};

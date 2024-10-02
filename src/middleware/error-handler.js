// Error-handling middleware
const errorHandler = (err, req, res, nex) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred',

    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;

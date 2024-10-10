import jwt from 'jsonwebtoken';
// Import  logging library for production
import winston from 'winston';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Middleware to verify token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
        }
        winston.error('Invalid token', { err });
        return res.status(403).json({ message: 'Invalid token' });
      }

      // Attach the user object to the request for further use in protected routes
      req.user = user;
      next(); // Continue to the protected route
    });
  } else {
    winston.warn('Authorization header missing');
    return res.status(401).json({ message: 'Authorization header missing' });
  }
};

export default authenticateJWT;

import jwt from 'jsonwebtoken';

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
        console.error('Invalid token', { err });
        return res.status(403).json({ message: 'Invalid token' });
      }

      // User object for further use in protected routes
      req.user = user;
      next(); // Continue to the protected route
    });
  } else {
    console.warn('Authorization header missing');
    return res.status(401).json({ message: 'Authorization header missing' });
  }
};

export default authenticateJWT;

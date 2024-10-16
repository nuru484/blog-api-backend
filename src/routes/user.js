import { Router } from 'express';
const userRoute = Router();
import authLimiter from '../middleware/rateLimit.js';
import authenticateJWT from '../authentication/jwtAuthentication.js';
import userData from '../controllers/userController.js';

/**
 * Route to get user data from token.
 */
userRoute.post('/user-token', authenticateJWT, authLimiter, userData);

export default userRoute;

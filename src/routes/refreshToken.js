import { Router } from 'express';
const refreshTokenRoute = Router();
import authLimiter from '../middleware/rateLimit.js';

import refreshToken from '../authentication/refreshToken.js';

/**
 * Route for refresh token generation.
 */
refreshTokenRoute.post('/login', authLimiter, refreshToken);

export default refreshTokenRoute;

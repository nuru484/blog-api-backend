import { Router } from 'express';
const loginRoute = Router();
import authLimiter from '../middleware/rateLimit.js';

import login from '../controllers/loginController.js';

/**
 * Route for user login.
 */
loginRoute.post('/login', authLimiter, login);

export default loginRoute;

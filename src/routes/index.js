import { Router } from 'express';

import signupRoute from './signup.js';
import loginRoute from './login.js';
import adminDashboardRoute from './admin.js';
import refreshTokenRoute from './refreshToken.js';
import postRoute from './post.js';

/**
 * Express router for defining API routes.
 *
 * @type {Express.Router}
 */
const routes = Router();

/**
 * Route for user registration (signup).
 */
routes.use('/api/v1', signupRoute);

/**
 * Route for user login.
 */
routes.use('/api/v1', loginRoute);

/**
 * Route for admin dashboard.
 */
routes.use('/api/v1', adminDashboardRoute);

/**
 * Route for refresh token.
 */
routes.use('/api/v1', refreshTokenRoute);

/**
 * Route for creating a post.
 */
routes.use('/api/v1', postRoute);

export default routes;

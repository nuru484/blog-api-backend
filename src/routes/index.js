import { Router } from 'express';

import signupRoute from './signup.js';
import loginRoute from './login.js';
import adminDashboardRoute from './adminDashboard.js';
import refreshTokenRoute from './refreshToken.js';

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

export default routes;

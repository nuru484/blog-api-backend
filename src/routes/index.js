import { Router } from 'express';

import signupRoute from './signup.js';
import loginRoute from './login.js';

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

export default routes;

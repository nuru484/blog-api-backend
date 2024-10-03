import { Router } from 'express';

import signupRoute from './signup';

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

export default routes;

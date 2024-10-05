import e, { Router } from 'express';
const loginRoute = Router();

import login from '../controllers/loginController.js';

/**
 * Route for user login.
 */
loginRoute.post('/login', login);

export default loginRoute;

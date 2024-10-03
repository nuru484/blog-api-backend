import e, { Router } from 'express';
const signupRoute = Router();

import signUp from '../controllers/signupController';

/**
 * Route for user signup.
 */
signupRoute.post('/signup', signUp);

export default signupRoute;

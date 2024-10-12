import { Router } from 'express';
const viewsRoute = Router();

import viewPost from '../controllers/viewsController.js';

/**
 * Route for updating views.
 */
viewsRoute.post('/view', login);

export default viewsRoute;

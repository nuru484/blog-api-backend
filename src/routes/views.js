import { Router } from 'express';
const viewsRoute = Router();

import authLimiter from '../middleware/rateLimit.js';
import viewPost from '../controllers/viewsController.js';
/**
 * Route for updating views.
 */
viewsRoute.post('/view/:postId/', authLimiter, viewPost);
export default viewsRoute;

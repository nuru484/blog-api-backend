import { Router } from 'express';
const tagRoute = Router();
import authLimiter from '../middleware/rateLimit.js';

import * as tagsController from '../controllers/tagsController.js';

/**
 * Route for creating tags.
 */
tagRoute.post('/tag', authLimiter, tagsController.createTag);

/**
 * Route for updating tags.
 */
tagRoute.put('/tag/:id', authLimiter, tagsController.updateTag);

/**
 * Route for getting all tags.
 */
tagRoute.get('/tags', tagsController.getTags);

export default tagRoute;

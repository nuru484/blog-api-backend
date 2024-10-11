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

/**
 * Route for deleting a tags.
 */
tagRoute.delete('/tags/:id', tagsController.deleteTag);

/**
 * Route for deleting all tags.
 */
tagRoute.delete('/tags', tagsController.deleteAllTags);

export default tagRoute;

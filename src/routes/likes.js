import { Router } from 'express';
const likesRoute = Router();

import authLimiter from '../middleware/rateLimit.js';
import * as likesController from '../controllers/likesController.js';

/**
 * Route for liking a post.
 */
likesRoute.post(
  '/like/:postId/:userId?',
  authLimiter,
  likesController.likePost
);

/**
 * Route for liking a post.
 */
likesRoute.delete(
  '/like/:postId/:userId?',
  authLimiter,
  likesController.unLikePost
);

export default likesRoute;

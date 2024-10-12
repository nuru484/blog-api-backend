import { Router } from 'express';
const commentsRoute = Router();

import authLimiter from '../middleware/rateLimit.js';
import authenticateJWT from '../authentication/jwtAuthentication.js';
import * as postController from '../controllers/commentsController.js';

/**
 * Route for creating a comment.
 */
commentsRoute.post(
  '/comment/posts/:postId',
  authenticateJWT,
  authLimiter,
  postController.createComment
);

export default commentsRoute;

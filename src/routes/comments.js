import { Router } from 'express';
const commentsRoute = Router();

import authLimiter from '../middleware/rateLimit.js';
import * as commentsController from '../controllers/commentsController.js';

/**
 * Route for creating a comment.
 */
commentsRoute.post(
  '/comment/posts/:postId/:userId?',
  authLimiter,
  commentsController.createComment
);

/**
 * Route for updating a comment.
 */
commentsRoute.put(
  '/comment/posts/:postId/:commentId',
  authLimiter,
  commentsController.updateComment
);

/**
 * Route for deleting a comment.
 */
commentsRoute.delete(
  '/comment/posts/:postId/:commentId',
  authLimiter, // Rate limiting middleware
  commentsController.deleteComment
);

export default commentsRoute;

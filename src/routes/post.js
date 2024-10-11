import { Router } from 'express';
const postRoute = Router();
import authLimiter from '../middleware/rateLimit.js';

import * as postController from '../controllers/postController.js';
import authenticateJWT from '../authentication/jwtAuthentication.js';

/**
 * Route for creating a post.
 * POST /posts
 */
postRoute.post(
  '/posts',
  authLimiter,
  authenticateJWT,
  postController.createPost
);

/**
 * Route for publishing a post.
 * PATCH /posts/:id/publish
 */
postRoute.patch(
  '/posts/:id/publish',
  authLimiter,
  authenticateJWT,
  postController.publishPost
);

/**
 * Route for updating a post (partially).
 * PATCH /posts/:id
 */
postRoute.patch(
  '/posts/:id',
  authLimiter,
  authenticateJWT,
  postController.updatePost
);

/**
 * Route for deleting a post .
 * PATCH /posts/:id
 */
postRoute.delete(
  '/posts/:id',
  authLimiter,
  authenticateJWT,
  postController.deletePost
);

export default postRoute;

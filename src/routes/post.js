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

/**
 * Route for fetching unpublish posts of a user.
 * GET /posts/:id
 */
postRoute.get(
  '/posts/:id',
  authLimiter,
  authenticateJWT,
  postController.getUnpublishPosts
);

/**
 * Route for fetching all unpublish posts.
 * GET /posts
 */
postRoute.get(
  '/posts',
  authLimiter,
  authenticateJWT,
  postController.getUnpublishPosts
);
export default postRoute;

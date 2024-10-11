import { Router } from 'express';
const postRoute = Router();

import authLimiter from '../middleware/rateLimit.js';
import * as postController from '../controllers/postController.js';
import authenticateJWT from '../authentication/jwtAuthentication.js';
import authorizeRole from '../middleware/authorizeRole.js';

/**
 * Route for creating a post.
 * POST /posts
 */
postRoute.post(
  '/post',
  authenticateJWT,
  authLimiter,
  postController.createPost
);

/**
 * Route for publishing a post.
 * PATCH /posts/:id/publish
 */
postRoute.patch(
  '/posts/:id/publish',
  authenticateJWT,
  authLimiter,
  postController.publishPost
);

/**
 * Route for updating a post (partially).
 * PATCH /posts/:id
 */
postRoute.patch(
  '/posts/:id',
  authenticateJWT,
  authLimiter,
  postController.updatePost
);

/**
 * Route for deleting a post .
 * PATCH /posts/:id
 */
postRoute.delete(
  '/posts/:id',
  authenticateJWT,
  authLimiter,
  postController.deletePost
);

/**
 * Route for fetching unpublish posts of a user.
 * GET /posts/:id/unpublished
 */
postRoute.get(
  '/posts/:id/unpublished',
  authenticateJWT,
  authLimiter,
  postController.getUnpublishPosts
);

/**
 * Route for fetching all unpublish posts.
 * GET /posts/unpublished
 */
postRoute.get(
  '/posts/unpublished',
  authenticateJWT,
  authorizeRole(['ADMIN']),
  authLimiter,
  postController.getUnpublishPosts
);

/**
 * Route for fetching publish posts of a user.
 * GET /posts/:id/published
 */
postRoute.get(
  '/posts/:id/published',
  authenticateJWT,
  authLimiter,
  postController.getPublishPosts
);

/**
 * Route for fetching all publish posts.
 * GET /posts/published
 */
postRoute.get(
  '/posts/published',
  authenticateJWT,
  authorizeRole(['ADMIN']),
  authLimiter,
  postController.getPublishPosts
);

export default postRoute;

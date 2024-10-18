import { Router } from 'express';
const postRoute = Router();

import authLimiter from '../middleware/rateLimit.js';
import * as postController from '../controllers/postsController.js';
import authenticateJWT from '../authentication/jwtAuthentication.js';
import authorizeRole from '../middleware/auth/authorizeRole.js';

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
 * DELETE /posts/:id
 */
postRoute.delete(
  '/posts/:id',
  authenticateJWT,
  authLimiter,
  postController.deletePost
);

/**
 * Route for deleting all posts.
 * DELETE /posts
 */
postRoute.delete(
  '/posts',
  authenticateJWT,
  authLimiter,
  postController.deleteAllPosts
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
postRoute.get('/posts/published', postController.getPublishPosts);

/**
 * Route for fetching latest 10 posts.
 * GET /posts/latest
 */
postRoute.get(
  '/posts/latest',
  authenticateJWT,
  authLimiter,
  postController.getLatestPosts
);

/**
 * Route for fetching posts by tag.
 * GET /posts/:tag
 */
postRoute.get('/posts/:tags', authLimiter, postController.getPostsByTag);

export default postRoute;

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { validationResult } from 'express-validator';
import validateComment from './validators/commentValidators/validateComment.js';

// Create comment
const createComment = [
  validateComment(),

  async (req, res, next) => {
    // Get validation result from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { content } = req.body;
      const { postId } = req.params;
      const userId = req.user.id;

      console.log(`This is the post ID: ${postId}`);

      const post = await prisma.post.findUnique({
        where: { id: parseInt(postId, 10) },
        include: { comments: true },
      });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create comment in the database
      const comment = await prisma.comment.create({
        data: {
          content,
          postId: parseInt(postId, 10),
          userId,
        },
      });

      res.json({ message: 'Comment created successfully!', comment, post });
    } catch (error) {
      console.error('Error creating comment', error);
      next(error);
    }
  },
];

export { createComment };

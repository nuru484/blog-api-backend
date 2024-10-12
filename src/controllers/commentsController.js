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

// Update comment
const updateComment = [
  validateComment(),

  async (req, res, next) => {
    // Get validation result from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { content } = req.body;
      const { postId, commentId } = req.params;
      const userId = req.user.id;

      console.log(
        `Updating comment with ID: ${commentId} for post ID: ${postId}`
      );

      // Check if the post exists
      const post = await prisma.post.findUnique({
        where: { id: parseInt(postId, 10) },
        include: { comments: true },
      });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Check if the comment exists
      const comment = await prisma.comment.findUnique({
        where: { id: parseInt(commentId, 10) },
      });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (comment.userId !== userId) {
        return res.status(403).json({
          message: 'You do not have permission to update this comment',
        });
      }

      // Update the comment in the database
      const updatedComment = await prisma.comment.update({
        where: { id: parseInt(commentId, 10) },
        data: { content },
      });

      res.json({ message: 'Comment updated successfully!', updatedComment });
    } catch (error) {
      console.error('Error updating comment', error);
      next(error);
    }
  },
];

// Delete comment
const deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    console.log(
      `Deleting comment with ID: ${commentId} for post ID: ${postId}`
    );

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId, 10) },
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId, 10) },
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: parseInt(commentId, 10) },
    });

    res.json({ message: 'Comment deleted successfully!' });
  } catch (error) {
    console.error('Error deleting comment', error);
    next(error);
  }
};

export { createComment, updateComment, deleteComment };

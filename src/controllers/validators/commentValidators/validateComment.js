import { body } from 'express-validator';

/**
 * Validates the 'comment' field in the request body.
 * - Ensures the comment is a non-empty string.
 * - Trims leading and trailing whitespaces.
 * - Escapes HTML characters to prevent injection.
 * - Optional: You can set a maximum length to avoid overly long comments.
 */
const validateComment = () => {
  return [
    body('content')
      .trim() // Trim leading and trailing spaces
      .isLength({ min: 1 })
      .withMessage('Comment cannot be empty') // comment is at least 1 character long
      .isLength({ max: 500 })
      .withMessage('Comment cannot exceed 500 characters') // Set max length (e.g., 500 chars)
      .escape(), // Escape potentially unsafe HTML characters
  ];
};

export default validateComment;

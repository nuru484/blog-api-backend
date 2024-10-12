import { body } from 'express-validator';

/**
 * Validates the 'tag name' field in the request body.
 * Checks if the value is a non-empty string and trims and escapes it.
 * Sends an error message if the tag name is empty.
 */
const validateTagName = () => {
  return body('name').trim().isLength({ min: 1 }).escape();
};

export default validateTagName;

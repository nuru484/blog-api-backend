import { body } from 'express-validator';

/**
 * Validates the 'firstName' field in the request body.
 * Checks if the value is a non-empty string and trims and escapes it.
 * Sends an error message if the first name is empty.
 */
const validateFirstName = () => {
  return body('firstname').trim().isLength({ min: 1 }).escape();
};

export default validateFirstName;

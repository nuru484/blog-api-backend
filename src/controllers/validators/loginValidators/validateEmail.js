import { body } from 'express-validator';

/**
 * Validates the 'email' field in the request body.
 * Checks if the value is a valid email format and if it's not already in use.
 * Sends an error message if the email is invalid or already in use.
 */

// Email validation

const validateEmail = () => {
  return body('email')
    .exists({ checkFalsy: true })
    .withMessage('You must type an email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Not a valid email address');
};

export default validateEmail;

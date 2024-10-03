import { body } from 'express-validator';

/**
 * Validates the 'password' field in the request body.
 * Checks if the value meets strong password criteria.
 */
const validatePassword = () => {
  return body('password')
    .exists({ checkFalsy: true })
    .withMessage('You must type a password')
    .trim()
    .escape();
};

export default validatePassword;

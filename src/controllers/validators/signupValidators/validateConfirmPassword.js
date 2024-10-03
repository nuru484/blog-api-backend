import { body } from 'express-validator';

/**
 * Validates the 'password' field in the request body.
 * Checks if the value meets strong password criteria.
 */
const validateConfirmPassword = () => {
  return body('confirmedPassword')
    .exists({ checkFalsy: true })
    .withMessage('You must type a confirmation password')
    .trim()
    .escape()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords do not match');
};

export default validateConfirmPassword;

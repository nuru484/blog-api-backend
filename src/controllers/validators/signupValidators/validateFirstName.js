import { body, ValidationChain } from 'express-validator';

/**
 * Validates the 'firstName' field in the request body.
 * Checks if the value is a non-empty string and trims and escapes it.
 * Sends an error message if the first name is empty.
 *
 * @return {ValidationChain} Express-validator validation chain for 'firstName'.
 */
const validateFirstName = () => {
  return body('firstName', 'Please enter your name!')
    .exists({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .escape();
};

export default validateFirstName;

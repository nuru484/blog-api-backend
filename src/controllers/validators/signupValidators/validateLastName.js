import { body, ValidationChain } from 'express-validator';

/**
 * Validates the 'lastName' field in the request body.
 * Checks if the value is a non-empty string and trims and escapes it.
 * Sends an error message if the last name is empty.
 *
 * @return {ValidationChain} Express-validator validation chain for 'lastName'.
 */
const validateLastName = () => {
  return body('lastName', 'Please enter your name!')
    .exists({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .escape();
};

export default validateLastName;

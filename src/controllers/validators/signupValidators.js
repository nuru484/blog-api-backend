import { body } from 'express-validator';

// Prisma client for database access
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

/**
 * Validates the 'password' field in the request body.
 * Checks if the value meets strong password criteria.
 */
const validateConfirmPassword = () => {
  return body('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('You must type a confirmation password')
    .trim()
    .escape()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords do not match');
};

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
    .withMessage('Not a valid email address')
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: value },
      });
      if (existingUser) {
        throw new Error(
          `A user with the email "${value}" already exists in our database`
        );
      }
    });
};

/**
 * Validates the 'firstName' field in the request body.
 * Checks if the value is a non-empty string and trims and escapes it.
 * Sends an error message if the first name is empty.
 */
const validateFirstName = () => {
  return body('firstname').trim().isLength({ min: 1 }).escape();
};

/**
 * Validates the 'lastName' field in the request body.
 * Checks if the value is a non-empty string and trims and escapes it.
 * Sends an error message if the last name is empty.
 */
const validateLastName = () => {
  return body('lastname', 'Please enter your name!')
    .trim()
    .isLength({ min: 1 })
    .escape();
};

export {
  validatePassword,
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
};

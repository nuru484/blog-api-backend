import { body, ValidationChain } from 'express-validator';

// Prisma client for database access
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Validates the 'email' field in the request body.
 * Checks if the value is a valid email format and if it's not already in use.
 * Sends an error message if the email is invalid or already in use.
 *
 * @return {ValidationChain} Express-validator validation chain for 'email'.
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

export default validateEmail;

import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client'; // Prisma client for database access
const prisma = new PrismaClient();
import { body, validationResult } from 'express-validator';

const validateUser = [
  // Firstname validation
  body('firstname')
    .exists({ checkFalsy: true })
    .withMessage('You must type a firstname')
    .trim()
    .escape(),

  // Lastname validation
  body('lastname')
    .exists({ checkFalsy: true })
    .withMessage('You must type a lastname')
    .trim()
    .escape(),

  // Password validation
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('You must type a password')
    .trim()
    .escape(),

  // Confirm password validation
  body('confirmedPassword')
    .exists({ checkFalsy: true })
    .withMessage('You must type a confirmation password')
    .trim()
    .escape()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords do not match'),

  // Email validation
  body('email')
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
    }),
];

const signUp = [
  // validation middleware
  ...validateUser,

  // async function to handle the sign-up logic
  async (req, res, next) => {
    // validation errors from validateUser middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return them to the user
      return res.status(400).json({ errors: errors.array() }); // Corrected syntax
    }

    try {
      // Hash the password using bcrypt
      const hashedPassword = await hash(req.body.password, 10);

      // Create the new user in the database
      await prisma.user.create({
        data: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: hashedPassword,
          email: req.body.email,
        },
      });

      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      res.status(201).json({ user }); // Send success response
    } catch (err) {
      next(err);
    }
  },
];

export default signUp;

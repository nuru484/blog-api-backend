import { hash } from 'bcrypt';
import { validationResult } from 'express-validator';

// Prisma client for database access
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Signup Validators
import * as signupValidators from './validators/signupValidators.js';

const validateSignup = [
  signupValidators.validateConfirmPassword(),
  signupValidators.validatePassword(),
  signupValidators.validateEmail(),
  signupValidators.validateFirstName(),
  signupValidators.validateLastName(),
];

const signUp = [
  // validation middleware
  ...validateSignup,

  // async function to handle the sign-up logic
  async (req, res, next) => {
    // validation errors from validateUser middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return them to the user
      return res.status(400).json({ errors: errors.array() });
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
          role: req.body.role,
        },
      });

      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      const SUCCESS_MESSAGE =
        'Signed-up successfully! Please log in to explore the app!';

      res.status(201).json({ message: SUCCESS_MESSAGE, user });
    } catch (err) {
      next(err);
    }
  },
];

export default signUp;

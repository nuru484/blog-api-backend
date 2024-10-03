import { hash } from 'bcryptjs';

// Prisma client for database access
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Signup Validators
import validateConfirmPassword from './validators/signupValidators/validateConfirmPassword';
import validatePassword from './validators/signupValidators/validatePassword';
import validateEmail from './validators/signupValidators/validateEmail';
import validateFirstName from './validators/signupValidators/validateFirstName';
import validateLastName from './validators/signupValidators/validateLastName';

const validateSignup = [
  validateConfirmPassword(),
  validatePassword(),
  validateEmail(),
  validateFirstName(),
  validateLastName(),
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

      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  },
];

export default signUp;
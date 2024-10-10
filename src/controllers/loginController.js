import { compare } from 'bcrypt';
import { validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

// Validators for email and password
import validatePassword from './validators/loginValidators/validatePassword.js';
import validateEmail from './validators/loginValidators/validateEmail.js';

// Signup validation middleware
const validateLogin = [validatePassword(), validateEmail()];

const JWT_SECRET = process.env.JWT_SECRET;

// Login handler function
const login = [
  // Validation middleware
  ...validateLogin,

  // Main login handler
  async (req, res) => {
    // Handle validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      // If user is not found
      if (!user) {
        return res.status(401).json({ message: 'Incorrect email' });
      }

      // Compare the password with bcrypt
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // User authenticated, generate a JWT with the role included
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      // Successful login
      res.json({ user, accessToken, refreshToken });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
];

export default login;

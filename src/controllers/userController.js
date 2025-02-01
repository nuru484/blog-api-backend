import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userData = async (req, res) => {
  try {
    const email = req.user.email;

    if (!email) {
      return res
        .status(401)
        .json({ message: 'Unauthenticated, please login.' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    const { password, ...rest } = user;

    res.json({ user: rest });
  } catch (error) {
    console.error('Error retrieving user from token:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default userData;

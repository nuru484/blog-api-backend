import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const adminDashboard = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    res.json({ message: 'Welcome Admin!', posts });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default adminDashboard;

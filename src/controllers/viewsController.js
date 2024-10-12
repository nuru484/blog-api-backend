import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// View post controller
const viewPost = async (req, res, next) => {
  try {
  } catch (error) {
    console.error('Error viewing post', error);
    next(error);
  }
};

export default viewPost;

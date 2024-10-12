import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// View post controller
const viewPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Find the post by ID
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId, 10) },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const updateViewCount = await prisma.view.upsert({
      where: {
        postId: parseInt(postId, 10),
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        count: 1,
        postId: parseInt(postId, 10),
      },
    });

    res.json({
      message: 'Post viewed successfully!',
      post,
      viewCount: updateViewCount,
    });
  } catch (error) {
    console.error('Error viewing post', error);
    next(error);
  }
};

export default viewPost;

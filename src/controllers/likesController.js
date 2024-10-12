import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const likePost = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    const { guestName } = req.body;

    const postID = parseInt(postId, 10);

    // Find the post by ID
    const post = await prisma.post.findUnique({
      where: { id: postID },
      include: { tags: true, comments: true, views: true, likes: true },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    let user = null;

    // If userId is provided, check if the user exists
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    // If both userId and guestName are missing, return an error
    if (!userId && !guestName) {
      return res
        .status(400)
        .json({ message: 'Either userId or guestName must be provided' });
    }

    // Check if a like already exists for the combination of postId, userId, and guestName
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: postID,
        userId: userId ? parseInt(userId, 10) : null,
        guestName: guestName || null,
      },
    });

    let like;

    if (existingLike) {
      // Like already exists, ignore.
      like = existingLike;
    } else {
      // Create a new like if it doesn't exist
      like = await prisma.like.create({
        data: {
          postId: postID,
          userId: userId ? parseInt(userId, 10) : null,
          guestName: guestName || null,
        },
      });
    }

    // Count total likes for the post
    const totalLikes = await prisma.like.count({
      where: { postId: postID },
    });

    res.json({
      message: 'Post liked successfully!',
      post,
      totalLikes,
      like,
    });
  } catch (error) {
    console.error('Error liking post', error);
    next(error);
  }
};

const unLikePost = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    const { guestName } = req.body;

    const postID = parseInt(postId, 10);

    const post = await prisma.post.findUnique({
      where: { id: postID },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    let user = null;

    // If userId is provided, check if the user exists
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    // If both userId and guestName are missing, return an error
    if (!userId && !guestName) {
      return res
        .status(400)
        .json({ message: 'Either userId or guestName must be provided' });
    }

    // Check if a like exists for the provided user or guest
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: postID,
        userId: userId ? parseInt(userId, 10) : null,
        guestName: guestName || null,
      },
    });

    if (!existingLike) {
      return res.status(404).json({ message: 'User like not found' });
    }

    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    // Count total likes for the post
    const totalLikes = await prisma.like.count({
      where: { postId: postID },
    });

    res.json({
      message: 'Post unliked successfully!',
      post,
      totalLikes,
    });
  } catch (error) {
    console.error('Error unliking post', error);
    next(error);
  }
};

export { likePost, unLikePost };

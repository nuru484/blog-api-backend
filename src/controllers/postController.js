import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });

    res.json({ message: 'Post created successfully!', post });
  } catch (error) {
    console.error('Error creating post', error);
    next(error);
  }
};
const publishPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const publishedPost = await prisma.post.update({
      where: { id: post.id },
      data: { published: true },
    });

    res.json({ message: 'Post published successfully!', publishedPost });
  } catch (error) {
    console.error('Error publishing post', error);
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: { title, content },
    });

    res.json({ message: 'Post updated successfully!', updatedPost });
  } catch (error) {
    console.error('Error updating post', error);
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const deletedPost = await prisma.post.delete({
      where: { id: post.id },
    });

    res.json({ message: 'Post deleted successfully!', deletedPost });
  } catch (error) {
    console.error('Error updating post', error);
    next(error);
  }
};

const getUnpublishPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    let unpublishPosts;

    if (id) {
      // Find unpublished posts by user
      unpublishPosts = await prisma.post.findMany({
        where: {
          userId: parseInt(id, 10),
          published: false, // Only fetching unpublished posts
        },
      });
    } else {
      // Find all unpublished posts
      unpublishPosts = await prisma.post.findMany({
        where: {
          published: false, // Only unpublished posts
        },
      });
    }

    // if the result is empty
    if (unpublishPosts.length === 0) {
      return res.status(200).json({
        message: id
          ? 'This user has no unpublished posts'
          : 'No unpublished posts found',
        unpublishPosts: [],
      });
    }

    // unpublished posts
    res.status(200).json({
      message: id
        ? 'User unpublished posts fetched successfully'
        : 'Unpublished posts fetched successfully',
      unpublishPosts,
    });
  } catch (error) {
    console.error('Error fetching unpublished posts', error);
    next(error);
  }
};

export { createPost, publishPost, updatePost, deletePost, getUnpublishPosts };

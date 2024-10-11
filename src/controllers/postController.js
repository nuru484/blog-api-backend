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

// Helper function to fetch posts based on published status
const fetchPosts = async (id, isPublished) => {
  const whereClause = id
    ? { userId: parseInt(id, 10), published: isPublished }
    : { published: isPublished };

  return await prisma.post.findMany({ where: whereClause });
};

const getUnpublishPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const unpublishPosts = await fetchPosts(id, false); // Fetch unpublished posts

    // Return the response
    if (unpublishPosts.length === 0) {
      return res.status(200).json({
        message: id
          ? 'This user has no unpublished posts'
          : 'No unpublished posts found',
        unpublishPosts: [],
      });
    }

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

const getPublishPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const publishPosts = await fetchPosts(id, true); // Fetch published posts

    // Return the response
    if (publishPosts.length === 0) {
      return res.status(200).json({
        message: id
          ? 'This user has no published posts'
          : 'No published posts found',
        publishPosts: [],
      });
    }

    res.status(200).json({
      message: id
        ? 'User published posts fetched successfully'
        : 'Published posts fetched successfully',
      publishPosts,
    });
  } catch (error) {
    console.error('Error fetching published posts', error);
    next(error);
  }
};

export {
  createPost,
  publishPost,
  updatePost,
  deletePost,
  getUnpublishPosts,
  getPublishPosts,
};

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

    res.json({ message: 'Post published successfully!', post: publishedPost });
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

    res.json({ message: 'Post updated successfully!', post: updatedPost });
  } catch (error) {
    console.error('Error updating post', error);
    next(error);
  }
};

export { createPost, publishPost, updatePost };

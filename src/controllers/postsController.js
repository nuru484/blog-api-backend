import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createPost = async (req, res, next) => {
  try {
    const { title, content, published, tagIDs, tagNames } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Post title and content are required' });
    }

    let connectedTags = [];

    // If tagNames are provided, find or create the tags by name
    if (tagNames && tagNames.length > 0) {
      const tagData = await Promise.all(
        tagNames.map(async (tagName) => {
          let tag = await prisma.tag.findUnique({
            where: { name: tagName },
          });

          if (!tag) {
            tag = await prisma.tag.create({
              data: { name: tagName },
            });
          }

          return tag;
        })
      );

      connectedTags = connectedTags.concat(
        tagData.map((tag) => ({ id: tag.id }))
      );
    }

    // If tagIDs are provided, connect them directly
    if (tagIDs && tagIDs.length > 0) {
      connectedTags = connectedTags.concat(
        tagIDs.map((tagId) => ({ id: tagId }))
      );
    }

    // Create post with the connected tags
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        userId,
        tags: {
          connect: connectedTags,
        },
      },
      include: { tags: true }, // Include tags in the response
    });

    res.status(201).json({ message: 'Post created successfully!', post });
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
    const { title, content, tagIDs, tagNames } = req.body;
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

    let connectedTags = [];

    // If tagNames are provided, find or create the tags by name
    if (tagNames && tagNames.length > 0) {
      const tagData = await Promise.all(
        tagNames.map(async (tagName) => {
          let tag = await prisma.tag.findUnique({
            where: { name: tagName },
          });

          if (!tag) {
            tag = await prisma.tag.create({
              data: { name: tagName },
            });
          }

          return tag;
        })
      );

      connectedTags = connectedTags.concat(
        tagData.map((tag) => ({ id: tag.id }))
      );
    }

    // If tagIDs are provided, connect them directly
    if (tagIDs && tagIDs.length > 0) {
      connectedTags = connectedTags.concat(
        tagIDs.map((tagId) => ({ id: tagId }))
      );
    }

    // Update post with new data and the connected tags
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        title,
        content,
        tags: {
          set: [],
          connect: connectedTags,
        },
      },
      include: { tags: true },
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

const deleteAllPosts = async (req, res, next) => {
  try {
    const deleteResult = await prisma.post.deleteMany({});
    res.json({ message: 'All posts deleted successfully!', deleteResult });
  } catch (error) {
    console.error('Error deleting all posts', error);
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

const getLatestPosts = async (req, res, next) => {
  try {
    // latest 10 posts, sorted by creation date in descending order
    const latestPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    if (latestPosts.length === 0) {
      return res.status(200).json({
        message: 'No posts found',
        latestPosts: [],
      });
    }

    res.status(200).json({
      message: 'Latest posts fetched successfully',
      latestPosts,
    });
  } catch (error) {
    console.error('Error fetching latest posts', error);
    next(error);
  }
};

const getPostsByTag = async (req, res, next) => {
  try {
    const { tags } = req.params;

    // Split the tags into an array
    const tagNames = tags.split(',');

    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            name: {
              in: tagNames, // Filter posts with any of the specified tag names
            },
          },
        },
      },
      include: {
        tags: true,
      },
    });

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: `Posts with these tags: ${tagNames} not found` });
    }

    res.json({
      message: `Posts by tags: ${tagNames} fetched successfully`,
      posts,
    });
  } catch (error) {
    console.error('Error fetching posts by tags', error);
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
  getLatestPosts,
  getPostsByTag,
  deleteAllPosts,
};

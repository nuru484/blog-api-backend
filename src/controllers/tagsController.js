import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    const tag = await prisma.tag.create({
      data: {
        name,
      },
    });

    res.json({ message: 'Tag created successfully!', tag });
  } catch (error) {
    console.error('Error creating tag', error);
    next(error);
  }
};

const updateTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    const { id } = req.params;

    if (!name || !id) {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    const tag = await prisma.tag.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    const updatedTag = await prisma.tag.update({
      where: { id: parseInt(id, 10) },
      data: { name },
    });

    res.json({ message: 'Tag updated successfully!', updatedTag });
  } catch (error) {
    console.error('Error updating tag', error);
    next(error);
  }
};

const getTags = async (req, res, next) => {
  try {
    const tags = await prisma.tag.findMany({});

    if (!tags) {
      return res.status(404).json({ message: 'Tags not found' });
    }

    res.json({ message: 'Tags fetched successfully!', tags });
  } catch (error) {
    console.error('Error fetching tags', error);
    next(error);
  }
};

export { createTag, updateTag, getTags };

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { validationResult } from 'express-validator';

import validateTagName from './validators/tagValidator.js';

// Helper function for handling tag ID parsing and validation
const getTagById = async (id, res) => {
  if (!id) {
    res.status(400).json({ message: 'Tag ID is required' });
    return null;
  }

  const tag = await prisma.tag.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!tag) {
    res.status(404).json({ message: 'Tag not found' });
    return null;
  }

  return tag;
};

// Create Tag
const createTag = [
  validateTagName(),
  async (req, res, next) => {
    console.log('Reached createTag middleware');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;
      if (!name) {
        console.log('No name provided');
        return res.status(400).json({ message: 'Tag name is required' });
      }

      console.log('Creating tag with name:', name);
      const tag = await prisma.tag.create({ data: { name } });
      console.log('Tag created:', tag);

      res.json({ message: 'Tag created successfully!', tag });
    } catch (error) {
      console.error('Error creating tag:', error);
      next(error);
    }
  },
];

// Update Tag
const updateTag = [
  validateTagName(),

  async (req, res, next) => {
    // validation errors from validateTagname middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return them to the user
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;
      const { id } = req.params;

      if (!name) {
        return res.status(400).json({ message: 'Tag name is required' });
      }

      const tag = await getTagById(id, res);
      if (!tag) return;

      const updatedTag = await prisma.tag.update({
        where: { id: tag.id },
        data: { name },
      });

      res.json({ message: 'Tag updated successfully!', updatedTag });
    } catch (error) {
      console.error('Error updating tag', error);
      next(error);
    }
  },
];

// Get All Tags
const getTags = async (req, res, next) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json({ message: 'Tags fetched successfully!', tags });
  } catch (error) {
    console.error('Error fetching tags', error);
    next(error);
  }
};

// Delete Tag by ID
const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tag = await getTagById(id, res);
    if (!tag) return;

    const deletedTag = await prisma.tag.delete({
      where: { id: tag.id },
    });

    res.json({ message: 'Tag deleted successfully!', deletedTag });
  } catch (error) {
    console.error('Error deleting tag', error);
    next(error);
  }
};

// Delete All Tags
const deleteAllTags = async (req, res, next) => {
  try {
    const deleteResult = await prisma.tag.deleteMany({});
    res.json({ message: 'All tags deleted successfully!', deleteResult });
  } catch (error) {
    console.error('Error deleting all tags', error);
    next(error);
  }
};

export { createTag, updateTag, getTags, deleteTag, deleteAllTags };

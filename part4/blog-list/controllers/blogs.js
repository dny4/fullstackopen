const express = require('express');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');
const { userExtractor } = require('../utils/middleware');

const blogsRouter = express.Router();

blogsRouter.get('/info', (request, response) => {
  response.json({ message: 'here some blog info' });
});

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1, name: 1,
    });

  return response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  if (!request.user.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const { title, author, url } = request.body;
  if (!title || !author || !url) {
    return response
      .status(400)
      .send({ error: 'invalid content' });
  }

  const user = await User.findById(request.user.id);
  const blog = new Blog({
    title,
    author,
    url,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  return response
    .status(201)
    .json(savedBlog);
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  if (!request.user.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const { id } = request.params;
  const { body } = request;

  if (!body) {
    return response
      .status(400)
      .json({ error: 'invalid content' });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404);
  }

  // check if blog belongs to that user
  if (blog.user.toString() !== request.user.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const result = await Blog
    .findByIdAndUpdate(id, body, {
      runValidators: true,
      new: true,
      context: 'query',
    });

  return response.json(result);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.user.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const { id } = request.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return response
      .status(400)
      .json({ error: 'does not exist' });
  }

  // check if blog belongs to user
  const validOwner = (blog.user.toString() === request.user.id);
  if (!validOwner) {
    return response
      .status(401)
      .json({ error: 'unauthorized' });
  }

  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    return response
      .status(400)
      .json({ error: 'does not exist' });
  }

  return response.json(result);
});

module.exports = blogsRouter;

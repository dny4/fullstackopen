const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const getValidToken = async () => {
  const userLogin = {
    username: 'root',
    password: 'superpass',
  };

  const response = await api
    .post('/api/login')
    .send(userLogin)
    .expect(200);

  return response.body.token;
};

describe('blogs api works', () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const user = new User({
      name: 'superuser',
      username: 'root',
      passwordHash: await bcrypt.hash('superpass', 10),
    });
    await user.save();
  })

  beforeEach(async () => {
    await Blog.deleteMany({});
    const users = await User.find({})
    const user = users[0]

    const promiseArray = helper.initialBlogs.map((b) => {
      const blog = new Blog({ user: user.id, ...b });
      return blog.save();
    });

    await Promise.all(promiseArray);
  });

  describe('when initial blogs are available', () => {
    test('blogs are returned as JSON', async () => {
      const response = await api
        .get('/api/blogs');

      expect(response.get('Content-Type')).toContain('application/json');
    });

    test('all blogs can be retrieved', async () => {
      const response = await api
        .get('/api/blogs');

      const content = response.body.map((b) => b.title);

      expect(content.length).toBe(helper.initialBlogs.length);
    });

    test('id property is defined', async () => {
      const result = await api.get('/api/blogs');

      result.body.map((b) => expect(b.id).toBeDefined());
    });
  });

  describe('creating a new post', () => {
    test('creating a new blog by a valid user works', async () => {
      const user = helper.getUserFromDb();
      const newBlog = {
        title: 'Hard work pays off?',
        author: 'Momo Jagoan',
        url: 'https://arxiv.org/hard-work-pays-off',
        user: user.id,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${await getValidToken()}`)
        .send(newBlog)
        .expect(201);

      const blogs = await helper.blogsInDb();
      const titles = blogs.map((b) => b.title);

      expect(titles.length).toBe(helper.initialBlogs.length + 1);

      expect(titles).toContain(newBlog.title);
    });

    test('likes is set to 0 by default', async () => {
      const user = helper.getUserFromDb();
      const newBlog = {
        title: 'Blog with no likes',
        author: 'Momo Jagoan',
        url: 'https://arxiv.org/hard-work-pays-off',
        user: user.id,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${await getValidToken()}`)
        .send(newBlog)
        .expect(201);

      const blogs = await helper.blogsInDb();
      const blogWithDefaultLikes = blogs.filter((b) => b.title === newBlog.title);

      expect(blogWithDefaultLikes[0].likes).toBe(0);
    });

    test('invalid blog format is not saved', async () => {
      const newBlog = {
        title: 'tile or not tile',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${await getValidToken()}`)
        .send(newBlog)
        .expect(400);
    });
  });

  describe('updating a blog post', () => {
    test('updating a blog with valid token works', async () => {
      const blogs = await helper.blogsInDb();
      const blogToUpdate = blogs[0];
      blogToUpdate.likes = 123456;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${await getValidToken()}`)
        .send(blogToUpdate)
        .expect(200);

      const updatedBlogs = await helper.blogsInDb();
      const updatedBlog = updatedBlogs.filter((b) => b.id === blogToUpdate.id);

      expect(updatedBlog[0]).toEqual(blogToUpdate);
    });

    test('updating a blog with invalid token fails with 401', async () => {
      const blogs = await helper.blogsInDb();
      const blogToUpdate = blogs[0];
      blogToUpdate.likes = 123456;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${await getValidToken()}x`)
        .send(blogToUpdate)
        .expect(401);
    });
  });

  describe('deleting a blog post', () => {
    test('succeeds deletion of post with valid id', async () => {
      const blogIdToDelete = await helper.getValidId();

      await api
        .delete(`/api/blogs/${blogIdToDelete}`)
        .set('Authorization', `Bearer ${await getValidToken()}`)
        .expect(200);

      const blogs = await helper.blogsInDb();
      const ids = blogs.map((b) => b.id);

      expect(ids).not.toContain(blogIdToDelete);
    });

    test('deletion with invalid id result in statuscode 400', async () => {
      const invalidId = await helper.getInvalidId();

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${await getValidToken()}`)
        .expect(400);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

describe('creating new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({
      name: 'superuser',
      username: 'root',
      password: 'superpassword',
    });
    await user.save();
  });

  it('creating a new user with unique username works', async () => {
    const newUser = {
      name: 'momo',
      username: 'momo',
      password: 'momopassword',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { name, username, id } = response.body;

    expect(id).toBeDefined();
    expect({ name, username })
      .toEqual({ name: newUser.name, username: newUser.username });
  });

  it('creating user without username fails', async () => {
    const newUser = {
      name: 'momo',
      password: 'momopassword',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('`username` is required');
  });

  it('creating user without name fails', async () => {
    const newUser = {
      username: 'momo',
      password: 'momopassword',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('`name` is required');
  });

  it('creating user without password fails', async () => {
    const newUser = {
      name: 'momo',
      username: 'momo',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('`password` is required');
  });

  it('creating user with username less than 3 characters fails', async () => {
    const newUser = {
      name: 'momo',
      username: 'mo',
      password: 'momopassword',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('is shorter than the minimum allowed length (3)');
  });

  it('creating user without unique username fails', async () => {
    const newUser = {
      name: 'momo',
      username: 'root',
      password: 'momopassword',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('expected `username` to be unique');
  });

  it('creating new user with password less than 3 character fails', async () => {
    const newUser = {
      name: 'momo',
      username: 'momo',
      password: 'mo',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('password must be at least 3 characters long');
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

describe('login works', () => {
  beforeEach(async () => {
    await User.deleteMany();
    const user = new User({
      name: 'Miyamoto Musashi',
      username: 'ronin',
      passwordHash: await bcrypt.hash('thispassword', 10),
    });

    await user.save();
  });

  it('login with correct username and password works', async () => {
    const correctLoginInfo = {
      username: 'ronin',
      password: 'thispassword',
    };

    const response = await api
      .post('/api/login')
      .send(correctLoginInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const result = response.body;
    expect(result.username).toEqual(correctLoginInfo.username);
    expect(result.token).toBeDefined();
  });

  it('login with incorrect username gives error', async () => {
    const incorrectLoginInfo = {
      username: 'roni',
      password: 'thispassword',
    };

    const response = await api
      .post('/api/login')
      .send(incorrectLoginInfo)
      .expect(401);

    expect(response.body.error).toContain('invalid username or password');
  });

  it('login with incorrect password gives error', async () => {
    const incorrectLoginInfo = {
      username: 'ronin',
      password: 'wrongpassword',
    };

    const response = await api
      .post('/api/login')
      .send(incorrectLoginInfo)
      .expect(401);

    expect(response.body.error).toContain('invalid username or password');
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

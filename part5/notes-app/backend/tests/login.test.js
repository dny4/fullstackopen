const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('login for existing user works', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', 'name': 'superuser', passwordHash })

    await user.save()
  })

  test('wrong username or password is rejected with statuscode 401', async () => {
    let userLogin = {
      username: 'fruit',
      password: 'sekret'
    }

    await api
      .post('/api/login')
      .send(userLogin)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    userLogin.username = 'root'
    userLogin.password = 'wrong-password'

    await api
      .post('/api/login')
      .send(userLogin)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('valid token is generated for valid user with password', async () => {
    const userLogin = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(userLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.token).toBeDefined()
    expect(result.body.username).toBeDefined()
    expect(result.body.name).toBeDefined()

  })

  afterAll(() => {
    mongoose.connection.close()
  })
})

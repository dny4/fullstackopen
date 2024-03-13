const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) {
    return response
      .status(400)
      .json({
        error: '`password` is required',
      });
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({
        error: 'password must be at least 3 characters long',
      });
  }

  const salts = 10;
  const passwordHash = await bcrypt.hash(password, salts);

  const newUser = new User({
    name,
    username,
    passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    return response
      .status(201)
      .json(savedUser);
  } catch (exception) {
    return response
      .status(400)
      .json({
        error: exception.message,
      });
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;

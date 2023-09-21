const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');

const app = express();
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connection successful'))
  .catch((error) => logger.error('connection failed', error.message));

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExractor);

app.get('/', (req, res) => {
  res.status(200).send(`
  <h1>blog list api</h1>
  <a href="/api/blogs">/api/blogs</a>
`);
});

app.get('/info', (req, res) => {
  res.status(200).send(`
  <h1>Nothing to see yet:(</h1>
`);
});

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;

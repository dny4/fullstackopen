const jwt = require('jsonwebtoken');
const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  next(error);
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

const tokenExractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = (request, response, next) => {
  if (request.token !== null) {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      const user = {
        username: decodedToken.username,
        id: decodedToken.id,
      };
      request.user = user;
    } catch (exception) {
      request.token = null
      request.user = null
    }
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExractor,
  userExtractor,
};

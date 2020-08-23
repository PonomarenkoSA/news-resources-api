const notFoundRouter = require('express').Router();
const NotFoundError = require('../errors/notFoundErr');
const { NOT_FOUND_PAGE } = require('../variables/constants');

notFoundRouter.all('/', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE));
});

module.exports = notFoundRouter;

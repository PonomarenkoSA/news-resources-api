const { INTERNAL_ERROR } = require('../variables/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ error: statusCode === 500 ? INTERNAL_ERROR : message });
  next();
};

module.exports = errorHandler;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundErr');
const AuthError = require('../errors/authErr');
const ValidationError = require('../errors/validationErr');
const { SECRET_KEY } = require('../config');

const {
  NOT_FOUND_USER,
  AUTHORIZATION_TRUE,
  MAX_AGE_COOKIE,
  MAX_AGE_LOGOUT,
  LOGOUT_TRUE,
} = require('../variables/constants');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  try {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        email,
        password: hash,
      }))
      .then(() => res.status(201).send({
        name,
        email,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new ValidationError(err.message);
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
};

module.exports.getOneUser = (req, res, next) => {
  try {
    User.findById(req.user._id)
      .orFail(new NotFoundError(NOT_FOUND_USER))
      .then((user) => res.send({ name: user.name, email: user.email }))
      .catch(next);
  } catch (err) {
    next(err);
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res
        .cookie('jwtCookie', token, {
          maxAge: MAX_AGE_COOKIE,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .end();
    })
    .catch((err) => {
      throw new AuthError(err.message);
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res
      .cookie('jwtCookie', '', {
        httpOnly: true,
        maxAge: MAX_AGE_LOGOUT,
        sameSite: 'none',
        secure: true,
      });
    res.send({ message: LOGOUT_TRUE });
  } catch (err) {
    next(err);
  }
};

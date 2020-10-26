const usersRouter = require('express').Router();
const { getOneUser, logout } = require('../controllers/users');

usersRouter.get('/me', getOneUser);
usersRouter.get('/logout', logout);

module.exports = usersRouter;

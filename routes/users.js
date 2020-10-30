const usersRouter = require('express').Router();
const { getOneUser, logout } = require('../controllers/users');

usersRouter.get('/me', getOneUser);
usersRouter.post('/logout', logout);

module.exports = usersRouter;

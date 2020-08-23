const usersRouter = require('express').Router();
const { getOneUser } = require('../controllers/users');

usersRouter.get('/me', getOneUser);

module.exports = usersRouter;

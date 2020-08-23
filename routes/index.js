const router = require('express').Router();

const articlesRouter = require('./articles');
const usersRouter = require('./users');
const notFoundRouter = require('./notfound');

router.use('/articles', articlesRouter);
router.use('/users', usersRouter);
router.use(/..+/, notFoundRouter);

module.exports = router;

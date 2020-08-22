const articlesRouter = require('express').Router();
const { checkArticlesCreation, checkArticleDel } = require('../helpers/validations');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

articlesRouter.get('/', getAllArticles);
articlesRouter.post('/', checkArticlesCreation, createArticle);

articlesRouter.delete('/:articleId', checkArticleDel, deleteArticle);

module.exports = articlesRouter;

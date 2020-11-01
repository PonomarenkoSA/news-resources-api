const Article = require('../models/article');
const ValidationError = require('../errors/validationErr');
const NotFoundError = require('../errors/notFoundErr');
const PermissionError = require('../errors/permissionErr');

const { FORBIDDEN_DEL_ARTICLE, FIND_ARTICLE_ERROR } = require('../variables/constants');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  try {
    Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    })
      .then((article) => res.send({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
        id: article._id,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new ValidationError(err.message);
        }
        throw new Error();
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteArticle = (req, res, next) => {
  try {
    Article.findById(req.params.articleId).select('+owner').orFail(new NotFoundError(FIND_ARTICLE_ERROR))
      .then((article) => {
        if (JSON.stringify(article.owner._id) !== JSON.stringify(req.user._id)) {
          return Promise.reject(new PermissionError(FORBIDDEN_DEL_ARTICLE));
        }
        return Article.findByIdAndDelete(req.params.articleId)
          .then((articleDel) => res.send({ data: articleDel }))
          .catch(next);
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

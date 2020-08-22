const { celebrate, Joi } = require('celebrate');
const { REG_NAME_USER, REG_LINK } = require('../variables/constants');

const checkArticlesCreation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(REG_LINK),
    image: Joi.string().required().regex(REG_LINK),
  }),
});

const checkArticleDel = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).hex(),
  }),
});

const checkSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .regex(REG_NAME_USER),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const checkSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  checkArticlesCreation,
  checkArticleDel,
  checkSignup,
  checkSignin,
};

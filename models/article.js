const mongoose = require('mongoose');
const { NOT_VALID_LINK, REG_LINK } = require('../variables/constants');

const reg = REG_LINK;

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => reg.test(value),
      message: () => NOT_VALID_LINK,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => reg.test(value),
      message: () => NOT_VALID_LINK,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);

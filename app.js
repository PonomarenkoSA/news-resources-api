require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/rate-limiter');
const { login, createUser } = require('./controllers/users');
const mainRouter = require('./routes');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const { checkSignup, checkSignin } = require('./helpers/validations');
const { MANGOOSE_ADDRESS, PORT } = require('./config');

const app = express();

mongoose.connect(MANGOOSE_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(requestLogger);

app.post('/signin', checkSignin, login);
app.post('/signup', checkSignup, createUser);
app.use(auth);
app.use(mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);

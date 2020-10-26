require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
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

const whitelist = [
  'http://localhost:8080',
  'https://ponomarenkosa.github.io/news-explorer-frontend',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const app = express();

mongoose.connect(MANGOOSE_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
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

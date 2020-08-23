const { DEV_SECRET, DEV_MONGOPORT, DEV_PORT } = require('../variables/config-constants');

const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_HOST,
  MONGO_PORT,
  PORT_ENV,
} = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET;
const MANGOOSE_ADDRESS = NODE_ENV === 'production' ? `mongodb://${MONGO_HOST}:${MONGO_PORT}/newsdb` : DEV_MONGOPORT;
const PORT = NODE_ENV === 'production' ? PORT_ENV : DEV_PORT;

module.exports = {
  SECRET_KEY,
  MANGOOSE_ADDRESS,
  PORT,
};

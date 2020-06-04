import dotenv from 'dotenv';

dotenv.config();

module.exports = () => {
  const env = process.env.NODE_ENV;
  if (env === 'test') {
    return require(`./config.${env}.js`);
  }
  return require('./config.development.js');
};

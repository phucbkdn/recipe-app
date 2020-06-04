import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

module.exports = {
  database: process.env.DATABASE_TEST,
  username: process.env.USER_NAME_TEST,
  password: process.env.PASS_WORD_TEST,
  params: {
    dialect: process.env.DIALECT,
    define: {
      underscored: true,
    },
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    host: process.env.DATABASE_HOST_TEST,
    port: process.env.DATABASE_PORT,
  },
  jwtSecret: 'Products-api',
  jwtSession: { session: false },
};

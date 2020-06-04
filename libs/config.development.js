import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

module.exports = {
  database: process.env.DATABASE,
  username: process.env.USER_NAME,
  password: process.env.PASS_WORD,
  params: {
    dialect: process.env.DIALECT,
    define: {
      underscored: true,
    },
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
  jwtSecret: 'Products-api',
  jwtSession: { session: false },
};

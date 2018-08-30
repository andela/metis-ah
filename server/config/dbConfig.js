import { config } from 'dotenv';

config();

const dbConfig = {
  development: {
    use_env_variable: process.env.DEV_DATABASE_URL
  },
  test: {
    use_env_variable: process.env.TEST_DATABASE_URL
  },
  local_dev: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB,
    host: 'localhost',
    dialect: 'postgres'
  },
  local_test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB,
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: process.env.DATABASE_URL
  }
};

export default dbConfig;

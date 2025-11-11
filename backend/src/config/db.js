import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

const sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          dialect: 'postgres',
          port: process.env.DB_PORT,
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
        }
      )
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST || (isTest ? 'localhost' : 'db'),
          dialect: 'postgres',
          port: process.env.DB_PORT || 5432,
          logging: isTest ? false : console.log, // Disable logging in tests
        }
      );

export default sequelize;

import { beforeAll, afterAll } from 'vitest';
import sequelize from '../config/db.js';
import { syncDb } from '../models/index.js';

beforeAll(async () => {
  // Ensure database is synced before tests
  await syncDb();
}, 30000);

afterAll(async () => {
  // Close database connection after all tests
  await sequelize.close();
});

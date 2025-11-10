// tests/auth.test.js
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../index.js'; // Assuming your Express app is exported from this file

describe('Auth API', () => {
  it('should sign up a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      username: 'testuser000',
      email: 'testuser000@test.com',
      password: 'test',
    });

    // Allow 200 or 400 (if user exists)
    expect([200, 400]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('data');
    }
  }, 10000);

  it('should login an existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'testuser000@test.com',
      password: 'test',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'testuser000@test.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

  it('should not logout without authentication', async () => {
    const res = await request(app).post('/api/auth/logout');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});

import express from 'express';
import { register, collectDefaultMetrics } from 'prom-client';
import sequelize from '../config/db.js';

const router = express.Router();

// Enable default metrics collection
collectDefaultMetrics();

// Health check endpoint - always returns 200 if service is running
router.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Service is healthy' });
});

// Readiness check endpoint - checks if database is ready
router.get('/readyz', async (req, res) => {
  try {
    // Test database connection
    await sequelize.authenticate();
    res.status(200).json({ status: 'ok', message: 'Service is ready' });
  } catch {
    res.status(503).json({ status: 'error', message: 'Database not ready' });
  }
});

// Metrics endpoint - exposes Prometheus metrics
router.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (error) {
    res.status(500).end(error);
  }
});

export default router;

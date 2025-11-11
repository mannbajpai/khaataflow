import { Counter, Histogram } from 'prom-client';

// Create metrics
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
});

// Middleware to collect metrics
export const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  // Record request
  httpRequestsTotal.inc({
    method: req.method,
    route: req.route?.path || req.path,
  });

  // Hook into response finish
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path)
      .observe(duration);

    // Record response status
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
  });

  next();
};

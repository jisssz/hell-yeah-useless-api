import { Request, Response, NextFunction } from 'express';

interface RateLimitBucket {
  count: number;
  resetTime: number;
}

const buckets = new Map<string, RateLimitBucket>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute

export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Allow bypassing rate limit for health check and analytics reset
  if (req.path === '/health' || req.path === '/api/analytics/reset') {
    return next();
  }

  const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();

  // Support explicit test header for rapid verification: X-Simulate-RateLimit: true
  const simulateExceeded = req.headers['x-simulate-ratelimit'] === 'true';

  let bucket = buckets.get(ip);
  if (!bucket || now > bucket.resetTime) {
    bucket = { count: 0, resetTime: now + WINDOW_MS };
    buckets.set(ip, bucket);
  }

  bucket.count++;

  const resetSeconds = Math.max(1, Math.ceil((bucket.resetTime - now) / 1000));
  const remaining = simulateExceeded ? 0 : Math.max(0, MAX_REQUESTS - bucket.count);

  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS.toString());
  res.setHeader('X-RateLimit-Remaining', remaining.toString());
  res.setHeader('X-RateLimit-Reset', resetSeconds.toString());

  if (bucket.count > MAX_REQUESTS || simulateExceeded) {
    res.setHeader('Retry-After', resetSeconds.toString());
    return res.status(429).json({
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Rate limit exceeded. Please calm down.'
      }
    });
  }

  next();
};

export const resetRateLimits = () => {
  buckets.clear();
};

import { Router, Request, Response } from 'express';
import { telemetryStore } from '../middleware/telemetry';
import { resetRateLimits } from '../middleware/rateLimit';

const router = Router();

// GET /api/v1/analytics/overview
router.get('/overview', (req: Request, res: Response) => {
  const overview = telemetryStore.getOverview();
  res.json(overview);
});

// GET /api/v1/analytics/logs
router.get('/logs', (req: Request, res: Response) => {
  const limit = Math.min(Math.max(1, Number(req.query.limit) || 50), 200);
  const logs = telemetryStore.getRecentLogs(limit);
  res.json({
    count: logs.length,
    logs
  });
});

// POST /api/analytics/reset (or /api/v1/analytics/reset)
router.post('/reset', (req: Request, res: Response) => {
  telemetryStore.clearLogs();
  resetRateLimits();
  res.json({
    status: 'reset_successful',
    message: 'Telemetry and rate limit buckets have been cleared.'
  });
});

export default router;

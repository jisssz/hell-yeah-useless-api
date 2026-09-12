import { Router, Request, Response } from 'express';
import { NECESSITY_DATA } from '../data/mockData';
import { API_VERSION, createErrorResponse } from '../utils/response';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const thing = req.query.thing;

  if (!thing || typeof thing !== 'string' || thing.trim() === '') {
    return res.status(400).json(
      createErrorResponse(
        'MISSING_REQUIRED_PARAMETER',
        "Query parameter 'thing' is required. Example: /api/v1/necessity?thing=another%20todo%20app"
      )
    );
  }

  const item = NECESSITY_DATA[Math.floor(Math.random() * NECESSITY_DATA.length)];

  res.json({
    thing: thing.trim(),
    necessity_score: item.necessity_score,
    verdict: item.verdict,
    reason: item.reason,
    confidence: item.confidence,
    uselessness_score: 99.7,
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

export default router;

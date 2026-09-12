import { Router, Request, Response } from 'express';
import { ROASTS_POOL } from '../data/mockData';
import { API_VERSION, createErrorResponse } from '../utils/response';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { text } = req.body || {};

  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json(
      createErrorResponse(
        'MISSING_REQUIRED_BODY',
        "Field 'text' is required in JSON body. Example: { \"text\": \"I will finish my project tonight.\" }"
      )
    );
  }

  const trimmed = text.trim();
  const item = ROASTS_POOL[Math.floor(Math.random() * ROASTS_POOL.length)];

  res.json({
    input: trimmed,
    roast: item.roast,
    severity: item.severity,
    uselessness_score: 99.1,
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

export default router;

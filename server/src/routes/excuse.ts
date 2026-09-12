import { Router, Request, Response } from 'express';
import { EXCUSES_POOL } from '../data/mockData';
import { API_VERSION, createErrorResponse } from '../utils/response';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { situation } = req.body || {};

  if (!situation || typeof situation !== 'string' || situation.trim() === '') {
    return res.status(400).json(
      createErrorResponse(
        'MISSING_REQUIRED_BODY',
        "Field 'situation' is required in JSON body. Example: { \"situation\": \"missed a deadline\" }"
      )
    );
  }

  const trimmed = situation.trim();
  const item = EXCUSES_POOL[Math.floor(Math.random() * EXCUSES_POOL.length)];

  res.json({
    situation: trimmed,
    excuse: item.excuse,
    believability: item.believability,
    uselessness_score: 97.9,
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

export default router;

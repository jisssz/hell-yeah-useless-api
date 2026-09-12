import { Router, Request, Response } from 'express';
import { DECISIONS_POOL } from '../data/mockData';
import { API_VERSION, createErrorResponse } from '../utils/response';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { question } = req.body || {};

  if (!question || typeof question !== 'string' || question.trim() === '') {
    return res.status(400).json(
      createErrorResponse(
        'MISSING_REQUIRED_BODY',
        "Field 'question' is required in JSON body. Example: { \"question\": \"Should I order biriyani?\" }"
      )
    );
  }

  const qTrimmed = question.trim();
  const item = DECISIONS_POOL[Math.floor(Math.random() * DECISIONS_POOL.length)];

  res.json({
    question: qTrimmed,
    decision: item.decision,
    confidence: item.confidence,
    reason: item.reason,
    risk_level: item.risk_level,
    uselessness_score: 98.6,
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

export default router;

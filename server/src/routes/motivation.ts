import { Router, Request, Response } from 'express';
import { MOTIVATIONS } from '../data/mockData';
import { API_VERSION } from '../utils/response';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const item = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];

  res.json({
    motivation: item.motivation,
    message: item.message,
    confidence: item.confidence,
    honesty: item.honesty,
    uselessness_score: item.uselessness_score,
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

export default router;

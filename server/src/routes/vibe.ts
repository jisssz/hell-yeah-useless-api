import { Router, Request, Response } from 'express';
import { VIBES } from '../data/mockData';
import { API_VERSION } from '../utils/response';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const item = VIBES[Math.floor(Math.random() * VIBES.length)];

  res.json({
    vibe: item.vibe,
    energy: item.energy,
    chaos: item.chaos,
    recommendation: item.recommendation,
    uselessness_score: item.uselessness_score,
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

export default router;

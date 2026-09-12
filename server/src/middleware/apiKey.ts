import { Request, Response, NextFunction } from 'express';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const headerKey = req.headers['x-api-key'] as string | undefined;
  const authHeader = req.headers['authorization'];
  let bearerKey: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    bearerKey = authHeader.substring(7).trim();
  }

  const rawKey = headerKey || bearerKey;
  let tier = 'guest-open-access';

  if (rawKey) {
    const keyLower = rawKey.toLowerCase();
    if (keyLower.includes('live') || keyLower.includes('prod') || keyLower.startsWith('uk_live_')) {
      tier = 'production-tier';
    } else if (keyLower.includes('test') || keyLower.includes('sandbox') || keyLower.includes('dev') || keyLower.startsWith('uk_dev_')) {
      tier = 'developer-sandbox';
    } else {
      tier = 'developer-sandbox';
    }
  }

  res.setHeader('X-API-Tier', tier);
  // Do not block requests - public open access for MVP
  next();
};

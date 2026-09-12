import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { telemetryMiddleware } from './middleware/telemetry';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { apiKeyMiddleware } from './middleware/apiKey';
import { createErrorResponse, API_VERSION } from './utils/response';

import vibeRouter from './routes/vibe';
import motivationRouter from './routes/motivation';
import necessityRouter from './routes/necessity';
import decisionRouter from './routes/decision';
import roastRouter from './routes/roast';
import excuseRouter from './routes/excuse';
import analyticsRouter from './routes/analytics';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup for Vite frontend and local tools
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Simulate-RateLimit'],
  exposedHeaders: [
    'X-Response-Time',
    'X-Request-Id',
    'X-API-Tier',
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'Retry-After'
  ]
}));

// Body parsing with JSON syntax error catcher
app.use(express.json());
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json(
      createErrorResponse('MALFORMED_JSON', 'Malformed JSON in request body')
    );
  }
  next(err);
});

// Middleware pipeline
app.use(telemetryMiddleware);
app.use(apiKeyMiddleware);
app.use(rateLimitMiddleware);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'operational',
    service: 'USELESS API',
    version: '1.0.0'
  });
});

// Analytics Routes
app.use('/api/analytics', analyticsRouter);
app.use('/api/v1/analytics', analyticsRouter);

// Core Satirical Endpoints
app.use('/api/v1/vibe', vibeRouter);
app.use('/api/v1/motivation', motivationRouter);
app.use('/api/v1/necessity', necessityRouter);
app.use('/api/v1/decision', decisionRouter);
app.use('/api/v1/roast', roastRouter);
app.use('/api/v1/excuse', excuseRouter);

// 404 Handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json(
    createErrorResponse(
      'ROUTE_NOT_FOUND',
      `Cannot ${req.method} ${req.originalUrl}. Maybe try a route that actually has no purpose?`
    )
  );
});

// Global 500 Error Handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json(
    createErrorResponse(
      'INTERNAL_SERVER_ERROR',
      'An unexpected error occurred while computing enterprise uselessness.'
    )
  );
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 USELESS API Gateway running on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/health`);
    console.log(`📊 Analytics: http://localhost:${PORT}/api/v1/analytics/overview`);
  });
}

export default app;

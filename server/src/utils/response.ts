export const API_VERSION = 'v1.0.0';

export interface ErrorResponsePayload {
  error: {
    code: string;
    message: string;
  };
  _meta: {
    timestamp: string;
    version: string;
  };
}

export function createErrorResponse(code: string, message: string): ErrorResponsePayload {
  return {
    error: {
      code,
      message
    },
    _meta: {
      timestamp: new Date().toISOString(),
      version: API_VERSION
    }
  };
}

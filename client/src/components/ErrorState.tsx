import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { BASE_URL } from '../services/apiClient';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Service Anomaly Detected',
  message = `Failed to connect to നരകം Gateway. Please ensure backend is active on ${BASE_URL}.`,
  onRetry,
  className = '',
}) => {
  return (
    <div className={`p-6 border border-rose-900/40 bg-rose-950/20 rounded-xl text-left ${className}`}>
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-rose-900/30 text-rose-400 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-rose-200">{title}</h3>
          <p className="mt-1 text-sm text-rose-300/80 font-mono leading-relaxed">{message}</p>
          {onRetry && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                className="border-rose-800/60 hover:bg-rose-900/30 text-rose-200"
              >
                Retry Request
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

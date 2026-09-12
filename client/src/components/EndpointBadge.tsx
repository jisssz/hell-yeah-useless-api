import React from 'react';
import { HttpMethod } from '../types/api';

interface EndpointBadgeProps {
  method: HttpMethod;
  className?: string;
}

export const EndpointBadge: React.FC<EndpointBadgeProps> = ({ method, className = '' }) => {
  const methodStyles = {
    GET: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    POST: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-mono font-bold text-xs tracking-wider px-2 py-0.5 rounded border ${methodStyles[method]} ${className}`}
    >
      {method}
    </span>
  );
};

import React from 'react';
import { CodeBlock } from '../CodeBlock';

interface CurlBlockProps {
  baseUrl: string;
  endpoint: string;
  method: 'GET' | 'POST';
  queryParams: Record<string, string>;
  bodyPayload?: Record<string, unknown>;
  apiKey?: string;
}

export const CurlBlock: React.FC<CurlBlockProps> = ({
  baseUrl,
  endpoint,
  method,
  queryParams,
  bodyPayload,
  apiKey,
}) => {
  // Build query string
  const queryEntries = Object.entries(queryParams).filter(([_, v]) => v.trim() !== '');
  let fullUrl = `${baseUrl}${endpoint}`;
  if (queryEntries.length > 0) {
    const searchParams = new URLSearchParams();
    queryEntries.forEach(([k, v]) => searchParams.append(k, v));
    fullUrl += `?${searchParams.toString()}`;
  }

  // Construct cURL line by line
  const lines: string[] = [];

  if (method === 'GET') {
    lines.push(`curl -X GET "${fullUrl}" \\`);
  } else {
    lines.push(`curl -X POST "${fullUrl}" \\`);
    lines.push(`  -H "Content-Type: application/json" \\`);
  }

  if (apiKey && apiKey.trim() !== '') {
    lines.push(`  -H "X-API-Key: ${apiKey.trim()}" \\`);
  }

  if (method === 'POST' && bodyPayload && Object.keys(bodyPayload).length > 0) {
    const jsonStr = JSON.stringify(bodyPayload);
    // Escape single quotes for bash
    const escapedJson = jsonStr.replace(/'/g, `'\\''`);
    lines.push(`  -d '${escapedJson}'`);
  } else {
    // Trim trailing backslash on last line
    const lastIdx = lines.length - 1;
    lines[lastIdx] = lines[lastIdx].replace(/ \\$/, '');
  }

  const curlCommand = lines.join('\n');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Generated cURL
        </label>
        <span className="text-[11px] font-mono text-slate-500">Executable command</span>
      </div>
      <CodeBlock code={curlCommand} language="bash" filename="cURL Command" />
    </div>
  );
};

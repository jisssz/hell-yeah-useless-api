import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { API_CATALOG } from '../data/apiCatalog';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { EndpointBadge } from '../components/EndpointBadge';
import { PageHeader } from '../components/PageHeader';

export const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState<'ALL' | 'GET' | 'POST'>('ALL');

  const filteredApis = API_CATALOG.filter((api) => {
    const matchesSearch =
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.endpoint.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMethod = methodFilter === 'ALL' || api.method === methodFilter;

    return matchesSearch && matchesMethod;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <PageHeader
        badge={<Badge variant="brand">Enterprise API Directory</Badge>}
        title="API Catalog"
        description="Comprehensive catalog of our production-grade satirical endpoints. All microservices are instrumented with live telemetry and rate limiting."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search endpoints, methods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 font-mono"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1.5 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
          </span>
          {(['ALL', 'GET', 'POST'] as const).map((method) => (
            <button
              key={method}
              onClick={() => setMethodFilter(method)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                methodFilter === method
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 6 APIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApis.map((api) => (
          <Card key={api.slug} hoverEffect className="flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <EndpointBadge method={api.method} />
                  <span className="font-mono text-xs text-slate-400">{api.endpoint}</span>
                </div>
                <Badge variant="brand">{api.uselessnessScore}% Useless</Badge>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                {api.name}
              </h3>
              <p className="text-xs font-mono text-emerald-500/80 mt-1">{api.tagline}</p>

              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                {api.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">{api.category}</span>
              <Link
                to={`/apis/${api.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 font-mono"
              >
                <span>View API</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {filteredApis.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
          <p className="text-sm font-mono text-slate-400">No useless APIs matched your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setMethodFilter('ALL');
            }}
            className="mt-3 text-xs font-mono text-emerald-400 underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

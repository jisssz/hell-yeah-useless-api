import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, Play, BookOpen, Layers, Terminal } from 'lucide-react';
import { API_CATALOG } from '../data/apiCatalog';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { EndpointBadge } from '../components/EndpointBadge';
import { PageHeader } from '../components/PageHeader';
import { MemeSticker } from '../components/MemeSticker';

type SortOption = 'DEFAULT' | 'MOST_USELESS' | 'LEAST_USELESS' | 'ALPHABETICAL';

export const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState<'ALL' | 'GET' | 'POST'>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('DEFAULT');

  // Summary statistics calculated directly from data
  const stats = useMemo(() => {
    const totalApis = API_CATALOG.length;
    const uniqueMethods = new Set(API_CATALOG.map((api) => api.method)).size;
    const avgScore = (
      API_CATALOG.reduce((acc, api) => acc + api.uselessnessScore, 0) / totalApis
    ).toFixed(1);
    return { totalApis, uniqueMethods, avgScore };
  }, []);

  const filteredAndSortedApis = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    const filtered = API_CATALOG.filter((api) => {
      const matchesSearch =
        !term ||
        api.name.toLowerCase().includes(term) ||
        api.description.toLowerCase().includes(term) ||
        api.endpoint.toLowerCase().includes(term) ||
        api.category.toLowerCase().includes(term) ||
        api.tagline.toLowerCase().includes(term) ||
        api.requiredInput.toLowerCase().includes(term);

      const matchesMethod = methodFilter === 'ALL' || api.method === methodFilter;

      return matchesSearch && matchesMethod;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'MOST_USELESS') return b.uselessnessScore - a.uselessnessScore;
      if (sortBy === 'LEAST_USELESS') return a.uselessnessScore - b.uselessnessScore;
      if (sortBy === 'ALPHABETICAL') return a.name.localeCompare(b.name);
      return 0; // Default ordering
    });
  }, [searchTerm, methodFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="relative">
        <PageHeader
          badge={<Badge variant="brand">🔥 6 REAL ENDPOINTS • ഒരു കാര്യവും നടക്കില്ല</Badge>}
          title="API Catalog (ആറ് അഗ്രഗണ്യന്മാർ)"
          description="Explore all six microservices engineered strictly for satirical inefficacy. Real endpoints, instant telemetry, and 100% genuine Mallu existentialism."
          actions={
            <Link
              to="/playground"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffe814] hover:bg-yellow-300 text-black border-2 border-black font-mono text-xs font-black transition-colors shadow-comic-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Open Playground</span>
            </Link>
          }
        />
        <div className="hidden lg:block absolute -top-3 right-56 pointer-events-none">
          <MemeSticker
            src="/assets/memes/salimkumar-pointing.png"
            speech="SELECT CHEYYEDAA!"
            speechPosition="top-right"
            rotation="rotate-[6deg]"
            size="w-20"
            float
          />
        </div>
      </div>

      {/* Platform Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border-2 border-black bg-slate-900/90 text-xs font-mono shadow-comic-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-[#38ef7d] border border-emerald-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400">Catalog Size</div>
            <div className="text-white font-bold text-sm">{stats.totalApis} APIs (ആകെ എണ്ണം)</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400">HTTP Methods</div>
            <div className="text-white font-bold text-sm">{stats.uniqueMethods} (GET &amp; POST)</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400">Mean Uselessness</div>
            <div className="text-[#ffe814] font-bold text-sm">{stats.avgScore}% (സ്കോർ)</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <span className="font-bold text-xs">0</span>
          </div>
          <div>
            <div className="text-slate-400">Problems Solved</div>
            <div className="text-[#ff3366] font-bold text-sm">0 (ഗ്യാരണ്ടി)</div>
          </div>
        </div>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search endpoints"
            placeholder="Search by name, endpoint, category, parameters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 font-mono"
            >
              clear
            </button>
          )}
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          {/* Method Filter */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {(['ALL', 'GET', 'POST'] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setMethodFilter(method)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  methodFilter === method
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {method}
              </button>
            ))}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              aria-label="Sort catalog by"
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="DEFAULT" className="bg-slate-900 text-slate-200">Default</option>
              <option value="MOST_USELESS" className="bg-slate-900 text-slate-200">Most Useless</option>
              <option value="LEAST_USELESS" className="bg-slate-900 text-slate-200">Least Useless</option>
              <option value="ALPHABETICAL" className="bg-slate-900 text-slate-200">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of API Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedApis.map((api) => {
          const inputBadgeText =
            api.queryParams && api.queryParams.length > 0
              ? `${api.queryParams.length} query param`
              : api.requestBodyFields && api.requestBodyFields.length > 0
              ? 'JSON body required'
              : 'Zero input required';

          return (
            <Card key={api.slug} hoverEffect className="flex flex-col justify-between h-full group border-slate-800/80">
              <div>
                {/* Header with Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <EndpointBadge method={api.method} />
                    <span className="font-mono text-xs text-slate-400 font-semibold">{api.endpoint}</span>
                  </div>
                  <Badge variant="brand">{api.uselessnessScore}%</Badge>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {api.name}
                </h3>
                <p className="text-xs font-mono text-emerald-500/80 mt-1">{api.tagline}</p>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-3 leading-relaxed font-mono">
                  {api.description}
                </p>

                {/* Parameter summary */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Input:</span>
                  <span className="text-slate-300 font-medium">{inputBadgeText}</span>
                </div>
              </div>

              {/* Card Footer with Docs & Playground Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-500 truncate max-w-[120px]">
                  {api.category}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/apis/${api.slug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>View Docs</span>
                  </Link>
                  <Link
                    to={`/playground?api=${api.slug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-[11px] font-mono font-bold transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    <span>Try API</span>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedApis.length === 0 && (
        <div className="text-center py-16 px-4 border border-dashed border-slate-800 rounded-xl bg-slate-900/20 max-w-lg mx-auto space-y-4">
          <Terminal className="w-10 h-10 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white font-mono">No APIs found.</h3>
            <p className="text-xs font-mono text-slate-400 mt-2 leading-relaxed">
              Congratulations. You have successfully discovered a problem our platform cannot solve.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setMethodFilter('ALL');
              setSortBy('DEFAULT');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 underline"
          >
            Reset search and filters
          </button>
        </div>
      )}
    </div>
  );
};

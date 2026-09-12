import React from 'react';

interface PageHeaderProps {
  badge?: React.ReactNode;
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  actions,
  className = '',
}) => {
  return (
    <div className={`mb-10 pb-6 border-b border-slate-800/80 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {badge && <div className="mb-3">{badge}</div>}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="mt-2 text-base text-slate-400 max-w-2xl">{description}</p>
        </div>
        {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
};

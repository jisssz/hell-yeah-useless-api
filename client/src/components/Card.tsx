import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-5 transition-all duration-200 ${
        hoverEffect
          ? 'hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-emerald-500/5 cursor-pointer'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

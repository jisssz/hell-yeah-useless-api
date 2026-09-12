import React from 'react';

export interface MemeStickerProps {
  src: string;
  speech?: string;
  speechColor?: string;
  speechPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  rotation?: string;
  size?: string;
  className?: string;
  float?: boolean;
  pulse?: boolean;
  badge?: string;
}

export const MemeSticker: React.FC<MemeStickerProps> = ({
  src,
  speech,
  speechColor = 'bg-yellow-400 text-black',
  speechPosition = 'top-right',
  rotation = 'rotate-[-3deg]',
  size = 'w-20 sm:w-24',
  className = '',
  float = false,
  pulse = false,
  badge,
}) => {
  const getSpeechPos = () => {
    switch (speechPosition) {
      case 'top-left':
        return '-top-3 -left-3';
      case 'bottom-left':
        return '-bottom-3 -left-3';
      case 'bottom-right':
        return '-bottom-3 -right-3';
      case 'top-right':
      default:
        return '-top-3 -right-3';
    }
  };

  return (
    <div
      className={`select-none pointer-events-none transition-transform duration-300 ${rotation} ${
        float ? 'animate-float-y' : ''
      } ${pulse ? 'animate-pulse-scale' : ''} ${className}`}
      aria-hidden="true"
    >
      <div className="relative inline-block">
        <img
          src={src}
          alt=""
          className={`${size} h-auto drop-shadow-comic-deep`}
          loading="lazy"
        />
        {speech && (
          <div
            className={`absolute ${getSpeechPos()} px-2 py-0.5 rounded-full ${speechColor} text-[10px] font-bungee tracking-wider border-2 border-black shadow-comic-sm whitespace-nowrap z-10`}
          >
            {speech}
          </div>
        )}
        {badge && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-yellow-300 font-mono text-[9px] font-bold border border-yellow-400/50 shadow-sm whitespace-nowrap z-10">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

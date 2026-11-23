import React from 'react';

export default function GrocaveLogo({ 
  variant = 'horizontal', // 'horizontal' | 'stacked' | 'icon' | 'badge'
  size = 'md', // 'sm' | 'md' | 'lg'
  showTagline = true,
  className = '' 
}) {
  // Size calculations
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-[0.22em]',
    md: 'text-[11px] tracking-[0.28em]',
    lg: 'text-[13px] tracking-[0.32em]',
    xl: 'text-sm tracking-[0.36em]'
  };

  // Pure SVG of the exact Grocave Icon Mark
  const GrocaveMark = ({ markSize = iconSizes[size] }) => (
    <svg 
      className={`${markSize} flex-shrink-0 transition-transform duration-300 hover:scale-105`} 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grocavePurple" x1="0%" y1="0%" x2="100%" y2="70%">
          <stop offset="0%" stop-color="#8a2be2"/>
          <stop offset="60%" stop-color="#6a00ff"/>
          <stop offset="100%" stop-color="#5500d4"/>
        </linearGradient>
        <filter id="markGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6a00ff" floodOpacity="0.4"/>
        </filter>
      </defs>

      {/* Modern Grocave G Body */}
      <path 
        d="M 120 52
           C 110 38, 92 30, 74 30
           C 40 30, 18 54, 18 86
           C 18 118, 41 142, 76 142
           C 101 142, 122 128, 130 108
           L 130 83
           L 78 83
           L 78 103
           L 108 103
           C 104 116, 92 122, 76 122
           C 52 122, 38 104, 38 86
           C 38 66, 52 50, 74 50
           C 86 50, 98 56, 106 66
           Z" 
        fill="#FFFFFF" 
      />

      {/* Dynamic Purple Curved Arc Swoosh */}
      <path 
        d="M 6 116
           C 14 98, 32 66, 82 50
           C 114 40, 144 46, 156 50
           C 130 56, 100 66, 72 84
           C 46 100, 32 118, 26 130
           C 18 128, 10 123, 6 116
           Z" 
        fill="url(#grocavePurple)"
        filter="url(#markGlow)"
      />
    </svg>
  );

  if (variant === 'icon') {
    return <GrocaveMark />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-1.5 select-none ${className}`}>
        <GrocaveMark />
        <div className="flex flex-col items-center">
          <div className={`font-display font-extrabold tracking-wider text-white ${textSizes[size]} flex items-center leading-none`}>
            <span>GROC</span>
            <span className="relative inline-flex items-center justify-center text-[#6A00FF]">
              <span className="text-white">A</span>
              <span className="absolute bottom-[2px] w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-[#6A00FF]" />
            </span>
            <span>VE</span>
          </div>
          {showTagline && (
            <div className={`font-semibold text-gray-400 uppercase mt-1 flex items-center gap-1.5 ${taglineSizes[size]}`}>
              <span>BUILD</span>
              <span className="text-[#6A00FF] font-black">•</span>
              <span>GROW</span>
              <span className="text-[#6A00FF] font-black">•</span>
              <span>THRIVE</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Horizontal variant (Standard Navbar & Hero)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <GrocaveMark />
      <div className="flex flex-col justify-center">
        <div className={`font-display font-black tracking-[0.14em] text-white ${textSizes[size]} flex items-center leading-tight`}>
          <span>GROC</span>
          <span className="relative inline-flex items-center justify-center text-[#6A00FF] mx-[0.5px]">
            <span className="text-white">A</span>
            <span className="absolute top-[28%] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-[#6A00FF]" />
          </span>
          <span>VE</span>
        </div>
        {showTagline && (
          <div className={`font-bold text-gray-400 uppercase flex items-center gap-1.5 ${taglineSizes[size]} mt-[1px]`}>
            <span>BUILD</span>
            <span className="text-[#6A00FF] font-black">•</span>
            <span>GROW</span>
            <span className="text-[#6A00FF] font-black">•</span>
            <span>THRIVE</span>
          </div>
        )}
      </div>
    </div>
  );
}

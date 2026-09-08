import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = true }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base font-semibold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-3xl font-extrabold',
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <div className={`relative flex items-center justify-center text-blue-600 ${iconSizes[size]}`}>
        {/* Custom LibrasFlow stylized waving hands SVG icon matching the reference */}
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform hover:scale-105 duration-200"
        >
          {/* Background Left Hand Gesture */}
          <path
            d="M24 16C24 13.8 22.2 12 20 12C17.8 12 16 13.8 16 16V28C16 26.3 14.7 25 13 25C11.3 25 10 26.3 10 28V36C10 44.8 17.2 52 26 52H28C36.8 52 44 44.8 44 36V30C44 28.3 42.7 27 41 27C39.3 27 38 28.3 38 30V24C38 21.8 36.2 20 34 20C31.8 20 30 21.8 30 24V20C30 17.8 28.2 16 26 16C24.9 16 24 16.5 24 16Z"
            fill="#3B82F6"
            fillOpacity="0.4"
          />
          {/* Foreground Right Hand Gesture */}
          <path
            d="M32 10C32 7.8 33.8 6 36 6C38.2 6 40 7.8 40 10V22C40 20.3 41.3 19 43 19C44.7 19 46 20.3 46 22V30C46 38.8 38.8 46 30 46H28C19.2 46 12 38.8 12 30V24C12 22.3 13.3 21 15 21C16.7 21 18 22.3 18 24V18C18 15.8 19.8 14 22 14C24.2 14 26 15.8 26 18V14C26 11.8 27.8 10 30 10C31.1 10 32 10.5 32 10Z"
            fill="#2563EB"
          />
          {/* Subtle palm connection contour */}
          <circle cx="28" cy="32" r="3.5" fill="#1D4ED8" />
          <path
            d="M20 36C22 40 26 43 30 43C34 43 38 40 40 36"
            stroke="#1D4ED8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <span className={`tracking-tight text-slate-900 ${textSizes[size]}`}>
          <span className="text-[#1e3a8a]">Libras</span>
          <span className="text-[#2563eb] font-black">Flow</span>
        </span>
      )}
    </div>
  );
};

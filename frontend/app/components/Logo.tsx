import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <img
      src="/fixhub-logo.png"
      alt="FixHub Logo"
      className={`${sizeClasses[size]} ${className} object-contain`}
      style={{
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))'
      }}
    />
  );
}


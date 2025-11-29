import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      
      {/* Background Circle with Gradient */}
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
      
      {/* Shield Shape */}
      <path
        d="M50 15 L65 22 L65 45 C65 58 60 68 50 72 C40 68 35 58 35 45 L35 22 Z"
        fill="white"
        opacity="0.95"
      />
      
      {/* Tool/Wrench Icon Inside Shield */}
      <path
        d="M50 30 L55 35 L60 30 L55 40 L50 35 Z"
        fill="#0D9488"
      />
      
      {/* Checkmark */}
      <path
        d="M42 48 L48 54 L58 44"
        stroke="#0D9488"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}


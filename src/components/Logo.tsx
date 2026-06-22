import React from 'react';

interface LogoProps {
  className?: string;
  inverse?: boolean;
}

export default function Logo({ className = '', inverse = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`} id="tech-ninja-logo">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/tech-ninja-3bb20.firebasestorage.app/o/Project%20Screenshots%2FLogo-01.png?alt=media&token=6d3a2e67-c811-4273-83da-beb237efdaee"
        alt="Wotech Logo"
        className="h-11 md:h-13 w-auto object-contain transition-transform duration-200"
        referrerPolicy="no-referrer"
        id="wotech-brand-logo-img"
      />
    </div>
  );
}


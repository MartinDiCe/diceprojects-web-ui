import React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-brand-primary text-brand-white hover:bg-brand-secondary',
    secondary: 'bg-brand-dark text-brand-white hover:opacity-90',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-3 text-sm md:px-6',
    lg: 'px-6 py-4 text-sm md:px-10 md:py-5 md:text-base',
  };

  return (
    <button
      className={cn(
        'min-w-0 max-w-full whitespace-normal text-center font-medium uppercase leading-tight tracking-[0.12em] md:tracking-widest transition-all duration-300 inline-flex items-center justify-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('max-w-7xl mx-auto px-5 sm:px-6 w-full', className)}>
    {children}
  </div>
);

export const SectionHeader = ({ 
  title, 
  subtitle, 
  align = 'left',
  light = false 
}: { 
  title: string; 
  subtitle?: string; 
  align?: 'left' | 'center';
  light?: boolean;
}) => (
  <div className={cn('space-y-3 mb-10 md:mb-12', align === 'center' ? 'text-center' : 'text-left')}>
    {subtitle && (
      <span className={cn(
        'text-[10px] font-bold uppercase tracking-[0.28em]',
        light ? 'text-brand-white/60' : 'text-brand-primary'
      )}>
        {subtitle}
      </span>
    )}
    <h2 className={cn(
      'max-w-4xl text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-balance',
      align === 'center' ? 'mx-auto' : '',
      light ? 'text-brand-white' : 'text-brand-dark'
    )}>
      {title}
    </h2>
  </div>
);

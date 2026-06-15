import React from 'react';
import { cn } from '@/src/lib/utils';

interface LegalLinksProps {
  variant?: 'footer' | 'page';
  showTitle?: boolean;
  className?: string;
}

const legalItems = [
  { name: 'Términos y Condiciones', path: '/terminos' },
  { name: 'Política de Privacidad', path: '/privacidad' },
  { name: 'Política de Cookies', path: '/cookies' },
  { name: 'Aviso Legal', path: '/aviso-legal' },
];

export const LegalLinks = ({ 
  variant = 'footer', 
  showTitle = true,
  className 
}: LegalLinksProps) => {
  const isFooter = variant === 'footer';

  return (
    <div className={cn('space-y-4', className)}>
      {showTitle && (
        <h4 className={cn(
          'text-[10px] font-bold uppercase tracking-[0.3em]',
          isFooter ? 'text-brand-primary' : 'text-brand-ink/40'
        )}>
          LEGAL & TRANSPARENCIA
        </h4>
      )}
      <nav className={cn(
        'flex flex-col gap-2',
        !isFooter && 'grid grid-cols-1 md:grid-cols-2 gap-6'
      )}>
        {legalItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={cn(
              'w-full text-sm transition-colors focus-visible:outline-2 focus-visible:outline-brand-accent focus-visible:outline-offset-4',
              isFooter 
                ? 'text-center text-brand-white/60 hover:text-brand-white md:text-left'
                : 'text-left font-bold text-brand-ink/70 hover:text-brand-accent'
            )}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

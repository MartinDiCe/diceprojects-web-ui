import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const goTo = React.useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

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
          <button
            key={item.path}
            type="button"
            onClick={() => goTo(item.path)}
            className={cn(
              'w-full text-sm transition-colors focus-visible:outline-2 focus-visible:outline-brand-accent focus-visible:outline-offset-4',
              isFooter 
                ? 'text-center text-brand-white/60 hover:text-brand-white md:text-left'
                : 'text-left font-bold text-brand-ink/70 hover:text-brand-accent'
            )}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

import React from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Container, buttonClassName } from '@/src/components/common';
import { navItems } from '@/src/constants/navigation';
import { BRAND } from '@/src/app/config/branding.config';
import { copy, useLanguage } from '@/src/i18n/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const t = copy[language];
  const navLabels = [t.nav.home, t.nav.solution, t.nav.method, t.nav.insights, t.nav.about, t.nav.contact];

  const closeMenu = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const renderLanguageButtons = () => (
    <div className="flex rounded-full border border-brand-dark/10 bg-brand-white p-1 shadow-sm">
      {(['es', 'en', 'pt'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={cn(
            'min-h-8 min-w-8 rounded-full px-2 text-[10px] font-black uppercase tracking-[0.08em] transition',
            language === code ? 'bg-brand-primary text-brand-white shadow-sm' : 'text-brand-dark/55 hover:bg-brand-dark/5 hover:text-brand-primary'
          )}
          aria-pressed={language === code}
          aria-label={language === 'en' ? `Switch language to ${code.toUpperCase()}` : language === 'pt' ? `Alterar idioma para ${code.toUpperCase()}` : `Cambiar idioma a ${code.toUpperCase()}`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );

  const mobileDrawer = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 z-[90] bg-brand-dark/35 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[100] flex h-[100dvh] w-full max-w-sm flex-col overflow-y-auto bg-brand-white p-6 shadow-2xl sm:p-8 lg:hidden"
          >
            <div className="mb-8 flex h-12 items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">{t.nav.menu}</span>
              <button type="button" onClick={closeMenu} className="rounded-lg p-2 text-brand-dark hover:bg-brand-dark/5" aria-label={language === 'en' ? 'Close menu' : language === 'pt' ? 'Fechar menu' : 'Cerrar menú'}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={cn(
                    "block w-full rounded-lg px-3 py-3 text-left text-xl font-semibold uppercase tracking-tight transition-colors",
                    location.pathname === item.path ? "bg-brand-primary/8 text-brand-primary" : "text-brand-dark hover:bg-brand-dark/5"
                  )}
                >
                  {navLabels[index]}
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-8 border-t border-brand-dark/5">
              <Link
                to="/contacto#diagnostico"
                onClick={closeMenu}
                data-mkt="mobile_nav_diagnostic_cta"
                data-mkt-category="LEAD"
                className={buttonClassName({ className: 'block w-full py-4 rounded-lg' })}
              >
                {t.nav.cta}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-brand-white/95 backdrop-blur-md border-b border-brand-dark/5 h-16 md:h-20 flex items-center">
        <Container className="flex items-center justify-between px-4 sm:px-6 md:px-10">
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4 shrink-0"
            aria-label={`${BRAND.name} - Inicio`}
          >
            <img
              src="/assets/logos/dice-logo-lineal.svg"
              alt={BRAND.name}
              className="h-9 sm:h-10 md:h-12 w-auto shrink-0"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    "relative text-[11px] font-semibold uppercase tracking-[0.18em] transition-all focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4",
                    isActive ? "text-brand-primary" : "text-brand-dark/65 hover:text-brand-primary"
                  )}
                >
                  {navLabels[index]}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            {renderLanguageButtons()}
            <Link
              to="/contacto#diagnostico"
              data-mkt="nav_diagnostic_cta"
              data-mkt-category="LEAD"
              className={buttonClassName({ className: 'rounded-full h-10 px-5 text-[10px] font-semibold uppercase tracking-[0.16em]' })}
            >
              {t.nav.cta} <ChevronRight size={14} className="ml-2" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            <button
              className="text-brand-dark p-2 hover:bg-brand-dark/5 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {renderLanguageButtons()}
          </div>
        </Container>
      </nav>
      {createPortal(mobileDrawer, document.body)}
    </>
  );
};

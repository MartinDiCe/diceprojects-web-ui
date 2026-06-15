import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Container, Button } from '@/src/components/common';
import { navItems } from '@/src/constants/navigation';
import { BRAND } from '@/src/app/config/branding.config';
import { copy, useLanguage } from '@/src/i18n/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const t = copy[language];
  const navLabels = [t.nav.home, t.nav.solution, t.nav.method, t.nav.insights, t.nav.about, t.nav.contact];

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-white/95 backdrop-blur-md border-b border-brand-dark/5 h-20 flex items-center">
      <Container className="flex items-center justify-between px-4 sm:px-6 md:px-10">
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4 shrink-0"
          aria-label={`${BRAND.name} - Inicio`}
        >
          <img 
            src="/assets/logos/dice-logo-lineal.svg" 
            alt={BRAND.name} 
            className="h-8 sm:h-9 md:h-11 w-auto shrink-0"
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
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-brand-dark/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-dark/65 transition hover:border-brand-primary hover:text-brand-primary"
            aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
          <Link to="/contacto">
            <Button className="rounded-full h-10 px-5 text-[10px] font-semibold uppercase tracking-[0.16em]">
              {t.nav.cta} <ChevronRight size={14} className="ml-2" />
            </Button>
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
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-lg border border-brand-dark/10 px-2.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-dark/70"
            aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </Container>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brand-dark/20 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[88%] max-w-sm bg-brand-white z-50 lg:hidden shadow-2xl p-6 sm:p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">{t.nav.menu}</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-brand-dark/5 rounded-lg">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-5">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium uppercase tracking-tight transition-colors",
                      location.pathname === item.path ? "text-brand-primary" : "text-brand-dark"
                    )}
                  >
                    {navLabels[index]}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-brand-dark/5">
                <Link to="/contacto" onClick={() => setIsOpen(false)}>
                  <Button className="w-full py-4 rounded-lg">{t.nav.cta}</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

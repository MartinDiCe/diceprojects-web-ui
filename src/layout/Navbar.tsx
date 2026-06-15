import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Container, Button } from '@/src/components/common';
import { navItems } from '@/src/constants/navigation';
import { BRAND } from '@/src/app/config/branding.config';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-white/95 backdrop-blur-md border-b border-brand-dark/5 h-24 flex items-center">
      <Container className="flex items-center justify-between px-6 md:px-10">
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4 shrink-0"
          aria-label={`${BRAND.name} - Inicio`}
        >
          <img 
            src="/assets/logos/dice-logo-lineal.svg" 
            alt={BRAND.name} 
            className="h-10 md:h-12 lg:h-14 w-auto shrink-0"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "relative text-[12px] font-semibold uppercase tracking-[0.18em] transition-all focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4",
                  isActive ? "text-brand-primary" : "text-brand-dark/65 hover:text-brand-primary"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}
          <Link to="/contacto">
            <Button className="rounded-full h-11 px-6 text-[11px] font-semibold uppercase tracking-[0.18em]">
              Agendar Diagnóstico <ChevronRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link to="/contacto" className="sm:hidden">
            <Button size="sm" className="px-4 py-2 text-[10px] rounded-lg">Diagnóstico</Button>
          </Link>
          <button 
            className="text-brand-dark p-2 hover:bg-brand-dark/5 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-brand-white z-50 lg:hidden shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Menú</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-brand-dark/5 rounded-lg">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-xl font-medium uppercase tracking-tight transition-colors",
                      location.pathname === item.path ? "text-brand-primary" : "text-brand-dark"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-brand-dark/5">
                <Link to="/contacto" onClick={() => setIsOpen(false)}>
                  <Button className="w-full py-4 rounded-lg">Agendar Diagnóstico</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

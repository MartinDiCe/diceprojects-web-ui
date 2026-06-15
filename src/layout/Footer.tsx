import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Linkedin, Mail, Phone } from 'lucide-react';
import { Container } from '@/src/components/common';
import { LegalLinks } from '@/src/components/legal/LegalLinks';
import { BRAND } from '@/src/app/config/branding.config';
import { copy, useLanguage } from '@/src/i18n/LanguageContext';

export const Footer = () => {
  const { language } = useLanguage();
  const t = copy[language];
  const seoLinks = [
    { label: 'Plataforma empresarial', path: '/plataforma-empresarial-multirubro' },
    { label: 'Automatización de procesos', path: '/automatizacion-de-procesos' },
    { label: 'Gestión comercial', path: '/gestion-comercial-crm-operativo' },
    { label: 'Productos y catálogo', path: '/gestion-productos-catalogo-web' },
    { label: 'Stock de productos', path: '/gestion-stock-productos-inventario' },
    { label: 'Marketing y leads', path: '/marketing-leads-campanas-embudos' },
    { label: 'Presupuestos y cotizaciones', path: '/presupuestos-cotizaciones-compras' },
    { label: 'Proyectos y servicios', path: '/software-gestion-obras-servicios' },
    { label: 'Integraciones empresariales', path: '/integraciones-apis-bases-documentos' },
    { label: 'Copiloto AI empresarial', path: '/copiloto-ai-empresarial' },
  ];

  return (
    <footer className="bg-[#25292F] text-brand-white border-t border-brand-white/10">
      <div className="py-7 md:py-8">
        <Container className="px-6 md:px-10">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-12 text-center md:text-left justify-items-center md:justify-items-start">
            {/* Brand & Institutional Statement */}
            <div className="lg:col-span-3 space-y-3 flex flex-col items-center md:items-start">
              <Link to="/" className="inline-flex focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4">
                <img 
                  src="/assets/logos/dice-logo-positivo.svg" 
                  alt={BRAND.name} 
                  className="h-14 md:h-16 w-auto shrink-0"
                />
              </Link>

              <p className="text-brand-white/68 max-w-xs text-sm leading-relaxed mx-auto md:mx-0">
                {t.footer.statement}
              </p>

              <div className="flex gap-3 justify-center md:justify-start">
                <a
                  href={BRAND.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-mkt="footer_linkedin_click"
                  data-mkt-category="SOCIAL"
                  className="w-9 h-9 bg-brand-white/10 rounded-lg flex items-center justify-center hover:bg-brand-primary transition-colors group focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4"
                  aria-label={`LinkedIn de ${BRAND.name}`}
                >
                  <Linkedin size={16} className="text-brand-white/70 group-hover:text-brand-white" />
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="lg:col-span-6 flex flex-col items-center md:items-start">
              <LegalLinks variant="footer" />
              <div className="mt-5 w-full">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-primary">{t.footer.solutions}</h4>
                <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                  {seoLinks.map((link, index) => (
                    <Link key={link.path} to={link.path} className="block text-sm text-brand-white/60 transition hover:text-brand-primary">
                      {t.footer.links[index] ?? link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact & CTA */}
            <div className="lg:col-span-3 space-y-4 flex flex-col items-center md:items-start">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-primary">{t.footer.contact}</h4>

              <div className="space-y-3">
                <a href={`mailto:${BRAND.contact.email}`} data-mkt="footer_email_click" data-mkt-category="CONTACT" className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4 w-fit mx-auto md:mx-0">
                  <div className="w-8 h-8 rounded-lg bg-brand-white/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                    <Mail size={14} className="text-brand-white/70 group-hover:text-brand-white" />
                  </div>
                  <span className="break-all text-sm font-medium text-brand-white/70 group-hover:text-brand-primary transition-colors">
                    {BRAND.contact.email}
                  </span>
                </a>

                <a href={BRAND.contact.phoneUrl} data-mkt="footer_whatsapp_click" data-mkt-category="CONTACT" className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4 w-fit mx-auto md:mx-0">
                  <div className="w-8 h-8 rounded-lg bg-brand-white/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                    <Phone size={14} className="text-brand-white/70 group-hover:text-brand-white" />
                  </div>
                  <span className="text-sm font-medium text-brand-white/70 group-hover:text-brand-primary transition-colors">
                    {BRAND.contact.phone}
                  </span>
                </a>
              </div>

              <div className="pt-1">
                <Link
                  to="/contacto#diagnostico"
                  data-mkt="footer_diagnostic_cta"
                  data-mkt-category="LEAD"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-primary px-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-white transition hover:bg-brand-secondary"
                >
                  {t.footer.diagnostic} <ChevronRight size={14} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-brand-white/10 py-4">
        <Container className="px-6 md:px-10 flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-white/40">
          <p>© {new Date().getFullYear()} Dice Projects. {t.footer.rights}</p>
          <p className="hidden md:block">{t.footer.line}</p>
        </Container>
      </div>
    </footer>
  );
};

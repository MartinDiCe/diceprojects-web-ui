import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Linkedin, Mail, Phone } from 'lucide-react';
import { Container, Button } from '@/src/components/common';
import { LegalLinks } from '@/src/components/legal/LegalLinks';
import { BRAND } from '@/src/app/config/branding.config';

export const Footer = () => {
  const seoLinks = [
    { label: 'Plataforma empresarial', path: '/plataforma-empresarial-multirubro' },
    { label: 'Automatización de procesos', path: '/automatizacion-de-procesos' },
    { label: 'Gestión comercial', path: '/gestion-comercial-crm-operativo' },
    { label: 'Productos y catálogo', path: '/gestion-productos-catalogo-web' },
    { label: 'Stock y almacenes', path: '/gestion-stock-almacenes-inventario' },
    { label: 'Marketing y leads', path: '/marketing-leads-campanas-embudos' },
    { label: 'Presupuestos y cotizaciones', path: '/presupuestos-cotizaciones-compras' },
    { label: 'Proyectos y servicios', path: '/software-gestion-obras-servicios' },
    { label: 'Integraciones empresariales', path: '/integraciones-apis-bases-documentos' },
    { label: 'Copiloto AI empresarial', path: '/copiloto-ai-empresarial' },
  ];

  return (
    <footer className="bg-[#25292F] text-brand-white border-t border-brand-white/10">
      <div className="py-10">
        <Container className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-center md:text-left justify-items-center md:justify-items-start">
            {/* Brand & Institutional Statement */}
            <div className="lg:col-span-4 space-y-3 flex flex-col items-center md:items-start">
              <Link to="/" className="inline-flex focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4">
                <img 
                  src="/assets/logos/dice-logo-positivo.svg" 
                  alt={BRAND.name} 
                  className="h-16 md:h-24 w-auto shrink-0"
                />
              </Link>

              <p className="text-brand-white/70 max-w-sm text-sm leading-relaxed mx-auto md:mx-0">
                Diseñamos orden operativo. Integramos sistemas y estructuramos procesos para que la tecnología escale con control.
              </p>

              <div className="flex gap-3 justify-center md:justify-start">
                <a
                  href={BRAND.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-brand-white/10 rounded-lg flex items-center justify-center hover:bg-brand-primary transition-colors group focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4"
                  aria-label={`LinkedIn de ${BRAND.name}`}
                >
                  <Linkedin size={16} className="text-brand-white/70 group-hover:text-brand-white" />
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="lg:col-span-4 flex flex-col items-center md:items-start">
              <LegalLinks variant="footer" />
              <div className="mt-6 space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-primary">Soluciones</h4>
                {seoLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="block text-sm text-brand-white/60 transition hover:text-brand-primary">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact & CTA */}
            <div className="lg:col-span-4 space-y-5 flex flex-col items-center md:items-start">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Contacto</h4>

              <div className="space-y-3">
                <a href={`mailto:${BRAND.contact.email}`} className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4 w-fit mx-auto md:mx-0">
                  <div className="w-8 h-8 rounded-lg bg-brand-white/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                    <Mail size={14} className="text-brand-white/70 group-hover:text-brand-white" />
                  </div>
                  <span className="text-sm font-medium text-brand-white/70 group-hover:text-brand-primary transition-colors">
                    {BRAND.contact.email}
                  </span>
                </a>

                <a href={BRAND.contact.phoneUrl} className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4 w-fit mx-auto md:mx-0">
                  <div className="w-8 h-8 rounded-lg bg-brand-white/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                    <Phone size={14} className="text-brand-white/70 group-hover:text-brand-white" />
                  </div>
                  <span className="text-sm font-medium text-brand-white/70 group-hover:text-brand-primary transition-colors">
                    {BRAND.contact.phone}
                  </span>
                </a>
              </div>

              <div className="pt-2">
                <Link to="/contacto">
                  <Button
                    variant="primary"
                    className="h-10 px-6 rounded-lg text-sm shadow-lg hover:shadow-xl mx-auto md:mx-0"
                  >
                    Solicitar Diagnóstico <ChevronRight size={14} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-brand-white/10 py-6">
        <Container className="px-6 md:px-10 flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-white/40">
          <p>© {new Date().getFullYear()} Dice Projects. Todos los derechos reservados.</p>
          <p className="hidden md:block">Producto Empresarial • Automatización • Copiloto AI</p>
        </Container>
      </div>
    </footer>
  );
};

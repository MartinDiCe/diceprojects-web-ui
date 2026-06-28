import { ArrowRight, Bot, CheckCircle2, Globe2, Network, Rocket, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, SectionHeader, buttonClassName } from '@/src/components/common';
import { Seo, organizationJsonLd, serviceJsonLd } from '@/src/components/seo/Seo';
import { copy, useLanguage } from '@/src/i18n/LanguageContext';

const offerIcons = [Workflow, Network, Globe2, Bot];

export default function ServiciosPage() {
  const { language } = useLanguage();
  const t = copy[language].services;

  return (
    <div className="bg-brand-white pb-20 md:pb-28">
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        path="/automatizacion-y-orquestacion"
        keywords={['enterprise automation', 'software multirubro', 'AI copilot', 'business operating platform', 'integraciones empresariales']}
        jsonLd={[organizationJsonLd(), serviceJsonLd(t.seoTitle, t.seoDescription, '/automatizacion-y-orquestacion')]}
      />

      <section className="relative overflow-hidden bg-brand-dark pb-16 pt-28 text-brand-white md:pb-20 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(56,126,188,0.42),transparent_34%)]" />
        <Container className="relative z-10">
          <div className="max-w-[350px] space-y-6 sm:max-w-xl md:max-w-4xl">
            <span className="inline-flex rounded-full border border-brand-white/15 bg-brand-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-white/75">
              {t.eyebrow}
            </span>
            <h1 className="text-3xl font-medium leading-tight sm:text-4xl md:text-6xl">{t.h1}</h1>
            <p className="max-w-[350px] text-base leading-relaxed text-brand-white/65 sm:max-w-3xl md:text-xl">{t.intro}</p>
            <Link to="/contacto#diagnostico" className={buttonClassName({ size: 'lg', className: 'w-full sm:w-auto' })}>
              {t.cta} <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader align="center" subtitle="Offer" title={t.offersTitle} />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {t.offers.map(([title, body], index) => {
              const Icon = offerIcons[index] ?? CheckCircle2;
              const featured = index === 1;
              return (
                <div key={title} className={`rounded-lg border p-6 md:p-8 ${featured ? 'border-brand-primary bg-brand-dark text-brand-white shadow-2xl shadow-brand-primary/20' : 'border-brand-dark/10 bg-brand-white'}`}>
                  <Icon className={featured ? 'text-brand-primary' : 'text-brand-primary'} size={30} />
                  <h2 className="mt-5 text-2xl font-bold leading-tight">{title}</h2>
                  <p className={`mt-4 text-sm leading-relaxed ${featured ? 'text-brand-white/65' : 'text-brand-dark/62'}`}>{body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <SectionHeader subtitle="Use cases" title={t.examplesTitle} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.examples.map(([title, body], index) => (
              <div key={title} className="rounded-lg bg-brand-white p-6">
                <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">{body}</p>
                {index === 4 && (
                  <a
                    href="https://inmopub.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-mkt="services_inmopub_click"
                    data-mkt-category="PRODUCT"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand-primary"
                  >
                    {language === 'en' ? 'View real estate management' : language === 'pt' ? 'Ver gestão imobiliária' : 'Ver gestión inmobiliaria'} <ArrowRight size={14} />
                  </a>
                )}
                {index === 5 && (
                  <a
                    href="https://urbanprojectspub.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-mkt="services_urbanpub_click"
                    data-mkt-category="PRODUCT"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand-primary"
                  >
                    {language === 'en' ? 'View real estate development projects' : language === 'pt' ? 'Ver projetos imobiliários e obra' : 'Ver proyectos inmobiliarios y obra'} <ArrowRight size={14} />
                  </a>
                )}
                {(index === 0 || index === 1 || index === 3) && (
                  <a
                    href="https://dicecommercepub.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-mkt="services_dicecommercepub_click"
                    data-mkt-category="PRODUCT"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand-primary"
                  >
                    {language === 'en' ? 'View wholesale commerce demo' : language === 'pt' ? 'Ver demo de comércio atacadista' : 'Ver comercio mayorista'} <ArrowRight size={14} />
                  </a>
                )}
                {/(proyectos|obras|projects|construction|servicios)/i.test(title) && index !== 4 && index !== 5 && (
                  <Link
                    to="/software-gestion-obras-servicios"
                    data-mkt="services_projects_click"
                    data-mkt-category="PRODUCT"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand-primary"
                  >
                    {language === 'en' ? 'View integral projects' : language === 'pt' ? 'Ver projetos integrais' : 'Ver proyectos integrales'} <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader subtitle="Delivery" title={t.implementationTitle} />
          </div>
          <div className="grid grid-cols-1 gap-3 lg:col-span-7">
            {t.steps.map(([num, title, body]) => (
              <div key={num} className="grid grid-cols-[48px_1fr] gap-4 rounded-lg border border-brand-dark/10 p-4 sm:grid-cols-[72px_1fr] sm:p-5">
                <span className="text-2xl font-bold text-brand-primary sm:text-3xl">{num}</span>
                <div>
                  <h3 className="font-bold text-brand-dark">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-dark/58">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-primary py-16 text-brand-white md:py-20">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <Rocket size={34} />
            <h2 className="mt-6 text-3xl font-medium leading-tight md:text-5xl">{t.finalCta}</h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link to="/contacto#diagnostico" className={buttonClassName({ variant: 'secondary', size: 'lg', className: 'w-full bg-brand-white text-brand-primary hover:bg-brand-light sm:w-auto' })}>
              {t.cta}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

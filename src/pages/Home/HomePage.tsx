import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  CheckCircle2,
  FileCheck2,
  Megaphone,
  MousePointerClick,
  PlugZap,
  Send,
  ShieldCheck,
  ShoppingCart,
  Warehouse,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '@/src/components/common';
import { Seo, organizationJsonLd, serviceJsonLd } from '@/src/components/seo/Seo';
import { copy, useLanguage } from '@/src/i18n/LanguageContext';

const catalogIcons = [FileCheck2, Send, Warehouse, Building2, Megaphone, Bot];
const workflowIcons = [ShoppingCart, PlugZap, MousePointerClick, BarChart3];

export default function HomePage() {
  const { language } = useLanguage();
  const t = copy[language].home;

  return (
    <div className="overflow-hidden bg-brand-white">
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        path="/"
        keywords={['enterprise operations platform', 'automatización de procesos', 'software operativo empresarial', 'business automation', 'AI copilot', 'gestión empresarial']}
        jsonLd={[
          organizationJsonLd(),
          serviceJsonLd(t.seoTitle, t.seoDescription, '/'),
        ]}
      />

      <section className="relative min-h-[760px] overflow-hidden bg-brand-dark text-brand-white md:min-h-[720px]">
        <img
          src="/assets/images/enterprise-operations-hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,41,47,0.92)_0%,rgba(37,41,47,0.78)_36%,rgba(37,41,47,0.34)_72%,rgba(37,41,47,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,41,47,0.18),rgba(37,41,47,0.78))]" />

        <Container className="relative z-10 flex min-h-[760px] items-center pt-20 md:min-h-[720px]">
          <div className="max-w-[350px] space-y-6 sm:max-w-xl md:max-w-3xl">
            <span className="inline-flex rounded-full border border-brand-white/20 bg-brand-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-white/78 backdrop-blur">
              {t.eyebrow}
            </span>
            <h1 className="text-3xl font-medium leading-tight text-brand-white sm:text-5xl md:text-7xl md:leading-none">
              {t.h1}
            </h1>
            <p className="max-w-[350px] text-base leading-relaxed text-brand-white/76 sm:max-w-2xl sm:text-lg md:text-xl">
              {t.intro}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contacto" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  {t.primary} <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/automatizacion-y-orquestacion" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full border-brand-white/45 bg-brand-dark/20 text-brand-white backdrop-blur hover:border-brand-white hover:bg-brand-white hover:text-brand-dark sm:w-auto">
                  {t.secondary}
                </Button>
              </Link>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-3 pt-2 text-sm font-semibold text-brand-white/78 sm:grid-cols-3">
              {t.proof.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="shrink-0 text-brand-primary" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <SectionHeader subtitle="Platform" title={t.catalogTitle} />
              <p className="text-base leading-relaxed text-brand-dark/60 md:text-lg">{t.catalogIntro}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7 xl:grid-cols-3">
              {t.catalog.map(([title, body], index) => {
                const Icon = catalogIcons[index] ?? Boxes;
                return (
                  <div key={title} className="rounded-lg border border-brand-dark/10 bg-brand-light/55 p-5">
                    <Icon className="mb-4 text-brand-primary" size={24} />
                    <h3 className="text-base font-bold leading-tight text-brand-dark">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">{body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <SectionHeader align="center" subtitle="Workflows" title={t.workflowsTitle} />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {t.workflows.map(([title, body], index) => {
              const Icon = workflowIcons[index] ?? CheckCircle2;
              return (
                <div key={title} className="rounded-lg bg-brand-white p-6 shadow-sm">
                  <Icon className="text-brand-primary" size={28} />
                  <h3 className="mt-5 text-lg font-bold leading-tight text-brand-dark">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/62">{body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-brand-dark py-16 text-brand-white md:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeader subtitle="Website AI" title={t.aiTitle} light />
            <p className="text-base leading-relaxed text-brand-white/62 md:text-lg">{t.aiCopy}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6">
            {t.aiBullets.map((item) => (
              <div key={item} className="rounded-lg border border-brand-white/10 bg-brand-white/5 p-5">
                <Bot className="text-brand-primary" size={24} />
                <p className="mt-4 text-sm font-bold leading-relaxed text-brand-white/82">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-white py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeader subtitle="Outcome" title={t.impactTitle} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5">
            {t.impact.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-brand-dark/10 px-4 py-3 text-sm font-bold text-brand-dark/75">
                <ShieldCheck className="shrink-0 text-brand-primary" size={18} />
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

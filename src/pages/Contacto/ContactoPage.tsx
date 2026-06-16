import { ArrowRight, CalendarCheck, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Button, SectionHeader } from '@/src/components/common';
import { BRAND } from '@/src/app/config/branding.config';
import { Seo, organizationJsonLd } from '@/src/components/seo/Seo';
import { copy, useLanguage } from '@/src/i18n/LanguageContext';
import { submitMarketingLead, trackMarketingEvent } from '@/src/lib/marketingCapture';

const interestsByLanguage = {
  es: [
    'Ventas y cotizaciones',
    'Productos / catálogo web',
    'Stock y movimientos',
    'Compras y proveedores',
    'Eventos web / leads',
    'Proyectos integrales',
    'Copiloto AI empresarial',
    'Integraciones con sistemas y datos',
  ],
  en: [
    'Sales and quotes',
    'Products / web catalog',
    'Inventory movements',
    'Procurement and suppliers',
    'Web events / leads',
    'Integrated projects',
    'Enterprise AI copilot',
    'Systems and data integrations',
  ],
  pt: [
    'Vendas e cotações',
    'Produtos / catálogo web',
    'Estoque e movimentos',
    'Compras e fornecedores',
    'Eventos web / leads',
    'Projetos integrais',
    'Copiloto AI empresarial',
    'Integrações com sistemas e dados',
  ],
};

const formStatusByLanguage = {
  es: {
    sending: 'Enviando...',
    sent: 'Solicitud registrada. Te contactamos para coordinar el diagnóstico.',
    error: 'No pudimos registrar el lead en backoffice. Abrimos el email como respaldo.',
  },
  en: {
    sending: 'Sending...',
    sent: 'Request received. We will contact you to schedule the assessment.',
    error: 'We could not register the lead in backoffice. Email fallback opened.',
  },
  pt: {
    sending: 'Enviando...',
    sent: 'Solicitação registrada. Entraremos em contato para coordenar o diagnóstico.',
    error: 'Não conseguimos registrar o lead no backoffice. Abrimos o email como alternativa.',
  },
} as const;

export default function ContactoPage() {
  const { language } = useLanguage();
  const location = useLocation();
  const t = copy[language].contact;
  const formStatus = formStatusByLanguage[language];
  const interests = interestsByLanguage[language];
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (location.hash !== '#diagnostico') {
      return;
    }
    window.setTimeout(() => {
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      firstInputRef.current?.focus({ preventScroll: true });
    }, 80);
  }, [location.hash]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const selectedInterests = form.getAll('intereses').join(', ') || 'Sin especificar';
    const fullName = String(form.get('nombre') || '').trim();
    const email = String(form.get('email') || '').trim();
    const company = String(form.get('empresa') || '').trim();
    const phone = String(form.get('telefono') || '').trim();
    const message = String(form.get('dolor') || '').trim();
    const metadata = {
      company,
      industry: form.get('rubro') || '',
      companySize: form.get('tamano') || '',
      priority: form.get('prioridad') || '',
      interests: selectedInterests,
      language,
      form: 'diagnostic',
    };

    setSubmitState('submitting');
    try {
      await submitMarketingLead({
        fullName,
        email,
        phone,
        message: [
          `Empresa: ${company}`,
          `Rubro: ${form.get('rubro') || ''}`,
          `Tamaño: ${form.get('tamano') || ''}`,
          `Prioridad: ${form.get('prioridad') || ''}`,
          `Intereses: ${selectedInterests}`,
          '',
          message,
        ].join('\n'),
        actionCode: 'diagnostic_form_submit',
        consent: true,
        metadata,
      });
      void trackMarketingEvent({
        eventType: 'CONVERSION',
        actionCode: 'diagnostic_form_submit',
        actionLabel: 'Diagnostic form submitted',
        category: 'LEAD',
        metadata,
      });
      setSubmitState('sent');
      formElement.reset();
      return;
    } catch {
      setSubmitState('error');
    }

    const subject = encodeURIComponent(`Lead diagnóstico Dice Projects - ${form.get('empresa') || 'Empresa'}`);
    const body = encodeURIComponent([
      'Nuevo lead para diagnóstico Dice Projects',
      '',
      `Nombre: ${form.get('nombre') || ''}`,
      `Empresa: ${form.get('empresa') || ''}`,
      `Email: ${form.get('email') || ''}`,
      `Teléfono/WhatsApp: ${form.get('telefono') || ''}`,
      `Rubro: ${form.get('rubro') || ''}`,
      `Tamaño aproximado: ${form.get('tamano') || ''}`,
      `Prioridad: ${form.get('prioridad') || ''}`,
      `Intereses: ${selectedInterests}`,
      '',
      `Dolor operativo: ${form.get('dolor') || ''}`,
    ].join('\n'));

    window.location.href = `mailto:${BRAND.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-brand-white pb-20 md:pb-28">
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        path="/contacto"
        keywords={['diagnóstico de automatización', 'automation assessment', 'enterprise AI copilot', 'business process improvement']}
        jsonLd={organizationJsonLd()}
      />
      <section className="bg-brand-dark pb-14 pt-28 text-brand-white md:pb-16 md:pt-32">
        <Container>
          <div className="max-w-[350px] space-y-6 sm:max-w-xl md:max-w-4xl">
            <span className="inline-flex rounded-full border border-brand-white/15 bg-brand-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-white/75">
              {t.eyebrow}
            </span>
            <h1 className="text-3xl font-medium leading-tight sm:text-4xl md:text-6xl">{t.h1}</h1>
            <p className="max-w-[350px] text-base leading-relaxed text-brand-white/65 sm:max-w-3xl md:text-xl">{t.intro}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 space-y-8 lg:order-1 lg:col-span-5">
              <SectionHeader subtitle="Contact" title={t.directTitle} />
              <div className="space-y-4">
                <a href={`mailto:${BRAND.contact.email}`} data-mkt="contact_email_click" data-mkt-category="CONTACT" className="flex items-center gap-4 rounded-lg border border-brand-dark/10 p-4 transition hover:border-brand-primary">
                  <Mail className="shrink-0 text-brand-primary" size={24} />
                  <div>
                    <p className="text-xs font-bold uppercase text-brand-dark/45">Email</p>
                    <p className="break-all font-bold text-brand-dark">{BRAND.contact.email}</p>
                  </div>
                </a>
                <a href={BRAND.contact.phoneUrl} data-mkt="contact_whatsapp_click" data-mkt-category="CONTACT" className="flex items-center gap-4 rounded-lg border border-brand-dark/10 p-4 transition hover:border-brand-primary">
                  <Phone className="shrink-0 text-brand-primary" size={24} />
                  <div>
                    <p className="text-xs font-bold uppercase text-brand-dark/45">WhatsApp</p>
                    <p className="font-bold text-brand-dark">{BRAND.contact.phone}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-lg border border-brand-dark/10 p-4">
                  <MapPin className="shrink-0 text-brand-primary" size={24} />
                  <div>
                    <p className="text-xs font-bold uppercase text-brand-dark/45">Base</p>
                    <p className="font-bold text-brand-dark">Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-lg bg-brand-light p-6">
                  <ShieldCheck className="text-brand-primary" size={30} />
                  <h3 className="mt-4 text-lg font-bold leading-tight text-brand-dark">{t.confidentiality}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">{t.confidentialityCopy}</p>
                </div>
                <div className="rounded-lg border border-brand-dark/10 p-6">
                  <CalendarCheck className="text-brand-primary" size={30} />
                  <h3 className="mt-4 text-lg font-bold leading-tight text-brand-dark">{t.brief}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">{t.briefCopy}</p>
                </div>
              </div>
            </div>

            <div
              id="diagnostico"
              ref={formCardRef}
              className="order-1 scroll-mt-24 rounded-lg bg-brand-dark p-5 text-brand-white shadow-2xl sm:p-6 md:p-10 lg:order-2 lg:col-span-7"
            >
              <h2 className="text-3xl font-bold leading-tight">{t.formTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-white/55">{t.formIntro}</p>
              <form className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-5" onSubmit={handleSubmit}>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">{t.labels.name}</span>
                  <input ref={firstInputRef} name="nombre" required className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder={t.labels.name} />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">{t.labels.company}</span>
                  <input name="empresa" required className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder={t.labels.company} />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">{t.labels.email}</span>
                  <input name="email" type="email" required className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder="name@company.com" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">{t.labels.phone}</span>
                  <input name="telefono" className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder="+54..." />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">{t.labels.industry}</span>
                  <select name="rubro" className="w-full rounded-lg border border-brand-white/15 bg-brand-dark px-4 py-3 text-base outline-none transition focus:border-brand-primary">
                    <option>Commercial / distribution</option>
                    <option>Services</option>
                    <option>Construction / projects</option>
                    <option>Automotive / after-sales</option>
                    <option>Industry</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">{t.labels.size}</span>
                  <select name="tamano" className="w-full rounded-lg border border-brand-white/15 bg-brand-dark px-4 py-3 text-base outline-none transition focus:border-brand-primary">
                    <option>1 - 10</option>
                    <option>11 - 50</option>
                    <option>51 - 200</option>
                    <option>200+</option>
                  </select>
                </label>
                <label className="space-y-2 md:col-span-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">{t.labels.priority}</span>
                  <select name="prioridad" className="w-full rounded-lg border border-brand-white/15 bg-brand-dark px-4 py-3 text-base outline-none transition focus:border-brand-primary">
                    <option>Operate and sell better</option>
                    <option>Automate manual processes</option>
                    <option>Integrate systems and data</option>
                    <option>Deploy AI with documents, systems and data</option>
                    <option>Plan a complete transformation</option>
                  </select>
                </label>
                <div className="md:col-span-2">
                  <p className="mb-3 text-xs font-bold uppercase text-brand-white/45">{t.labels.interests}</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {interests.map((interest) => (
                      <label key={interest} className="flex items-center gap-3 rounded-lg border border-brand-white/10 bg-brand-white/5 px-3 py-3 text-sm font-semibold sm:px-4">
                        <input name="intereses" value={interest} type="checkbox" className="h-4 w-4 accent-brand-primary" />
                        {interest}
                      </label>
                    ))}
                  </div>
                </div>
                <label className="space-y-2 md:col-span-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">{t.labels.pain}</span>
                  <textarea name="dolor" rows={4} className="w-full resize-none rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder="Examples: slow quoting, disconnected inventory, manual purchasing, duplicate data..." />
                </label>
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full py-5" disabled={submitState === 'submitting'} data-mkt="diagnostic_form_submit" data-mkt-category="LEAD">
                    {submitState === 'submitting' ? formStatus.sending : t.labels.submit} <ArrowRight size={18} />
                  </Button>
                  {submitState === 'sent' && (
                    <p className="mt-3 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-center text-sm font-semibold text-emerald-100">
                      {formStatus.sent}
                    </p>
                  )}
                  {submitState === 'error' && (
                    <p className="mt-3 rounded-lg border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-center text-sm font-semibold text-amber-100">
                      {formStatus.error}
                    </p>
                  )}
                  <p className="mt-3 text-center text-xs text-brand-white/45">{t.labels.note}</p>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

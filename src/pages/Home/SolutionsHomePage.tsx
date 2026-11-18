import { useState, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/src/app/config/branding.config';
import { submitMarketingLead, trackMarketingEvent } from '@/src/lib/marketingCapture';
import './solutions-home.css';

const products = [
  { name: 'InmoPub', type: 'INMOBILIARIAS', title: 'Tu catálogo inmobiliario, siempre listo para compartir.', detail: 'Publicá propiedades y convertí el interés en consultas concretas.', image: '/assets/images/solutions/inmopub-illustration.webp', color: '#93D4E9' },
  { name: 'UrbanPub', type: 'DESARROLLADORES', title: 'Cada desarrollo, presentado a su altura.', detail: 'Mostrá unidades, avances y documentación en un solo lugar.', image: '/assets/images/solutions/urbanpub-illustration.webp', color: '#CDDF9D' },
  { name: 'DiceCommerce', type: 'COMERCIO', title: 'De tu catálogo al pedido, sin vueltas.', detail: 'Mostrá productos y recibí pedidos online.', image: '/assets/images/solutions/dicecommerce-illustration.webp', color: '#F6C49F' },
  { name: 'DiceServices', type: 'SERVICIOS', title: 'Hacé visible lo que hacés.', detail: 'Presentá tus servicios y recibí mejores consultas.', image: '/assets/images/solutions/diceservices-illustration.webp', color: '#B9C2F2' },
  { name: 'CaseFlow', type: 'GESTIÓN', title: 'Cada expediente, bajo control.', detail: 'Seguí cada trámite desde el ingreso hasta la resolución.', image: '/assets/images/solutions/caseflow-illustration.webp', color: '#EEC1D0' },
  { name: 'DiceHealth', type: 'SALUD', title: 'Una agenda más clara para todos.', detail: 'Organizá profesionales, especialidades y reservas de pacientes.', image: '/assets/images/solutions/dicehealth-illustration.webp', color: '#ABE1CE' },
  { name: 'DiceAgenda', type: 'TURNOS', title: 'Menos espera. Más turnos resueltos.', detail: 'Ofrecé reservas online para atención, trámites y servicios.', image: '/assets/images/solutions/diceagenda-illustration.webp', color: '#DEC6ED' },
  { name: 'DiCeFlow', type: 'AUTOMATIZACIÓN', title: 'Tus sistemas empiezan a trabajar juntos.', detail: 'Conectá datos y tareas para reducir trabajo manual.', image: '/assets/images/solutions/diceflow-illustration.webp', color: '#EFDBA3' },
  { name: 'ComparaPrecios API', type: 'DATOS', title: 'Precios comparables, dentro de tu sistema.', detail: 'Integrá búsquedas de productos y precios de supermercados.', image: '/assets/images/solutions/comparaprecios-illustration.webp', color: '#ACD9E9' },
  { name: 'ComparaRepuestos API', type: 'DATOS', title: 'Encontrá el repuesto y compará opciones.', detail: 'Integrá búsquedas de autopartes y ofertas comerciales.', image: '/assets/images/solutions/compararepuestos-illustration.webp', color: '#CED8AB' },
];

export default function SolutionsHomePage() {
  const [active, setActive] = useState(0);
  const [inquiryProduct, setInquiryProduct] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const product = products[active];
  const move = (direction: number) => setActive((current) => (current + direction + products.length) % products.length);
  const mail = (subject: string) => `mailto:${BRAND.contact.email}?subject=${encodeURIComponent(subject)}`;
  const inquire = (name: string) => {
    setInquiryProduct(name);
    setFormState('idle');
    window.setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }), 0);
  };
  const sendInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const fullName = String(data.get('nombre') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('telefono') || '').trim();
    const message = String(data.get('mensaje') || '').trim();
    const selectedProduct = inquiryProduct || 'Consulta general';
    setFormState('sending');
    try {
      await submitMarketingLead({
        fullName, email, phone, message: `Solución: ${selectedProduct}\n\n${message}`,
        actionCode: 'solution_showroom_inquiry',
        consent: true,
        metadata: { form: 'solution_showroom', product: selectedProduct, language: 'es' },
      });
      void trackMarketingEvent({ eventType: 'CONVERSION', actionCode: 'solution_showroom_inquiry', category: 'LEAD', metadata: { product: selectedProduct } });
      setFormState('sent');
      formElement.reset();
    } catch {
      setFormState('error');
      const subject = encodeURIComponent(`Consulta DiceProjects: ${selectedProduct}`);
      const body = encodeURIComponent(`Nombre: ${fullName}\nEmail: ${email}\nTeléfono: ${phone}\nSolución: ${selectedProduct}\n\n${message}`);
      window.location.href = `mailto:${BRAND.contact.email}?subject=${subject}&body=${body}`;
    }
  };

  return <div className="min-h-screen bg-[#F7F8F6] text-brand-dark">
    <header className="relative z-20 border-b border-brand-dark/10 bg-white text-brand-dark">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#inicio" aria-label="Dice Projects - Inicio"><img src="/assets/logos/dice-logo-lineal-header.svg" alt="Dice Projects" className="h-11 w-auto sm:h-12" /></a>
        <a href="#soluciones" className="hidden text-sm font-medium text-brand-dark/70 hover:text-brand-primary sm:block">Explorar soluciones</a>
        <a href="#contacto" className="rounded-full border border-brand-dark/30 px-5 py-2 text-sm font-semibold hover:border-brand-primary hover:bg-brand-primary hover:text-white">Hablemos <ArrowUpRight className="ml-1 inline" size={15} /></a>
      </div>
    </header>

    <main>
      <section id="inicio" className="relative isolate flex items-center overflow-hidden bg-brand-dark text-white" style={{ minHeight: 460 }}>
        <img src="/assets/images/enterprise-operations-hero.webp" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(90deg, rgba(25,31,38,.96) 0%, rgba(25,31,38,.82) 43%, rgba(25,31,38,.28) 100%)' }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 lg:px-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#9BD3F1]">Software para lo que hacés</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-[68px]">Una solución para cada forma de <span className="text-[#9BD3F1]">avanzar.</span></h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">Herramientas para mostrar lo que ofrecés, atender mejor y hacer que tu operación fluya.</p>
          <a href="#soluciones" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#93D4E9] px-6 py-4 font-semibold text-[#17242D] hover:bg-white">Conocé las soluciones <ArrowDown size={19} /></a>
        </div>
      </section>

      <section id="soluciones" className="scroll-mt-6 py-16 md:py-20" aria-label="Soluciones DiceProjects">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-primary">Lo que podemos hacer por vos</p><h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">Explorá nuestras soluciones<span className="text-brand-primary">.</span></h2></div>
            <p className="max-w-sm text-base leading-relaxed text-brand-dark/65">Elegí la que se parece a tu desafío. Nosotros te ayudamos a llevarla a tu negocio.</p>
          </div>

          <div onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }}>
            <div className="grid min-h-[520px] overflow-hidden rounded-[2rem] bg-[#252B31] text-white shadow-2xl md:grid-cols-2">
              <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
                <div className="flex items-center gap-4"><span className="text-5xl font-light" style={{ color: product.color }}>{String(active + 1).padStart(2, '0')}</span><span className="h-px w-8 bg-white/35" /><span className="text-xs font-bold tracking-[0.22em] text-white/65">{product.type}</span></div>
                <div className="my-12" aria-live="polite"><p className="mb-4 text-sm text-white/55">{product.name}</p><h3 className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">{product.title}</h3><p className="mt-6 max-w-md leading-relaxed text-white/65">{product.detail}</p></div>
                <button type="button" onClick={() => inquire(product.name)} className="inline-flex w-fit items-center gap-2 border-b pb-2 text-left text-sm font-semibold hover:gap-4" style={{ borderColor: product.color }}>Consultar por {product.name} <ArrowUpRight size={18} /></button>
              </div>
              <div className="relative min-h-[340px] overflow-hidden" style={{ backgroundColor: product.color }}>
                <img key={product.image} src={`${product.image}?v=2`} alt={`Ilustración de ${product.name}`} className="showroom-image absolute inset-0 h-full w-full object-cover" />
                <span className="absolute bottom-5 right-5 rounded-full bg-[#252B31]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">Ilustración conceptual</span>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between gap-6"><span className="text-sm font-bold tabular-nums">{String(active + 1).padStart(2, '0')} <span className="font-normal text-brand-dark/40">/ {String(products.length).padStart(2, '0')}</span></span><div className="flex gap-3"><button type="button" onClick={() => move(-1)} aria-label="Solución anterior" className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-dark/20 hover:bg-brand-dark hover:text-white"><ArrowLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="Siguiente solución" className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark text-white hover:bg-brand-primary"><ArrowRight size={20} /></button></div></div>
            <div className="mt-8 flex flex-wrap gap-2" aria-label="Elegir solución">{products.map((item, index) => <button key={item.name} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`rounded-full border px-3 py-2 text-xs font-medium transition ${active === index ? 'border-brand-dark bg-brand-dark text-white' : 'border-brand-dark/15 text-brand-dark/65 hover:border-brand-dark'}`}>{item.name}</button>)}</div>
          </div>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-8 bg-[#DDEAF0] py-20 md:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-10"><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-brand-primary">El próximo paso</p><h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">¿Cuál de estas soluciones encaja con tu idea?</h2><p className="mt-6 max-w-md text-brand-dark/65">Contanos qué necesitás y te ayudamos a encontrar el mejor camino.</p></div><form onSubmit={sendInquiry} className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-xl sm:grid-cols-2 sm:p-8"><div className="sm:col-span-2"><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">Tu consulta</p><p className="mt-2 text-2xl font-semibold">{inquiryProduct || 'Hablemos de tu proyecto'}</p></div><label className="text-sm font-medium">Nombre<input name="nombre" required className="mt-2 w-full rounded-xl border border-brand-dark/15 p-3 outline-none focus:border-brand-primary" /></label><label className="text-sm font-medium">Email<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-brand-dark/15 p-3 outline-none focus:border-brand-primary" /></label><label className="text-sm font-medium sm:col-span-2">Teléfono (opcional)<input name="telefono" className="mt-2 w-full rounded-xl border border-brand-dark/15 p-3 outline-none focus:border-brand-primary" /></label><label className="text-sm font-medium sm:col-span-2">¿Qué necesitás?<textarea name="mensaje" rows={3} required className="mt-2 w-full resize-y rounded-xl border border-brand-dark/15 p-3 outline-none focus:border-brand-primary" /></label><button type="submit" disabled={formState === 'sending'} className="flex items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-4 font-semibold text-white hover:bg-brand-primary disabled:opacity-60 sm:col-span-2">{formState === 'sending' ? 'Enviando...' : 'Enviar consulta'} <ArrowUpRight size={18} /></button>{formState === 'sent' && <p role="status" className="text-sm font-semibold text-green-700 sm:col-span-2">Recibimos tu consulta. Te vamos a contactar.</p>}{formState === 'error' && <p role="alert" className="text-sm text-amber-800 sm:col-span-2">No pudimos registrar la consulta. Abrimos un email con tus datos como respaldo.</p>}</form></div></section>
    </main>
    <footer className="bg-brand-dark px-6 py-8 text-sm text-white/55 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row"><span>© {new Date().getFullYear()} DiceProjects</span><a href={mail('Consulta a DiceProjects')} className="hover:text-white">{BRAND.contact.email}</a></div></footer>
  </div>;
}

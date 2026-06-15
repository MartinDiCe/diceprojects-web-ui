import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CalendarCheck, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Container, Button, SectionHeader } from '@/src/components/common';
import { BRAND } from '@/src/app/config/branding.config';
import { Seo, organizationJsonLd } from '@/src/components/seo/Seo';

const interests = [
  'Ventas y cotizaciones',
  'Productos / catálogo web',
  'Stock y movimientos',
  'Compras y proveedores',
  'Eventos web / leads',
  'Obras y proyectos',
  'Servicios integrales',
  'Proyectos integrales',
  'Copiloto AI empresarial',
  'Integraciones API / BD',
];

export default function ContactoPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const selectedInterests = form.getAll('intereses').join(', ') || 'Sin especificar';
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
        title="Diagnóstico de automatización y mejora de procesos"
        description="Solicitá un diagnóstico comercial para detectar oportunidades de automatización, integraciones, software operativo y copiloto AI empresarial."
        path="/contacto"
        keywords={['diagnóstico de automatización', 'consultoría de procesos', 'mejora de procesos empresariales', 'automatización de operaciones']}
        jsonLd={organizationJsonLd()}
      />
      <section className="bg-brand-dark pb-14 pt-28 text-brand-white md:pb-16 md:pt-32">
        <Container>
          <div className="max-w-5xl space-y-6 md:space-y-7">
            <span className="inline-flex rounded-full border border-brand-white/15 bg-brand-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-white/75 sm:px-4 sm:text-[11px]">
              Diagnóstico ejecutivo
            </span>
            <h1 className="text-3xl font-medium leading-tight sm:text-4xl md:text-6xl md:leading-none">Hablemos de dónde tu operación pierde tiempo, margen y control.</h1>
            <p className="max-w-3xl text-base leading-relaxed text-brand-white/65 sm:text-lg md:text-xl">
              Contanos qué procesos querés ordenar. Te respondemos con una ruta comercial clara: quick wins, alcance, módulos, integraciones y próximos pasos.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-8 lg:col-span-5 lg:space-y-10">
              <SectionHeader subtitle="Contacto directo" title="Una conversación bien hecha vale más que diez demos genéricas." />
              <div className="space-y-5">
                <a href={`mailto:${BRAND.contact.email}`} className="flex items-center gap-4 rounded-lg border border-brand-dark/10 p-4 transition hover:border-brand-primary">
                  <Mail className="text-brand-primary" size={24} />
                  <div>
                    <p className="text-xs font-bold uppercase text-brand-dark/45">Email</p>
                    <p className="break-all font-bold text-brand-dark">{BRAND.contact.email}</p>
                  </div>
                </a>
                <a href={BRAND.contact.phoneUrl} className="flex items-center gap-4 rounded-lg border border-brand-dark/10 p-4 transition hover:border-brand-primary">
                  <Phone className="text-brand-primary" size={24} />
                  <div>
                    <p className="text-xs font-bold uppercase text-brand-dark/45">Teléfono</p>
                    <p className="font-bold text-brand-dark">{BRAND.contact.phone}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-lg border border-brand-dark/10 p-4">
                  <MapPin className="text-brand-primary" size={24} />
                  <div>
                    <p className="text-xs font-bold uppercase text-brand-dark/45">Base</p>
                    <p className="font-bold text-brand-dark">Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-lg bg-brand-light p-6">
                  <ShieldCheck className="text-brand-primary" size={30} />
                  <h3 className="mt-4 text-lg font-bold leading-tight text-brand-dark">Confidencialidad desde el primer contacto</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">
                    Podemos hablar de procesos, sistemas, costos y problemas operativos con criterio profesional.
                  </p>
                </div>
                <div className="rounded-lg border border-brand-dark/10 p-6">
                  <CalendarCheck className="text-brand-primary" size={30} />
                  <h3 className="mt-4 text-lg font-bold leading-tight text-brand-dark">Brief útil para venta</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">
                    El formulario ordena el lead como diagnóstico: necesidad, rubro, prioridad, módulos e impacto buscado.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-brand-dark p-5 text-brand-white shadow-2xl sm:p-6 md:p-10 lg:col-span-7"
            >
              <h2 className="text-3xl font-bold leading-tight">Agendar diagnóstico</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-white/55">
                Dejanos el contexto mínimo y armamos una primera lectura de módulos, quick wins e integraciones posibles.
              </p>
              <form className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-5" onSubmit={handleSubmit}>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Nombre</span>
                  <input name="nombre" required className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder="Tu nombre" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Empresa</span>
                  <input name="empresa" required className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder="Nombre de empresa" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Email corporativo</span>
                  <input name="email" type="email" required className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder="nombre@empresa.com" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Teléfono / WhatsApp</span>
                  <input name="telefono" className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder="+54..." />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Rubro</span>
                  <select name="rubro" className="w-full rounded-lg border border-brand-white/15 bg-brand-dark px-4 py-3 text-base outline-none transition focus:border-brand-primary">
                    <option>Comercial / distribución</option>
                    <option>Servicios integrales</option>
                    <option>Construcción / obras</option>
                    <option>Automotores / posventa</option>
                    <option>Industria</option>
                    <option>Otro</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Tamaño aproximado</span>
                  <select name="tamano" className="w-full rounded-lg border border-brand-white/15 bg-brand-dark px-4 py-3 text-base outline-none transition focus:border-brand-primary">
                    <option>1 a 10 personas</option>
                    <option>11 a 50 personas</option>
                    <option>51 a 200 personas</option>
                    <option>Más de 200 personas</option>
                  </select>
                </label>
                <label className="space-y-2 md:col-span-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Prioridad</span>
                  <select name="prioridad" className="w-full rounded-lg border border-brand-white/15 bg-brand-dark px-4 py-3 text-base outline-none transition focus:border-brand-primary">
                    <option>Necesito ordenar y vender mejor</option>
                    <option>Necesito automatizar procesos manuales</option>
                    <option>Necesito integrar sistemas y datos</option>
                    <option>Necesito copiloto AI con documentos/APIs/BD</option>
                    <option>Estoy evaluando una transformación completa</option>
                  </select>
                </label>
                <div className="md:col-span-2">
                  <p className="mb-3 text-xs font-bold uppercase text-brand-white/45">Qué querés resolver</p>
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
                  <span className="text-xs font-bold uppercase text-brand-white/45">Principal dolor operativo</span>
                  <textarea name="dolor" rows={4} className="w-full resize-none rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 text-base outline-none transition focus:border-brand-primary" placeholder="Ej: presupuestos lentos, compras sin trazabilidad, stock desordenado, eventos web sin seguimiento, datos duplicados..." />
                </label>
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full py-5">
                    Generar lead y enviar solicitud <ArrowRight size={18} />
                  </Button>
                  <p className="mt-3 text-center text-xs text-brand-white/45">
                    Hoy se envía por email prellenado. Está listo para conectar con CRM/backoffice cuando activemos el endpoint.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}

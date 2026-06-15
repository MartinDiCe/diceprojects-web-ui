import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Container, Button, SectionHeader } from '@/src/components/common';
import { BRAND } from '@/src/app/config/branding.config';

const interests = [
  'Obras y proyectos',
  'Servicios integrales',
  'Productos / ecommerce',
  'Presupuestos y cotizaciones',
  'Integraciones',
  'Copiloto AI empresarial',
];

export default function ContactoPage() {
  React.useEffect(() => {
    document.title = 'Diagnóstico comercial | Dice Projects';
  }, []);

  return (
    <div className="bg-brand-white pb-28">
      <section className="bg-brand-dark pb-20 pt-36 text-brand-white">
        <Container>
          <div className="max-w-5xl space-y-7">
            <span className="inline-flex rounded-full border border-brand-white/15 bg-brand-white/10 px-4 py-2 text-[11px] font-bold uppercase text-brand-white/75">
              Diagnóstico ejecutivo
            </span>
            <h1 className="text-5xl font-medium leading-none md:text-7xl">Hablemos de dónde tu operación pierde tiempo, margen y control.</h1>
            <p className="max-w-3xl text-xl leading-relaxed text-brand-white/65">
              Contanos qué procesos querés ordenar. Te respondemos con una ruta comercial clara: quick wins, alcance, módulos, integraciones y próximos pasos.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-5">
              <SectionHeader subtitle="Contacto directo" title="Una conversación bien hecha vale más que diez demos genéricas." />
              <div className="space-y-5">
                <a href={`mailto:${BRAND.contact.email}`} className="flex items-center gap-4 rounded-lg border border-brand-dark/10 p-4 transition hover:border-brand-primary">
                  <Mail className="text-brand-primary" size={24} />
                  <div>
                    <p className="text-xs font-bold uppercase text-brand-dark/45">Email</p>
                    <p className="font-bold text-brand-dark">{BRAND.contact.email}</p>
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
              <div className="rounded-lg bg-brand-light p-6">
                <ShieldCheck className="text-brand-primary" size={30} />
                <h3 className="mt-4 text-lg font-bold text-brand-dark">Confidencialidad desde el primer contacto</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">
                  Podemos hablar de procesos, sistemas, costos y problemas operativos con criterio profesional. La información sensible se trata como confidencial.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-brand-dark p-6 text-brand-white shadow-2xl md:p-10 lg:col-span-7"
            >
              <h2 className="text-3xl font-bold leading-tight">Solicitar diagnóstico</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-white/55">
                El formulario queda preparado para conectar con CRM, email o automatización. Mientras tanto, podés usarlo como brief comercial del lead.
              </p>
              <form className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Nombre</span>
                  <input className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 outline-none transition focus:border-brand-primary" placeholder="Tu nombre" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Empresa</span>
                  <input className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 outline-none transition focus:border-brand-primary" placeholder="Nombre de empresa" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Email corporativo</span>
                  <input type="email" className="w-full rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 outline-none transition focus:border-brand-primary" placeholder="nombre@empresa.com" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Rubro</span>
                  <select className="w-full rounded-lg border border-brand-white/15 bg-brand-dark px-4 py-3 outline-none transition focus:border-brand-primary">
                    <option>Construcción / obras</option>
                    <option>Servicios integrales</option>
                    <option>Comercial / distribución</option>
                    <option>Industria</option>
                    <option>Otro</option>
                  </select>
                </label>
                <div className="md:col-span-2">
                  <p className="mb-3 text-xs font-bold uppercase text-brand-white/45">Qué querés resolver</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {interests.map((interest) => (
                      <label key={interest} className="flex items-center gap-3 rounded-lg border border-brand-white/10 bg-brand-white/5 px-4 py-3 text-sm font-semibold">
                        <input type="checkbox" className="h-4 w-4 accent-brand-primary" />
                        {interest}
                      </label>
                    ))}
                  </div>
                </div>
                <label className="space-y-2 md:col-span-2">
                  <span className="text-xs font-bold uppercase text-brand-white/45">Principal dolor operativo</span>
                  <textarea rows={5} className="w-full resize-none rounded-lg border border-brand-white/15 bg-brand-white/8 px-4 py-3 outline-none transition focus:border-brand-primary" placeholder="Ej: presupuestos lentos, compras sin trazabilidad, obras sin costo real, datos duplicados..." />
                </label>
                <div className="md:col-span-2">
                  <Button className="w-full py-5">
                    Enviar solicitud <ArrowRight size={18} />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}

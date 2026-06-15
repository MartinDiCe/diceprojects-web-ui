import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Network,
  Rocket,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '@/src/components/common';
import { Seo, organizationJsonLd, serviceJsonLd } from '@/src/components/seo/Seo';

const offers = [
  {
    title: 'Diagnóstico de automatización',
    label: 'Entrada recomendada',
    copy: 'Detectamos fugas de eficiencia, tareas manuales, sistemas desconectados y oportunidades de ROI operativo.',
    points: ['Mapa de procesos y fricción', 'Roadmap priorizado', 'Estimación de impacto', 'Plan de implementación'],
  },
  {
    title: 'Implementación de núcleo operativo',
    label: 'Solución principal',
    copy: 'Configuramos la plataforma para operar obras, servicios, productos, compras, ventas, cotizaciones y dashboards.',
    points: ['Módulos por rubro', 'Roles y permisos', 'Dashboards ejecutivos', 'Automatizaciones iniciales'],
    featured: true,
  },
  {
    title: 'Copiloto e integraciones AI',
    label: 'Acelerador',
    copy: 'Conectamos documentos, APIs, bases y conocimiento para que agentes empresariales respondan con datos reales.',
    points: ['Drive, SharePoint, S3', 'APIs y bases externas', 'Memoria por tenant', 'Control de costos y permisos'],
  },
];

const useCases = [
  { icon: Building2, title: 'Constructoras y obras', copy: 'Control de avances, recursos, certificaciones, costos, compras y trazabilidad por proyecto.' },
  { icon: Workflow, title: 'Servicios integrales', copy: 'Ordená solicitudes, ejecución, aprobaciones, mantenimiento, soporte y reportes al cliente.' },
  { icon: FileSpreadsheet, title: 'Ventas y presupuestos', copy: 'Cotizaciones, comparativas de proveedores, propuestas, aprobaciones y seguimiento comercial.' },
  { icon: Database, title: 'Productos y operación web', copy: 'Catálogos, precios, stock, publicación, compras y canales comerciales conectados.' },
  { icon: Network, title: 'Integraciones empresariales', copy: 'Conectamos ERPs, CRMs, bases, documentos, portales, APIs internas y sistemas heredados.' },
  { icon: Bot, title: 'Copiloto agente empresarial', copy: 'Agentes que entienden módulos, documentos, KPIs, permisos y preguntas de negocio.' },
];

export default function ServiciosPage() {
  React.useEffect(() => {
    document.title = 'Solución empresarial | Dice Projects';
  }, []);

  return (
    <div className="bg-brand-white pb-28">
      <Seo
        title="Solución empresarial para automatización, integraciones y copiloto AI"
        description="Implementamos una solución empresarial para obras, servicios, productos, cotizaciones, compras, integraciones, KPIs y copiloto AI por empresa."
        path="/automatizacion-y-orquestacion"
        keywords={['solución empresarial', 'automatización empresarial', 'software multirubro', 'integraciones empresariales', 'copiloto empresarial']}
        jsonLd={[organizationJsonLd(), serviceJsonLd('Solución empresarial Dice Projects', 'Automatización, plataforma operativa, integraciones y copiloto AI para empresas multirubro.', '/automatizacion-y-orquestacion')]}
      />
      <section className="relative overflow-hidden bg-brand-dark pb-20 pt-36 text-brand-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(56,126,188,0.42),transparent_34%)]" />
        <Container className="relative z-10">
          <div className="max-w-5xl space-y-7">
            <span className="inline-flex rounded-full border border-brand-white/15 bg-brand-white/10 px-4 py-2 text-[11px] font-bold uppercase text-brand-white/75">
              Automatización + plataforma + AI
            </span>
            <h1 className="text-5xl font-medium leading-none md:text-7xl">Una solución para operar, vender y decidir con control.</h1>
            <p className="max-w-3xl text-xl leading-relaxed text-brand-white/65">
              Dice Projects combina consultoría de procesos, implementación de plataforma e integraciones inteligentes para empresas que necesitan crecer sin aumentar caos, planillas ni retrabajo.
            </p>
            <Link to="/contacto" className="inline-flex">
              <Button size="lg">
                Quiero una propuesta <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader align="center" subtitle="Paquetes comerciales" title="Tres formas de empezar y escalar." />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {offers.map((offer) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-lg border p-8 ${offer.featured ? 'border-brand-primary bg-brand-dark text-brand-white shadow-2xl shadow-brand-primary/20' : 'border-brand-dark/10 bg-brand-white'}`}
              >
                <p className={`text-xs font-bold uppercase ${offer.featured ? 'text-brand-primary' : 'text-brand-dark/45'}`}>{offer.label}</p>
                <h2 className="mt-4 text-2xl font-bold leading-tight">{offer.title}</h2>
                <p className={`mt-5 text-sm leading-relaxed ${offer.featured ? 'text-brand-white/62' : 'text-brand-dark/62'}`}>{offer.copy}</p>
                <ul className="mt-8 space-y-3">
                  {offer.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm font-semibold">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-brand-primary" size={18} />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-24">
        <Container>
          <SectionHeader subtitle="Casos de uso" title="Diseñado para empresas que ejecutan procesos complejos todos los días." />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <div key={item.title} className="rounded-lg bg-brand-white p-7">
                <item.icon className="text-brand-primary" size={30} />
                <h3 className="mt-5 text-xl font-bold text-brand-dark">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">{item.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeader subtitle="Cómo se implementa" title="Primero ordenamos. Después automatizamos. Luego escalamos." />
            <p className="text-lg leading-relaxed text-brand-dark/60">
              No prometemos magia. Trabajamos con procesos, permisos, datos e integraciones. La AI entra donde agrega valor: buscar, resumir, asistir, detectar desvíos y acelerar decisiones.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3">
              {[
                ['01', 'Mapa operativo', 'Entendemos áreas, sistemas, datos, dolores y prioridades comerciales.'],
                ['02', 'Diseño de solución', 'Definimos módulos, automatizaciones, integraciones, permisos y KPIs.'],
                ['03', 'Implementación', 'Configuramos plataforma, cargamos maestros, conectamos APIs/documentos y entrenamos usuarios.'],
                ['04', 'Evolución', 'Medimos adopción, costos, ROI, nuevas reglas y oportunidades de automatización.'],
              ].map(([num, title, copy]) => (
                <div key={num} className="grid grid-cols-[72px_1fr] gap-5 rounded-lg border border-brand-dark/10 p-5">
                  <span className="text-3xl font-bold text-brand-primary">{num}</span>
                  <div>
                    <h3 className="font-bold text-brand-dark">{title}</h3>
                    <p className="mt-1 text-sm text-brand-dark/58">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-primary py-20 text-brand-white">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <Rocket size={34} />
            <h2 className="mt-6 text-4xl font-medium leading-tight md:text-5xl">Si tu operación ya depende de planillas, mensajes y memoria humana, hay dinero escapándose.</h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link to="/contacto">
              <Button variant="secondary" size="lg" className="bg-brand-white text-brand-primary hover:bg-brand-light">
                Agendar diagnóstico
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

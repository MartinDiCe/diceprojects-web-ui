import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Bot,
  Boxes,
  Building2,
  CheckCircle2,
  FileCheck2,
  GitBranch,
  LineChart,
  PlugZap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '@/src/components/common';

const operatingSystems = [
  { icon: Building2, title: 'Obras y servicios', copy: 'Avances, recursos, costos, partes, aprobaciones y seguimiento por cliente.' },
  { icon: FileCheck2, title: 'Presupuestos y cotizaciones', copy: 'Solicitudes, comparativas, propuestas, compras y trazabilidad comercial.' },
  { icon: Boxes, title: 'Productos web', copy: 'Catálogos, precios, stock, canales de publicación y operación multirubro.' },
  { icon: PlugZap, title: 'Integraciones', copy: 'APIs, bases, Drive, SharePoint, ERPs y sistemas existentes trabajando como uno solo.' },
];

const outcomes = [
  'Menos tareas manuales y menos retrabajo',
  'Información única entre áreas y sistemas',
  'Decisiones con KPIs reales, no con intuición',
  'Copiloto empresarial con permisos y contexto',
  'Operación preparada para crecer sin perder control',
];

const platformModules = [
  'Proyectos y obras',
  'Compras y proveedores',
  'Ventas y cotizaciones',
  'Productos, stock y canales',
  'Dashboards ejecutivos',
  'Copiloto AI por empresa',
  'Integraciones API/BD/documentos',
  'Automatización de flujos',
];

export default function HomePage() {
  React.useEffect(() => {
    document.title = 'Dice Projects | Automatización, procesos y copiloto empresarial';
  }, []);

  return (
    <div className="overflow-hidden bg-brand-white">
      <section className="relative overflow-hidden bg-brand-dark text-brand-white lg:min-h-[92svh]">
        <div className="absolute inset-0 opacity-45">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_20%,rgba(56,126,188,0.46),transparent_34%),linear-gradient(135deg,rgba(37,41,47,0.96),rgba(18,25,35,0.92))]" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
        </div>

        <div className="absolute inset-x-0 bottom-0 top-24 hidden overflow-hidden lg:block" aria-hidden="true">
          <div className="absolute right-[-5%] top-10 w-[62%] rotate-[-2deg] rounded-2xl border border-brand-white/10 bg-brand-white/10 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-xl bg-brand-white p-5 text-brand-dark shadow-2xl">
              <div className="mb-5 flex items-center justify-between border-b border-brand-dark/10 pb-4">
                <div className="flex items-center gap-3">
                  <img src="/assets/logos/dice-isologo.svg" alt="" className="h-10 w-10" />
                  <div>
                    <p className="text-sm font-bold">Centro de operación</p>
                    <p className="text-xs text-brand-dark/50">Obras, ventas, compras, productos e AI</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Online</span>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {['Margen', 'Cotizaciones', 'Obras'].map((label, index) => (
                      <div key={label} className="rounded-lg border border-brand-dark/10 p-4">
                        <p className="text-xs text-brand-dark/45">{label}</p>
                        <p className="mt-2 text-2xl font-bold text-brand-dark">{['28%', '142', '37'][index]}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-brand-dark/10 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase text-brand-dark/50">Flujo automatizado</p>
                      <GitBranch className="text-brand-primary" size={18} />
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                      {['Pedido', 'Cotización', 'Aprobación', 'Ejecución'].map((step) => (
                        <div key={step} className="rounded-md bg-brand-light px-2 py-3">{step}</div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-brand-dark p-4 text-brand-white">
                    <div className="flex items-start gap-3">
                      <Bot className="mt-1 text-brand-primary" size={20} />
                      <div>
                        <p className="text-sm font-bold">Copiloto empresarial</p>
                        <p className="mt-1 text-xs text-brand-white/55">Consulta documentos, APIs y KPIs con permisos por usuario y empresa.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 space-y-3">
                  {platformModules.slice(0, 6).map((module) => (
                    <div key={module} className="rounded-lg border border-brand-dark/10 px-3 py-2 text-xs font-semibold text-brand-dark/70">
                      {module}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Container className="relative z-10 flex items-start pb-10 pt-28 lg:min-h-[92svh] lg:items-center lg:pb-16 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl space-y-6 lg:space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-brand-white/15 bg-brand-white/10 px-4 py-2 text-[11px] font-bold uppercase text-brand-white/80 backdrop-blur">
              <Sparkles size={14} className="text-brand-primary" />
              Automatización, procesos y copiloto AI para empresas reales
            </div>
            <h1 className="max-w-5xl text-4xl font-medium leading-none text-brand-white md:text-7xl lg:text-8xl">
              Dice Projects
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-white/72 md:text-2xl">
              Convertimos operaciones dispersas en un sistema inteligente: obras, servicios, productos, cotizaciones, integraciones, KPIs y agentes empresariales trabajando sobre la misma verdad.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/contacto">
                <Button size="lg" className="w-full px-8 sm:w-auto">
                  Pedir diagnóstico comercial <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/automatizacion-y-orquestacion">
                <Button variant="outline" size="lg" className="w-full border-brand-white/40 px-8 text-brand-white hover:border-brand-white hover:bg-brand-white hover:text-brand-dark sm:w-auto">
                  Ver solución
                </Button>
              </Link>
            </div>
            <div className="hidden max-w-3xl grid-cols-1 gap-3 pt-2 text-sm text-brand-white/70 sm:grid sm:grid-cols-3 lg:pt-6">
              {['Multiempresa', 'Multirubro', 'Con AI y permisos'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-primary" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-brand-white py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader subtitle="El problema que resolvemos" title="Tu empresa no necesita más planillas. Necesita una operación conectada." />
              <p className="text-lg leading-relaxed text-brand-dark/60">
                Cuando ventas, compras, obra, stock y administración trabajan en sistemas separados, cada decisión llega tarde. Dice Projects ordena el proceso y automatiza el trabajo crítico para que el crecimiento no dependa de perseguir información.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-7">
              {operatingSystems.map((item) => (
                <div key={item.title} className="rounded-lg border border-brand-dark/10 bg-brand-light/60 p-6">
                  <item.icon className="mb-5 text-brand-primary" size={28} />
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-24">
        <Container>
          <SectionHeader align="center" subtitle="La solución" title="Una plataforma operativa más un equipo que la implementa." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: 'Gobierno operativo', copy: 'Roles, permisos, trazabilidad, auditoría y procesos claros para operar con control.' },
              { icon: PlugZap, title: 'Automatización e integraciones', copy: 'Conectamos APIs, bases, documentos y sistemas existentes para eliminar doble carga.' },
              { icon: Bot, title: 'Copiloto empresarial', copy: 'Agentes que consultan documentos, datos, KPIs y módulos con contexto de empresa y usuario.' },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-brand-white p-8 shadow-sm">
                <item.icon className="text-brand-primary" size={30} />
                <h3 className="mt-6 text-xl font-bold text-brand-dark">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-brand-dark/62">{item.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-dark py-24 text-brand-white">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader subtitle="Qué vendemos" title="No es un backoffice. Es el sistema nervioso de tu operación." light />
            <p className="text-lg leading-relaxed text-brand-white/60">
              Implementamos un núcleo operativo adaptable a empresas de construcción, servicios integrales, distribución, comercio, industrias livianas y equipos que venden, compran, ejecutan y reportan todos los días.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {platformModules.map((module) => (
              <div key={module} className="rounded-lg border border-brand-white/10 bg-brand-white/5 px-4 py-3 text-sm font-bold text-brand-white/80">
                {module}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-white py-24">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeader subtitle="Impacto comercial" title="La promesa es simple: vender mejor, ejecutar mejor y medir mejor." />
            <ul className="space-y-4">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-base font-semibold text-brand-dark/75">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand-primary" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-brand-dark/10 bg-brand-light p-8">
            <LineChart className="text-brand-primary" size={34} />
            <h3 className="mt-6 text-3xl font-bold leading-tight text-brand-dark">Diagnóstico de 7 días para detectar dónde se pierde dinero.</h3>
            <p className="mt-4 text-brand-dark/62">
              Mapeamos procesos, sistemas, retrabajo, reportes, decisiones y oportunidades de automatización. Terminás con roadmap de implementación, prioridades y estimación de ROI operativo.
            </p>
            <Link to="/contacto" className="mt-8 inline-flex">
              <Button>Agendar diagnóstico <ArrowRight size={16} /></Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Megaphone,
  Network,
  Package,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Workflow,
  Warehouse,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '@/src/components/common';
import { Seo, organizationJsonLd, serviceJsonLd } from '@/src/components/seo/Seo';

const offers = [
  {
    title: 'Blueprint operativo',
    label: 'Estrategia inicial',
    copy: 'Mapeamos áreas, sistemas, datos, permisos, procesos críticos y oportunidades de monetización operativa.',
    points: ['Mapa de procesos y módulos', 'Roadmap de implementación', 'Estimación de ROI', 'Prioridad por impacto comercial'],
  },
  {
    title: 'Implementación de plataforma',
    label: 'Solución principal',
    copy: 'Configuramos el sistema operativo de negocio: módulos, roles, catálogos, dashboards, flujos y operación multiempresa.',
    points: ['Módulos por dominio', 'Roles y permisos', 'Dashboards ejecutivos', 'Automatizaciones iniciales'],
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
  { icon: Building2, title: 'Organización comercial', copy: 'Empresas, vendedores, clientes, proveedores, contactos, direcciones y alcances.' },
  { icon: ShoppingCart, title: 'Ventas y cotizaciones', copy: 'Cotizaciones, propuestas, PDF, links públicos, WhatsApp, clientes y seguimiento.' },
  { icon: FileSpreadsheet, title: 'Compras y proveedores', copy: 'Solicitudes de presupuesto, comparativas, respuestas, adjudicación y evidencia.' },
  { icon: Package, title: 'Productos y catálogo', copy: 'Artículos, precios, imágenes, atributos, marcas, canales, publicación y reglas.' },
  { icon: Warehouse, title: 'Stock y almacenes', copy: 'Depósitos, movimientos, disponibilidad, reservas, operaciones y reposición.' },
  { icon: Workflow, title: 'Proyectos y servicios', copy: 'Obras, proyectos integrales, recursos, templates, costos, avances y desvíos.' },
  { icon: Megaphone, title: 'Marketing y demanda', copy: 'Leads, formularios, campañas, embudos, cupones, destacados y señales comerciales.' },
  { icon: ShieldCheck, title: 'Seguridad y gobierno', copy: 'Usuarios, roles, permisos, auditoría, API traces, notificaciones y trazabilidad.' },
  { icon: Network, title: 'Integraciones empresariales', copy: 'APIs, bases, documentos, Drive, SharePoint, S3, ERPs, CRMs y sistemas heredados.' },
  { icon: Bot, title: 'Copiloto agente empresarial', copy: 'Agentes que entienden módulos, documentos, KPIs, permisos y preguntas de negocio.' },
  { icon: Database, title: 'Configuración e infraestructura', copy: 'Parámetros, nativos, numeradores, feature flags, servicios y health checks.' },
  { icon: Building2, title: 'Multirubro y multiempresa', copy: 'Un mismo núcleo para operar distintas unidades, empresas, vendedores y rubros.' },
];

const operationalScenarios = [
  ['Producto con carrito consultivo', 'Catálogo web, carrito, solicitud de cotización, asignación a vendedor y link inteligente para aprobación del cliente.'],
  ['Eventos de navegación y demanda', 'Captura de visitas, formularios, campañas, productos vistos, origen del lead y señales para seguimiento comercial.'],
  ['Stock y movimientos', 'Depósitos, entradas, salidas, reservas, ajustes, disponibilidad y reposición conectadas con ventas y compras.'],
  ['Compras a múltiples proveedores', 'Solicitud de presupuesto simultánea, recepción de respuestas, comparativa de costos, plazos y adjudicación.'],
  ['Obras y proyectos técnicos', 'Presupuestos, recursos, avances, certificaciones, costos, responsables, documentación y desvíos.'],
  ['Proyectos integrales privados', 'Automotores, servicios integrales, instalaciones, mantenimiento, entregas o posventa con templates e hitos.'],
  ['Gestión comercial completa', 'Clientes, vendedores, prospectos, cotizaciones, propuestas, seguimiento, WhatsApp, PDF y links públicos.'],
  ['Copiloto y agentes especializados', 'Agentes para documentos, APIs, bases, KPIs, compras, ventas y proyectos con permisos por empresa y usuario.'],
];

export default function ServiciosPage() {
  return (
    <div className="bg-brand-white pb-20 md:pb-28">
      <Seo
        title="Catálogo de servicios y plataforma empresarial multirubro"
        description="Implementamos una plataforma empresarial para organización, productos, ventas, compras, stock, proyectos, marketing, seguridad, integraciones, KPIs y copiloto AI."
        path="/automatizacion-y-orquestacion"
        keywords={['plataforma empresarial', 'software multirubro', 'automatización empresarial', 'sistema operativo de negocio', 'integraciones empresariales', 'copiloto empresarial']}
        jsonLd={[organizationJsonLd(), serviceJsonLd('Plataforma empresarial Dice Projects', 'Sistema operativo de negocio con módulos operativos, automatización, integraciones y copiloto AI para empresas multirubro.', '/automatizacion-y-orquestacion')]}
      />
      <section className="relative overflow-hidden bg-brand-dark pb-16 pt-28 text-brand-white md:pb-20 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(56,126,188,0.42),transparent_34%)]" />
        <Container className="relative z-10">
          <div className="max-w-5xl space-y-6 md:space-y-7">
            <span className="inline-flex max-w-full rounded-full border border-brand-white/15 bg-brand-white/10 px-3 py-2 text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] text-brand-white/75 sm:px-4 sm:text-[11px]">
              Plataforma + automatización + inteligencia empresarial
            </span>
            <h1 className="text-3xl font-medium leading-tight sm:text-4xl md:text-6xl md:leading-none lg:text-7xl">Un catálogo completo para digitalizar la operación de una empresa.</h1>
            <p className="max-w-3xl text-base leading-relaxed text-brand-white/65 sm:text-lg md:text-xl">
              Dice Projects combina plataforma, consultoría de procesos, integraciones e inteligencia artificial para ordenar áreas comerciales, operativas, administrativas y ejecutivas sin encerrar el producto en un único rubro.
            </p>
            <Link to="/contacto" className="inline-flex w-full sm:w-auto">
              <Button size="lg">
                Quiero una propuesta <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeader align="center" subtitle="Oferta comercial" title="Paquetes claros para vender estrategia, plataforma e inteligencia." />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {offers.map((offer) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-lg border p-6 md:p-8 ${offer.featured ? 'border-brand-primary bg-brand-dark text-brand-white shadow-2xl shadow-brand-primary/20' : 'border-brand-dark/10 bg-brand-white'}`}
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

      <section className="bg-brand-light py-16 md:py-20 lg:py-24">
        <Container>
          <SectionHeader subtitle="Catálogo funcional" title="Dominios del producto, listos para empaquetar por necesidad del cliente." />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item) => (
              <div key={item.title} className="rounded-lg bg-brand-white p-5 md:p-7">
                <item.icon className="text-brand-primary" size={26} />
                <h3 className="mt-4 text-lg font-bold text-brand-dark md:mt-5 md:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">{item.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <Container>
          <SectionHeader
            subtitle="Ejemplos de negocio"
            title="Flujos reales que se pueden activar, combinar y escalar."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {operationalScenarios.map(([title, copy], index) => (
              <div key={title} className="grid grid-cols-[44px_1fr] gap-4 rounded-lg border border-brand-dark/10 bg-brand-white p-4 sm:grid-cols-[56px_1fr] sm:gap-5 sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-xs font-bold text-brand-primary sm:h-12 sm:w-12 sm:text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeader subtitle="Cómo se implementa" title="Del diagnóstico al sistema operativo de negocio." />
            <p className="text-base leading-relaxed text-brand-dark/60 md:text-lg">
              No prometemos magia. Diseñamos un producto operativo por etapas: base de datos confiable, módulos correctos, permisos, automatizaciones, integraciones, reporting y copilotos donde agregan valor real.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3">
              {[
                ['01', 'Blueprint de producto', 'Traducimos el negocio a módulos, datos maestros, permisos, integraciones y quick wins.'],
                ['02', 'Configuración de plataforma', 'Activamos organización, productos, ventas, compras, stock, proyectos, marketing o AI según prioridad.'],
                ['03', 'Automatización e integración', 'Conectamos APIs, documentos, bases y flujos para eliminar doble carga y acelerar decisiones.'],
                ['04', 'Adopción y crecimiento', 'Medimos uso, ROI, costos AI, reglas nuevas, mejoras y oportunidades comerciales.'],
              ].map(([num, title, copy]) => (
                <div key={num} className="grid grid-cols-[48px_1fr] gap-4 rounded-lg border border-brand-dark/10 p-4 sm:grid-cols-[72px_1fr] sm:gap-5 sm:p-5">
                  <span className="text-2xl font-bold text-brand-primary sm:text-3xl">{num}</span>
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

      <section className="bg-brand-primary py-16 text-brand-white md:py-20">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <Rocket size={34} />
            <h2 className="mt-6 text-3xl font-medium leading-tight md:text-5xl">Si tu operación depende de planillas, mensajes y memoria humana, tu empresa está pagando un impuesto invisible.</h2>
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

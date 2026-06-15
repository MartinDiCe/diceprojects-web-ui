import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Activity,
  BarChart3,
  Bell,
  Bot,
  Boxes,
  Building2,
  CheckCircle2,
  Database,
  FileCheck2,
  GitBranch,
  LineChart,
  Megaphone,
  MousePointerClick,
  PlugZap,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '@/src/components/common';
import { Seo, organizationJsonLd, serviceJsonLd } from '@/src/components/seo/Seo';

const productCatalog = [
  { icon: Building2, title: 'Organización multiempresa', copy: 'Empresas, vendedores, clientes, proveedores, contactos, direcciones y alcances por operación.' },
  { icon: Users, title: 'Personas y responsables', copy: 'Personal interno, cargos, responsables operativos y datos de contacto por empresa.' },
  { icon: Boxes, title: 'Productos y catálogo web', copy: 'Artículos, precios, imágenes, atributos, marcas, estados, canales y publicación comercial.' },
  { icon: FileCheck2, title: 'Ventas y cotizaciones', copy: 'Cotizaciones, propuestas, clientes, PDF, link público, WhatsApp y seguimiento comercial.' },
  { icon: PlugZap, title: 'Compras y proveedores', copy: 'Solicitudes de presupuesto, comparativas, respuestas proveedor, adjudicación y trazabilidad.' },
  { icon: Building2, title: 'Proyectos y servicios', copy: 'Obras, proyectos integrales, recursos, templates, presupuestos, avances, costos y desvíos.' },
  { icon: Warehouse, title: 'Almacenes y stock', copy: 'Depósitos, movimientos, disponibilidad, reservas, operaciones y reposición.' },
  { icon: Megaphone, title: 'Marketing y demanda', copy: 'Prospectos, formularios, campañas, embudos, cupones, destacados y señales de producto.' },
  { icon: Bell, title: 'Notificaciones', copy: 'Campana, email, push, plantillas, variables, perfiles de envío y logs.' },
  { icon: ShieldCheck, title: 'Seguridad y auditoría', copy: 'Usuarios, roles, permisos, invitaciones, auditoría, API traces y gobierno de acceso.' },
  { icon: Database, title: 'Configuración e infraestructura', copy: 'Parámetros, catálogos nativos, numeradores, feature flags, servicios y health checks.' },
  { icon: Bot, title: 'AI Orchestrator', copy: 'Copiloto, agentes, memoria, knowledge, documentos, APIs, bases, métricas y control de costos.' },
];

const outcomes = [
  'Menos tareas manuales y menos retrabajo',
  'Información única entre áreas y sistemas',
  'Decisiones con KPIs reales, no con intuición',
  'Copiloto empresarial con permisos y contexto',
  'Operación preparada para crecer sin perder control',
];

const platformModules = [
  'CRM operativo y organización',
  'Ventas, presupuestos y compras',
  'Productos, stock y canales',
  'Proyectos, servicios y ejecución',
  'Marketing, leads y campañas',
  'Notificaciones y trazabilidad',
  'Dashboards ejecutivos',
  'Copiloto AI por empresa',
  'Integraciones API/BD/documentos',
  'Seguridad, auditoría y permisos',
];

const businessExamples = [
  {
    icon: ShoppingCart,
    title: 'Producto web con carrito consultivo',
    copy: 'Un cliente arma un carrito, pide cotización y el sistema deriva la solicitud al vendedor correcto. El vendedor responde con una propuesta y un link inteligente para que el cliente apruebe, rechace o pida cambios.',
    steps: ['Catálogo', 'Carrito', 'Vendedor', 'Link de aprobación'],
  },
  {
    icon: MousePointerClick,
    title: 'Eventos y comportamiento digital',
    copy: 'Registramos visitas, consultas, formularios, productos vistos, señales de interés, campañas y origen del lead para saber qué hace cada cliente en la web y alimentar acciones comerciales.',
    steps: ['Evento', 'Lead', 'Campaña', 'Acción comercial'],
  },
  {
    icon: Warehouse,
    title: 'Stock, depósitos y movimientos',
    copy: 'Manejamos existencias por depósito, entradas, salidas, reservas, ajustes, reposición y trazabilidad para que ventas y compras trabajen con disponibilidad real.',
    steps: ['Depósito', 'Movimiento', 'Reserva', 'Reposición'],
  },
  {
    icon: Send,
    title: 'Compra inteligente a proveedores',
    copy: 'Cuando falta mercadería o se necesita costear una operación, generamos solicitudes de presupuesto a varios proveedores, comparamos respuestas y adjudicamos por mejor costo, plazo o condición.',
    steps: ['Solicitud', 'Proveedores', 'Comparativa', 'Adjudicación'],
  },
  {
    icon: Building2,
    title: 'Obras y proyectos con desvíos',
    copy: 'Controlamos recursos, presupuestos, avances, certificaciones, costos, partes y desvíos para constructoras, mantenimiento, instalaciones o servicios técnicos.',
    steps: ['Presupuesto', 'Recursos', 'Avance', 'Certificación'],
  },
  {
    icon: Truck,
    title: 'Proyectos integrales multirubro',
    copy: 'Armamos flujos para automotores, servicios privados, instalaciones, entregas, posventa o mantenimiento: templates, responsables, recursos, hitos, costos y documentación.',
    steps: ['Template', 'Responsable', 'Hitos', 'Entrega'],
  },
  {
    icon: BarChart3,
    title: 'KPIs ejecutivos y rentabilidad',
    copy: 'Unimos ventas, compras, stock, proyectos, marketing y costos para medir margen, conversión, tiempos, oportunidades abiertas, cumplimiento y rentabilidad por empresa o unidad.',
    steps: ['Datos', 'KPIs', 'Alertas', 'Decisión'],
  },
  {
    icon: Bot,
    title: 'Copiloto empresarial con contexto',
    copy: 'El asistente consulta documentos, APIs, bases, proyectos, clientes y métricas respetando permisos. Puede derivar al agente correcto para compras, ventas, documentos, datos o proyectos.',
    steps: ['Pregunta', 'Permisos', 'Agente', 'Respuesta'],
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-brand-white">
      <Seo
        title="Plataforma empresarial multirubro para automatización, operación y copiloto AI"
        description="Dice Projects centraliza ventas, compras, productos, proyectos, servicios, stock, marketing, integraciones, KPIs y copiloto AI en una plataforma operativa multirubro."
        path="/"
        keywords={['plataforma empresarial multirubro', 'automatización de procesos', 'software operativo empresarial', 'cotizaciones empresariales', 'integraciones API', 'copiloto AI empresarial', 'gestión de productos y stock']}
        jsonLd={[
          organizationJsonLd(),
          serviceJsonLd('Automatización de procesos empresariales y copiloto AI', 'Solución para automatizar operaciones, integrar sistemas y asistir decisiones con agentes AI empresariales.', '/'),
        ]}
      />
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
                    <p className="text-sm font-bold">Sistema operativo empresarial</p>
                    <p className="text-xs text-brand-dark/50">Ventas, compras, productos, proyectos, stock, marketing e AI</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Online</span>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {['Margen', 'Cotizaciones', 'Stock'].map((label, index) => (
                      <div key={label} className="rounded-lg border border-brand-dark/10 p-4">
                        <p className="text-xs text-brand-dark/45">{label}</p>
                        <p className="mt-2 text-2xl font-bold text-brand-dark">{['28%', '142', '98%'][index]}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-brand-dark/10 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase text-brand-dark/50">Flujo automatizado</p>
                      <GitBranch className="text-brand-primary" size={18} />
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                      {['Lead', 'Cotización', 'Compra', 'Entrega'].map((step) => (
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
              Sistema operativo empresarial para vender, comprar, ejecutar y medir
            </div>
            <h1 className="max-w-5xl text-4xl font-medium leading-none text-brand-white md:text-7xl lg:text-8xl">
              Dice Projects
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-white/72 md:text-2xl">
              Convertimos áreas dispersas en una plataforma inteligente: CRM operativo, productos, ventas, compras, stock, proyectos, marketing, integraciones, KPIs y agentes empresariales trabajando sobre la misma verdad.
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
              <SectionHeader subtitle="Catálogo de producto" title="Una plataforma modular para operar empresas multirubro." />
              <p className="text-lg leading-relaxed text-brand-dark/60">
                No vendemos una pantalla administrativa. Vendemos un sistema operativo de negocio: módulos conectados, datos gobernados, automatización de flujos, reporting ejecutivo y copilotos por empresa.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 lg:col-span-7">
              {productCatalog.map((item) => (
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

      <section className="bg-brand-white py-24">
        <Container>
          <SectionHeader
            align="center"
            subtitle="Ejemplos de negocio"
            title="Casos concretos que la plataforma puede resolver desde el backoffice."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {businessExamples.map((item) => (
              <div key={item.title} className="flex min-h-full flex-col rounded-lg border border-brand-dark/10 bg-brand-light/50 p-6">
                <item.icon className="text-brand-primary" size={30} />
                <h3 className="mt-5 text-xl font-bold leading-tight text-brand-dark">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-dark/62">{item.copy}</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {item.steps.map((step) => (
                    <span key={step} className="rounded-md bg-brand-white px-3 py-2 text-xs font-bold text-brand-dark/70">
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-lg bg-brand-dark p-8 text-brand-white">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <h3 className="text-3xl font-bold leading-tight">La diferencia está en conectar el flujo completo, no en cargar más datos.</h3>
                <p className="mt-4 text-brand-white/62">
                  El valor aparece cuando un evento web crea una oportunidad, una cotización dispara compras, una compra actualiza costos, el stock impacta ventas y los KPIs muestran rentabilidad sin perseguir planillas.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link to="/automatizacion-y-orquestacion">
                  <Button>Ver catálogo completo <ArrowRight size={16} /></Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-24">
        <Container>
          <SectionHeader align="center" subtitle="Arquitectura de valor" title="Producto, automatización e inteligencia en una misma propuesta." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { icon: Activity, title: 'Módulos operativos', copy: 'Ventas, compras, stock, productos, proyectos, marketing, personas y organización funcionando conectados.' },
              { icon: ShieldCheck, title: 'Gobierno y trazabilidad', copy: 'Roles, permisos, auditoría, multiempresa, alcance por vendedor y control de datos sensibles.' },
              { icon: PlugZap, title: 'Automatización e integraciones', copy: 'APIs, bases, documentos y sistemas existentes conectados para eliminar doble carga.' },
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
            <SectionHeader subtitle="Qué vendemos" title="No es un backoffice. Es una plataforma de operación e inteligencia." light />
            <p className="text-lg leading-relaxed text-brand-white/60">
              Implementamos un núcleo adaptable a empresas de servicios, comercio, distribución, industria liviana, construcción, mantenimiento, operaciones técnicas y equipos que venden, compran, ejecutan, comunican y reportan todos los días.
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

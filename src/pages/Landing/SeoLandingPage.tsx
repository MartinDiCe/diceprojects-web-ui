import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '@/src/components/common';
import { Seo, organizationJsonLd, serviceJsonLd } from '@/src/components/seo/Seo';

type LandingKey = 'plataforma' | 'automatizacion' | 'comercial' | 'productos' | 'stock' | 'marketing' | 'obras' | 'cotizaciones' | 'integraciones' | 'copiloto';

const pages: Record<LandingKey, {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  keywords: string[];
  bullets: string[];
  sections: Array<{ title: string; copy: string }>;
}> = {
  plataforma: {
    path: '/plataforma-empresarial-multirubro',
    title: 'Plataforma empresarial multirubro',
    description: 'Plataforma empresarial multirubro para centralizar organización, ventas, compras, productos, stock, proyectos, marketing, KPIs, integraciones y copiloto AI.',
    eyebrow: 'Sistema operativo de negocio',
    h1: 'Una plataforma empresarial para operar distintos rubros con una misma arquitectura.',
    intro: 'Dice Projects permite activar módulos según necesidad: organización comercial, productos, ventas, compras, stock, proyectos, marketing, notificaciones, auditoría, integraciones y AI.',
    keywords: ['plataforma empresarial multirubro', 'software operativo empresarial', 'sistema operativo de negocio', 'software multiempresa', 'plataforma de gestión empresarial'],
    bullets: ['Multiempresa y multivendedor', 'Módulos activables', 'Permisos y auditoría', 'Dashboards ejecutivos', 'Copiloto AI e integraciones'],
    sections: [
      { title: 'Arquitectura modular', copy: 'Activá solo lo que el cliente necesita hoy y escalá hacia nuevos módulos sin rediseñar todo.' },
      { title: 'Dato único', copy: 'Clientes, proveedores, vendedores, productos y procesos conectados para evitar decisiones con información duplicada.' },
      { title: 'Producto más servicio', copy: 'No entregamos software vacío: implementamos procesos, configuración, integraciones y adopción.' },
    ],
  },
  automatizacion: {
    path: '/automatizacion-de-procesos',
    title: 'Automatización de procesos empresariales',
    description: 'Automatización de procesos empresariales para reducir tareas manuales, integrar sistemas, ordenar flujos de trabajo y medir KPIs operativos.',
    eyebrow: 'Automatización empresarial',
    h1: 'Automatización de procesos para empresas que necesitan crecer sin sumar caos.',
    intro: 'Detectamos tareas repetitivas, aprobaciones lentas, doble carga y datos dispersos. Después diseñamos flujos automatizados con control, permisos e indicadores.',
    keywords: ['automatización de procesos', 'automatización empresarial', 'mejora de procesos', 'workflow empresarial', 'software de procesos'],
    bullets: ['Menos carga manual', 'Aprobaciones trazables', 'Datos conectados', 'KPIs de operación', 'Flujos por rol y permiso'],
    sections: [
      { title: 'Procesos antes que tecnología', copy: 'No automatizamos desorden. Primero simplificamos el flujo, definimos responsables y eliminamos pasos que no agregan valor.' },
      { title: 'Integración real', copy: 'Conectamos APIs, bases, documentos y sistemas existentes para que la información viaje sin copiar y pegar.' },
      { title: 'ROI operativo', copy: 'Priorizamos automatizaciones por impacto: tiempo ahorrado, errores evitados, margen recuperado y velocidad comercial.' },
    ],
  },
  obras: {
    path: '/software-gestion-obras-servicios',
    title: 'Software para gestión de obras y servicios integrales',
    description: 'Sistema para gestionar obras, servicios integrales, avances, recursos, costos, compras, aprobaciones y reportes por proyecto.',
    eyebrow: 'Obras y servicios',
    h1: 'Gestión de obras y servicios con control de avances, costos y ejecución.',
    intro: 'Dice Projects ordena la operación diaria de proyectos, obras y servicios: desde recursos y compras hasta reportes, presupuestos y trazabilidad por cliente.',
    keywords: ['software para obras', 'gestión de obras', 'servicios integrales', 'control de avances de obra', 'sistema para constructoras'],
    bullets: ['Avances y recursos', 'Costos por proyecto', 'Compras y proveedores', 'Reportes al cliente', 'Dashboards por obra'],
    sections: [
      { title: 'Una vista por proyecto', copy: 'Centralizá tareas, costos, recursos, documentos, hitos y responsables para operar con una sola versión de la verdad.' },
      { title: 'Compras conectadas a ejecución', copy: 'Relacioná necesidades de obra con solicitudes, cotizaciones, proveedores y aprobaciones.' },
      { title: 'Control ejecutivo', copy: 'Dashboards para ver desvíos, avance, margen, pendientes y decisiones que requieren acción.' },
    ],
  },
  cotizaciones: {
    path: '/presupuestos-cotizaciones-compras',
    title: 'Presupuestos, cotizaciones y compras empresariales',
    description: 'Solución para presupuestos, cotizaciones, comparativas de proveedores, compras y propuestas comerciales con trazabilidad.',
    eyebrow: 'Cotizaciones y compras',
    h1: 'Presupuestos y cotizaciones más rápidos, comparables y trazables.',
    intro: 'Reducí tiempos comerciales y compras desordenadas con solicitudes, comparativas, aprobaciones, proveedores y propuestas conectadas al flujo real.',
    keywords: ['software de cotizaciones', 'presupuestos empresariales', 'comparativa de proveedores', 'gestión de compras', 'cotizaciones online'],
    bullets: ['Solicitudes ordenadas', 'Comparativas de proveedores', 'Aprobaciones', 'Propuestas comerciales', 'Trazabilidad completa'],
    sections: [
      { title: 'Del pedido a la decisión', copy: 'Convertí requerimientos en cotizaciones comparables y aprobaciones con historial.' },
      { title: 'Menos errores comerciales', copy: 'Estandarizá condiciones, precios, estados y documentación asociada.' },
      { title: 'Compras con evidencia', copy: 'Dejá registro de cada proveedor, valor, fecha, decisión y motivo.' },
    ],
  },
  comercial: {
    path: '/gestion-comercial-crm-operativo',
    title: 'Gestión comercial y CRM operativo',
    description: 'Gestión comercial con clientes, vendedores, prospectos, cotizaciones, campañas, seguimiento, propuestas y dashboards comerciales.',
    eyebrow: 'Gestión comercial',
    h1: 'Un CRM operativo conectado con cotizaciones, productos, compras y marketing.',
    intro: 'Ordená clientes, vendedores, prospectos, campañas, cotizaciones y propuestas para que el equipo comercial venda con información real.',
    keywords: ['CRM operativo', 'gestión comercial', 'software comercial', 'seguimiento de clientes', 'cotizaciones y ventas'],
    bullets: ['Clientes y vendedores', 'Prospectos y campañas', 'Cotizaciones', 'Propuestas y links', 'Dashboards comerciales'],
    sections: [
      { title: 'De lead a propuesta', copy: 'El flujo conecta formularios, campañas, prospectos, cliente, cotización y seguimiento.' },
      { title: 'Vendedores con alcance', copy: 'Multiempresa, multivendedor o vendedor único, con permisos y visibilidad correcta.' },
      { title: 'Datos comerciales accionables', copy: 'Medí embudo, cotizaciones, señales de producto y oportunidades pendientes.' },
    ],
  },
  productos: {
    path: '/gestion-productos-catalogo-web',
    title: 'Gestión de productos y catálogo web',
    description: 'Gestión de productos, catálogo web, precios, imágenes, atributos, marcas, canales de publicación, importación y reglas comerciales.',
    eyebrow: 'Productos y catálogo',
    h1: 'Catálogo de productos listo para vender, publicar, cotizar y controlar.',
    intro: 'Centralizá artículos, SKU, precios, imágenes, atributos, estados, marcas, unidades, canales e importación masiva.',
    keywords: ['gestión de productos', 'catálogo web', 'software de productos', 'publicación de productos', 'importación de catálogo'],
    bullets: ['Artículos y SKU', 'Precios e imágenes', 'Atributos y marcas', 'Canales de publicación', 'Importación masiva'],
    sections: [
      { title: 'Catálogo gobernado', copy: 'Un solo lugar para mantener productos comerciales, estados, atributos y reglas.' },
      { title: 'Listo para cotizar y publicar', copy: 'El catálogo alimenta ventas, marketing, stock, canales web y procesos comerciales.' },
      { title: 'Carga masiva', copy: 'Templates e importación para altas y actualizaciones sin fricción.' },
    ],
  },
  stock: {
    path: '/gestion-stock-almacenes-inventario',
    title: 'Gestión de stock, almacenes e inventario',
    description: 'Gestión de stock, depósitos, movimientos, reservas, operaciones de almacén, disponibilidad e inventario conectado con productos, ventas y compras.',
    eyebrow: 'Almacenes e inventario',
    h1: 'Stock y almacenes conectados con ventas, compras y productos.',
    intro: 'Controlá depósitos, movimientos, disponibilidad, reservas, ajustes, operaciones y reposición con trazabilidad operativa.',
    keywords: ['gestión de stock', 'software de almacenes', 'control de inventario', 'movimientos de stock', 'depósitos y reservas'],
    bullets: ['Depósitos', 'Movimientos', 'Disponibilidad', 'Reservas', 'Reposición'],
    sections: [
      { title: 'Disponibilidad confiable', copy: 'Ventas y compras operan con stock real, no con planillas atrasadas.' },
      { title: 'Movimientos trazables', copy: 'Entradas, salidas, ajustes y transferencias con motivo e historial.' },
      { title: 'Operación por empresa', copy: 'Depósitos y stock por empresa o vendedor según el modelo comercial.' },
    ],
  },
  marketing: {
    path: '/marketing-leads-campanas-embudos',
    title: 'Marketing, leads, campañas y embudos',
    description: 'Marketing operativo con prospectos, formularios públicos, campañas, embudos, cupones, destacados, señales de producto y derivación a ventas.',
    eyebrow: 'Marketing operativo',
    h1: 'Capturá demanda, medí señales y conectá marketing con ventas.',
    intro: 'Formularios, prospectos, campañas, embudos, cupones, productos destacados y señales comerciales conectadas al flujo de cotización.',
    keywords: ['marketing operativo', 'gestión de leads', 'formularios comerciales', 'campañas y embudos', 'prospectos y cotizaciones'],
    bullets: ['Prospectos', 'Formularios', 'Campañas', 'Embudo', 'Derivación a ventas'],
    sections: [
      { title: 'Captura multicanal', copy: 'Formularios públicos, QR, campañas y productos destacados para convertir interés en oportunidades.' },
      { title: 'Seguimiento real', copy: 'Cada prospecto queda asociado a empresa, vendedor, campaña, producto y estado.' },
      { title: 'Ventas conectadas', copy: 'Cuando el lead está listo, se transforma en cotización sin perder contexto.' },
    ],
  },
  integraciones: {
    path: '/integraciones-apis-bases-documentos',
    title: 'Integraciones con APIs, bases de datos y documentos',
    description: 'Integraciones empresariales con APIs, bases de datos, Google Drive, SharePoint, S3, documentos y sistemas internos.',
    eyebrow: 'Integraciones empresariales',
    h1: 'Conectamos tus sistemas para que la operación deje de depender de copiar y pegar.',
    intro: 'Integramos APIs, bases, documentos, ERPs, CRMs y herramientas existentes para construir procesos continuos, medibles y seguros.',
    keywords: ['integraciones API', 'integración de sistemas', 'conectar bases de datos', 'integración SharePoint Drive', 'automatización con APIs'],
    bullets: ['APIs REST', 'Bases SQL', 'Drive y SharePoint', 'S3 y documentos', 'Permisos por tenant'],
    sections: [
      { title: 'Datos donde ya viven', copy: 'No obligamos a tirar sistemas existentes. Los conectamos para que trabajen dentro del flujo operativo.' },
      { title: 'Seguridad y permisos', copy: 'Separación por empresa, usuario y alcance para evitar mezclar información sensible.' },
      { title: 'Automatización continua', copy: 'Los conectores alimentan procesos, dashboards y copilotos empresariales con contexto real.' },
    ],
  },
  copiloto: {
    path: '/copiloto-ai-empresarial',
    title: 'Copiloto AI empresarial para procesos, datos y documentos',
    description: 'Copiloto AI empresarial con agentes, documentos, APIs, bases, KPIs, memoria por empresa y permisos por usuario.',
    eyebrow: 'Copiloto AI empresarial',
    h1: 'Un copiloto empresarial que entiende tus procesos, documentos, datos y permisos.',
    intro: 'Configuramos agentes para consultar manuales, fuentes documentales, APIs, bases y KPIs sin mezclar empresas ni exponer información fuera de permiso.',
    keywords: ['copiloto empresarial', 'agentes AI para empresas', 'asistente empresarial con IA', 'AI para procesos', 'chat empresarial con datos'],
    bullets: ['Agentes por dominio', 'Documentos indexados', 'APIs y bases', 'Memoria por tenant', 'Control de costo AI'],
    sections: [
      { title: 'AI con contexto de negocio', copy: 'El copiloto no responde genérico: usa módulos, manuales, reglas, documentos y datos autorizados.' },
      { title: 'Privacidad por empresa y usuario', copy: 'La memoria y fuentes se separan por tenant, usuario, conversación y proyecto.' },
      { title: 'De preguntas a acciones', copy: 'Primero consulta y resume. Luego puede asistir en borradores, reportes, KPIs y acciones confirmadas.' },
    ],
  },
};

export default function SeoLandingPage({ page }: { page: LandingKey }) {
  const content = pages[page];

  React.useEffect(() => {
    document.title = `${content.title} | Dice Projects`;
  }, [content.title]);

  return (
    <div className="bg-brand-white">
      <Seo
        title={content.title}
        description={content.description}
        path={content.path}
        keywords={content.keywords}
        jsonLd={[organizationJsonLd(), serviceJsonLd(content.title, content.description, content.path)]}
      />
      <section className="bg-brand-dark pb-20 pt-36 text-brand-white">
        <Container>
          <div className="max-w-5xl space-y-7">
            <span className="inline-flex rounded-full border border-brand-white/15 bg-brand-white/10 px-4 py-2 text-[11px] font-bold uppercase text-brand-white/75">
              {content.eyebrow}
            </span>
            <h1 className="text-5xl font-medium leading-none md:text-7xl">{content.h1}</h1>
            <p className="max-w-3xl text-xl leading-relaxed text-brand-white/65">{content.intro}</p>
            <Link to="/contacto" className="inline-flex">
              <Button size="lg">Solicitar diagnóstico <ArrowRight size={18} /></Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader subtitle="Qué logramos" title="Resultados buscados por empresas que necesitan operar mejor." />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
            {content.bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-3 rounded-lg border border-brand-dark/10 bg-brand-light/50 p-4 font-bold text-brand-dark/75">
                <CheckCircle2 className="text-brand-primary" size={20} />
                {bullet}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {content.sections.map((section) => (
              <article key={section.title} className="rounded-lg bg-brand-white p-7">
                <h2 className="text-2xl font-bold text-brand-dark">{section.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-dark/60">{section.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-primary py-16 text-brand-white">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="text-4xl font-medium leading-tight">Transformá este problema en un roadmap ejecutable.</h2>
            <p className="mt-4 text-brand-white/78">Te mostramos prioridades, quick wins, integración necesaria y propuesta de implementación.</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link to="/contacto">
              <Button variant="secondary" size="lg" className="bg-brand-white text-brand-primary hover:bg-brand-light">
                Agendar llamada
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

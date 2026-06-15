import React from 'react';

export type Language = 'es' | 'en';

const STORAGE_KEY = 'diceprojects-language';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = React.createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'en' ? 'en' : 'es';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>(getInitialLanguage);

  const setLanguage = React.useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === 'es' ? 'en' : 'es'),
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export const copy = {
  es: {
    nav: {
      home: 'Inicio',
      solution: 'Solución',
      method: 'Método',
      insights: 'Insights',
      about: 'Sobre',
      contact: 'Contacto',
      cta: 'Agendar diagnóstico',
      menu: 'Menú',
      switch: 'English',
    },
    footer: {
      statement: 'Plataforma, automatización e inteligencia para ordenar operaciones y vender mejor.',
      legal: 'Legal y transparencia',
      solutions: 'Soluciones',
      contact: 'Contacto',
      diagnostic: 'Diagnóstico',
      rights: 'Todos los derechos reservados.',
      line: 'Producto empresarial • Automatización • Copiloto AI',
      links: [
        'Plataforma empresarial',
        'Automatización de procesos',
        'Gestión comercial',
        'Productos y catálogo',
        'Stock y almacenes',
        'Marketing y leads',
        'Presupuestos y cotizaciones',
        'Proyectos y servicios',
        'Integraciones empresariales',
        'Copiloto AI empresarial',
      ],
    },
    home: {
      seoTitle: 'Plataforma empresarial multirubro para automatización, operación y copiloto AI',
      seoDescription: 'Dice Projects centraliza ventas, compras, productos, proyectos, servicios, stock, marketing, integraciones, KPIs y copiloto AI en una plataforma operativa multirubro.',
      eyebrow: 'Enterprise operations platform',
      h1: 'Operación conectada. Decisiones con datos. AI lista para trabajar.',
      intro: 'Centralizá ventas, compras, productos, stock, proyectos, marketing e integraciones en una misma plataforma. Sumá copilotos que entienden tu negocio y respetan permisos.',
      primary: 'Agendar diagnóstico',
      secondary: 'Ver solución',
      proof: ['Multiempresa', 'Procesos trazables', 'AI con contexto'],
      catalogTitle: 'Una plataforma modular para operar mejor.',
      catalogIntro: 'Activá los módulos que tu empresa necesita hoy y escalá hacia automatización, reporting e inteligencia empresarial sin rediseñar todo.',
      catalog: [
        ['Ventas y cotizaciones', 'Carritos consultivos, propuestas, links de aprobación y seguimiento comercial.'],
        ['Compras y proveedores', 'Solicitudes simultáneas, comparativas, adjudicación y trazabilidad de costos.'],
        ['Productos y stock', 'Catálogo, precios, depósitos, movimientos, reservas y disponibilidad real.'],
        ['Proyectos y servicios', 'Obras, servicios integrales, hitos, recursos, costos, avances y desvíos.'],
        ['Marketing y demanda', 'Leads, campañas, formularios, eventos web y señales de interés.'],
        ['AI Orchestrator', 'Agentes, documentos, APIs, bases, KPIs, memoria y control de costos.'],
      ],
      workflowsTitle: 'Flujos de negocio, no pantallas sueltas.',
      workflows: [
        ['Carrito a cotización', 'El cliente arma una solicitud, el vendedor responde y el link inteligente registra aprobación, rechazo o cambios.'],
        ['Compra inteligente', 'Si falta mercadería, pedís presupuesto a varios proveedores y adjudicás por costo, plazo o condición.'],
        ['Eventos web a venta', 'La web captura intereses, campañas y productos vistos para accionar sobre leads reales.'],
        ['Proyecto a rentabilidad', 'Seguís recursos, avances, costos, certificaciones y KPIs por empresa o unidad.'],
      ],
      aiTitle: 'Bot para sitios web conectado al backoffice.',
      aiCopy: 'Podés convertir el chat en un asesor público: responde preguntas del sitio, explica servicios, captura leads y deriva oportunidades al backoffice con contexto.',
      aiBullets: ['Responde como vendedor consultivo', 'Usa contenido aprobado del sitio', 'Crea leads y conversaciones', 'Escala a humano cuando corresponde'],
      impactTitle: 'Menos fricción. Más margen. Mejor control.',
      impact: ['Menos tareas manuales', 'Dato único entre áreas', 'Trazabilidad y permisos', 'KPIs accionables', 'AI con gobierno'],
    },
    services: {
      seoTitle: 'Catálogo de servicios y plataforma empresarial multirubro',
      seoDescription: 'Implementamos una plataforma empresarial para organización, productos, ventas, compras, stock, proyectos, marketing, seguridad, integraciones, KPIs y copiloto AI.',
      eyebrow: 'Product + automation + AI',
      h1: 'Diseñamos el sistema operativo de tu negocio.',
      intro: 'Combinamos plataforma, consultoría e integraciones para ordenar operación, automatizar flujos y crear inteligencia aplicable.',
      cta: 'Quiero una propuesta',
      offersTitle: 'Tres formas de empezar.',
      offers: [
        ['Blueprint operativo', 'Mapa de procesos, módulos, datos, permisos, ROI y quick wins.'],
        ['Implementación de plataforma', 'Configuración de módulos, roles, catálogos, dashboards y flujos.'],
        ['Copiloto e integraciones AI', 'Documentos, APIs, bases, conocimiento, agentes y control de costos.'],
      ],
      examplesTitle: 'Casos que se pueden activar.',
      examples: [
        ['Producto con carrito consultivo', 'Catálogo, solicitud, vendedor asignado y link de aprobación.'],
        ['Stock y compras', 'Reposición, proveedores, comparativas y adjudicación.'],
        ['Proyectos integrales', 'Servicios, automotores, instalaciones, mantenimiento y posventa.'],
        ['Copiloto de negocio', 'Agentes para documentos, datos, KPIs, ventas, compras y proyectos.'],
      ],
      implementationTitle: 'Implementación clara.',
      steps: [
        ['01', 'Diagnóstico', 'Entendemos operación, sistemas, dolores y oportunidades.'],
        ['02', 'Diseño', 'Definimos módulos, datos, permisos, automatizaciones e indicadores.'],
        ['03', 'Ejecución', 'Configuramos plataforma, integramos fuentes y entrenamos usuarios.'],
        ['04', 'Evolución', 'Medimos uso, ROI, costos AI y nuevos flujos.'],
      ],
      finalCta: 'Si tu empresa vive en planillas, mensajes y memoria humana, hay valor listo para capturar.',
    },
    contact: {
      seoTitle: 'Diagnóstico de automatización y mejora de procesos',
      seoDescription: 'Solicitá un diagnóstico comercial para detectar oportunidades de automatización, integraciones, software operativo y copiloto AI empresarial.',
      eyebrow: 'Diagnóstico ejecutivo',
      h1: 'Hablemos de dónde tu operación pierde tiempo, margen y control.',
      intro: 'Dejanos contexto. Te respondemos con quick wins, alcance, módulos e integraciones posibles.',
      directTitle: 'Una conversación bien hecha vale más que diez demos genéricas.',
      confidentiality: 'Confidencialidad desde el primer contacto',
      confidentialityCopy: 'Podemos hablar de procesos, sistemas, costos y problemas operativos con criterio profesional.',
      brief: 'Brief útil para venta',
      briefCopy: 'El formulario ordena el lead por necesidad, rubro, prioridad, módulos e impacto buscado.',
      formTitle: 'Agendar diagnóstico',
      formIntro: 'Completá el contexto mínimo y generamos un brief comercial accionable.',
      labels: {
        name: 'Nombre',
        company: 'Empresa',
        email: 'Email corporativo',
        phone: 'Teléfono / WhatsApp',
        industry: 'Rubro',
        size: 'Tamaño aproximado',
        priority: 'Prioridad',
        interests: 'Qué querés resolver',
        pain: 'Principal dolor operativo',
        submit: 'Generar lead y enviar solicitud',
        note: 'Hoy se envía por email prellenado. Está listo para conectar con CRM/backoffice cuando activemos el endpoint.',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      solution: 'Solution',
      method: 'Method',
      insights: 'Insights',
      about: 'About',
      contact: 'Contact',
      cta: 'Book assessment',
      menu: 'Menu',
      switch: 'Español',
    },
    footer: {
      statement: 'Platform, automation and intelligence to run cleaner operations and sell better.',
      legal: 'Legal and transparency',
      solutions: 'Solutions',
      contact: 'Contact',
      diagnostic: 'Assessment',
      rights: 'All rights reserved.',
      line: 'Enterprise product • Automation • AI copilot',
      links: [
        'Enterprise platform',
        'Process automation',
        'Commercial operations',
        'Products and catalog',
        'Inventory and warehouses',
        'Marketing and leads',
        'Quotes and procurement',
        'Projects and services',
        'Enterprise integrations',
        'Enterprise AI copilot',
      ],
    },
    home: {
      seoTitle: 'Enterprise platform for operations, automation and AI copilots',
      seoDescription: 'Dice Projects connects sales, procurement, products, projects, inventory, marketing, integrations, KPIs and AI copilots in one enterprise operating platform.',
      eyebrow: 'Enterprise operations platform',
      h1: 'Connected operations. Data-led decisions. AI ready to work.',
      intro: 'Unify sales, procurement, products, inventory, projects, marketing and integrations in one platform. Add copilots that understand your business and respect permissions.',
      primary: 'Book assessment',
      secondary: 'Explore solution',
      proof: ['Multi-company', 'Traceable workflows', 'Context-aware AI'],
      catalogTitle: 'A modular platform to operate better.',
      catalogIntro: 'Activate what your company needs today, then scale into automation, reporting and enterprise intelligence without redesigning everything.',
      catalog: [
        ['Sales and quotes', 'Consultative carts, proposals, approval links and commercial follow-up.'],
        ['Procurement', 'Multi-supplier requests, comparisons, awards and cost traceability.'],
        ['Products and inventory', 'Catalog, pricing, warehouses, movements, reservations and real availability.'],
        ['Projects and services', 'Works, integrated services, milestones, resources, costs, progress and deviations.'],
        ['Marketing and demand', 'Leads, campaigns, forms, web events and buying signals.'],
        ['AI Orchestrator', 'Agents, documents, APIs, databases, KPIs, memory and cost control.'],
      ],
      workflowsTitle: 'Business workflows, not disconnected screens.',
      workflows: [
        ['Cart to quote', 'Customers submit a request, sales respond, and a smart link tracks approval, rejection or changes.'],
        ['Smart procurement', 'When stock is missing, request quotes from suppliers and award by cost, timing or terms.'],
        ['Web events to sales', 'Capture interests, campaigns and viewed products to act on real buying signals.'],
        ['Project to profitability', 'Track resources, progress, costs, certifications and KPIs by company or unit.'],
      ],
      aiTitle: 'Website bot connected to the backoffice.',
      aiCopy: 'Turn chat into a public advisor: answer site questions, explain services, capture leads and route opportunities with context.',
      aiBullets: ['Answers like a consultative seller', 'Uses approved website content', 'Creates leads and conversations', 'Escalates to a human when needed'],
      impactTitle: 'Less friction. More margin. Better control.',
      impact: ['Less manual work', 'One source of truth', 'Traceability and permissions', 'Actionable KPIs', 'Governed AI'],
    },
    services: {
      seoTitle: 'Enterprise services catalog and multi-industry platform',
      seoDescription: 'We implement an enterprise platform for sales, procurement, products, inventory, projects, marketing, security, integrations, KPIs and AI copilots.',
      eyebrow: 'Product + automation + AI',
      h1: 'We design your business operating system.',
      intro: 'We combine platform, consulting and integrations to structure operations, automate workflows and create useful intelligence.',
      cta: 'Request proposal',
      offersTitle: 'Three ways to start.',
      offers: [
        ['Operational blueprint', 'Processes, modules, data, permissions, ROI and quick wins.'],
        ['Platform implementation', 'Modules, roles, catalogs, dashboards and workflows.'],
        ['AI copilot and integrations', 'Documents, APIs, databases, knowledge, agents and cost governance.'],
      ],
      examplesTitle: 'Use cases you can activate.',
      examples: [
        ['Consultative product cart', 'Catalog, request, assigned seller and approval link.'],
        ['Inventory and procurement', 'Replenishment, suppliers, comparisons and awards.'],
        ['Integrated projects', 'Services, automotive, installations, maintenance and after-sales.'],
        ['Business copilot', 'Agents for documents, data, KPIs, sales, procurement and projects.'],
      ],
      implementationTitle: 'Clear implementation.',
      steps: [
        ['01', 'Assessment', 'We understand operations, systems, pain points and opportunities.'],
        ['02', 'Design', 'We define modules, data, permissions, automation and indicators.'],
        ['03', 'Execution', 'We configure the platform, integrate sources and train users.'],
        ['04', 'Evolution', 'We measure adoption, ROI, AI costs and new workflows.'],
      ],
      finalCta: 'If your company runs on spreadsheets, messages and human memory, there is value ready to capture.',
    },
    contact: {
      seoTitle: 'Automation and process improvement assessment',
      seoDescription: 'Request a commercial assessment to identify automation, integrations, operating software and enterprise AI copilot opportunities.',
      eyebrow: 'Executive assessment',
      h1: 'Let’s find where your operation loses time, margin and control.',
      intro: 'Share context. We will respond with quick wins, scope, modules and possible integrations.',
      directTitle: 'One sharp conversation beats ten generic demos.',
      confidentiality: 'Confidential from the first conversation',
      confidentialityCopy: 'We can discuss processes, systems, costs and operational issues with professional care.',
      brief: 'Sales-ready brief',
      briefCopy: 'The form structures the lead by need, industry, priority, modules and expected impact.',
      formTitle: 'Book assessment',
      formIntro: 'Complete the minimum context and we generate an actionable commercial brief.',
      labels: {
        name: 'Name',
        company: 'Company',
        email: 'Business email',
        phone: 'Phone / WhatsApp',
        industry: 'Industry',
        size: 'Approximate size',
        priority: 'Priority',
        interests: 'What do you want to solve?',
        pain: 'Main operational pain',
        submit: 'Generate lead and send request',
        note: 'Today it opens a prefilled email. It is ready to connect with CRM/backoffice when the endpoint is enabled.',
      },
    },
  },
} as const;
